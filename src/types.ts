export interface StudentTransportInfo {
  name: string;
  bus_number: string | number;
  driver_name?: string;
  supervisor_name?: string;
  grade?: string;
  driver_phone?: string;
  supervisor_phone?: string;
  station?: string;
  route_notes?: string;
}

export interface SavedPass {
  student: StudentTransportInfo;
  viewedAt: number;
  action?: 'viewed' | 'printed' | 'downloaded';
}

export type ThemeMode = 'light' | 'dark';

export type SearchStatus = 'idle' | 'loading' | 'found' | 'need_more' | 'not_found' | 'error';

export interface ApiResponse {
  status: 'found' | 'need_more' | 'not_found' | 'error';
  matches?: StudentTransportInfo[];
  message?: string;
}

export const SCHOOL_CONTACTS = {
  busCoordinator: {
    title: 'مسؤول الحافلات المدرسية',
    name: 'الأستاذ محمد الملاح',
    phone: '+968 9403 2639',
    rawPhone: '+96894032639',
    waNumber: '96894032639',
  },
  principal: {
    title: 'مديرة المدرسة',
    name: 'الأستاذة هبة قطب',
    role: 'الإدارة العامة والمتابعة المباشرة',
    phone: '+968 9403 2639',
    rawPhone: '+96894032639',
    waNumber: '96894032639',
  },
  portalDev: {
    title: 'إعداد وتطوير المنظومة',
    name: 'الأستاذ أحمد رمضان عبدالعزيز',
  }
};

