import { ApiResponse, StudentTransportInfo } from '../types';

export const DEFAULT_API_URL = "https://script.google.com/macros/s/AKfycbxl2AAZ2sJ_dEhylF1r4dC6ZMFIwxWV07LH9VRDODGaEemQn37ZRp9tm6SvXAU8pkEHMg/exec";

let jsonpCounter = 0;

// Sample fallback dataset for preview/testing if the external sheet is temporarily empty or offline
export const DEMO_STUDENTS: StudentTransportInfo[] = [
  {
    name: "محمد أحمد علي محمود",
    bus_number: "12",
    driver_name: "أبو خالد (خالد محمود)",
    supervisor_name: "أ. فاطمة الزهراء",
    grade: "الصف الرابع الابتدائي",
    driver_phone: "01000000001",
    supervisor_phone: "01000000002",
    station: "المحطة الأولى - بجوار المسجد الكبير"
  },
  {
    name: "سارة محمد إبراهيم حسن",
    bus_number: "07",
    driver_name: "عماد الدين السيد",
    supervisor_name: "أ. مريم السعيد",
    grade: "الصف الثاني الإعدادي",
    driver_phone: "01000000003",
    supervisor_phone: "01000000004",
    station: "ميدان الساعة"
  },
  {
    name: "أحمد رمضان عبدالعزيز",
    bus_number: "05",
    driver_name: "محمود حسن النجار",
    supervisor_name: "أ. هبة عبدالفتاح",
    grade: "الصف السادس الابتدائي",
    driver_phone: "01000000005",
    station: "الشارع الرئيسي"
  }
];

export function searchTransportApi(name: string, customUrl = DEFAULT_API_URL): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    const trimmed = name.trim();
    if (!trimmed) {
      resolve({ status: 'idle' as any, matches: [] });
      return;
    }

    const cbName = '__portalCb' + (jsonpCounter++);
    const script = document.createElement('script');
    
    // Construct URL with query parameters
    const params = new URLSearchParams({
      name: trimmed,
      callback: cbName
    });

    const timeout = setTimeout(() => {
      cleanup();
      // On timeout, check if user typed a demo name or return error
      reject(new Error('timeout'));
    }, 8000);

    (window as any)[cbName] = (data: ApiResponse) => {
      clearTimeout(timeout);
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      clearTimeout(timeout);
      cleanup();
      reject(new Error('network_error'));
    };

    function cleanup() {
      try {
        delete (window as any)[cbName];
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      } catch {
        // ignore cleanup error
      }
    }

    script.src = `${customUrl}?${params.toString()}`;
    document.body.appendChild(script);
  });
}

// Local search function for demo mode
export function searchDemoStudents(query: string): ApiResponse {
  const q = query.trim().toLowerCase();
  if (!q) return { status: 'idle' as any, matches: [] };

  const matches = DEMO_STUDENTS.filter(s => s.name.toLowerCase().includes(q));
  if (matches.length === 0) {
    return { status: 'not_found', matches: [] };
  }
  if (q.length < 3 && matches.length > 3) {
    return { status: 'need_more', matches: [] };
  }
  return { status: 'found', matches };
}
