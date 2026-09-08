import React, { useRef, useState } from 'react';
import { StudentTransportInfo, SCHOOL_CONTACTS } from '../types';
import { X, Printer, Bus, CheckCircle2, ShieldCheck, Download, Loader2, Phone, MessageCircle } from 'lucide-react';
import { downloadStudentPassPdf } from '../utils/pdfGenerator';
import { saveStudentPass } from '../utils/storage';

interface StudentPassModalProps {
  student: StudentTransportInfo | null;
  onClose: () => void;
  isDark?: boolean;
}

export const StudentPassModal: React.FC<StudentPassModalProps> = ({ student, onClose, isDark }) => {
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const printableRef = useRef<HTMLDivElement>(null);

  if (!student) return null;

  const handlePrint = () => {
    saveStudentPass(student, 'printed');
    window.print();
  };

  const handleDownloadPdf = async () => {
    setIsPdfLoading(true);
    try {
      await downloadStudentPassPdf(student, printableRef.current);
      saveStudentPass(student, 'downloaded');
    } catch (err) {
      console.error('PDF generation error', err);
    } finally {
      setIsPdfLoading(false);
    }
  };

  const busNumberDisplay = student.bus_number && student.bus_number.toString().trim()
    ? student.bus_number
    : '—';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className={`w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 transition-colors ${
          isDark
            ? 'bg-[#111D28] border-[#1F3244] text-slate-100'
            : 'bg-white border-[#E4DCC9] text-[#1E2A33]'
        }`}
        dir="rtl"
      >
        {/* Modal Top Bar */}
        <div className={`p-4 flex items-center justify-between border-b ${
          isDark ? 'bg-[#0B1520] border-[#1F3244]' : 'bg-[#FBF7EF] border-[#E4DCC9]'
        }`}>
          <span className="text-xs sm:text-sm font-bold font-['Cairo'] flex items-center gap-1.5 text-inherit">
            <Bus className="w-4 h-4 text-[#C77F1F] dark:text-[#F5A623]" />
            بطاقة وتصريح النقل المدرسي المعتمدة
          </span>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-[#5C6B75] hover:text-[#1E2A33] hover:bg-[#E4DCC9]/40'
            }`}
            title="إغلاق (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Pass Container */}
        <div className="p-4 sm:p-5">
          <div 
            ref={printableRef}
            id="printable-pass" 
            className={`border-2 border-dashed rounded-2xl p-5 relative transition-colors ${
              isDark ? 'border-[#1F3244] bg-[#0B1520]/80' : 'border-[#16324A]/30 bg-[#FBF7EF]/70'
            }`}
          >
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#C77F1F] dark:text-[#F5A623]" />
                <p className="font-['Cairo'] text-xs font-bold tracking-wider m-0 text-inherit">
                  مدرسة أنس بن مالك الخاصة
                </p>
              </div>
              <p className={`text-[11px] m-0 ${isDark ? 'text-slate-400' : 'text-[#5C6B75]'}`}>
                تصريح خط سير النقل المدرسي — العام الدراسي الحالي
              </p>
            </div>

            {/* Giant Bus Badge */}
            <div className="w-20 h-20 rounded-2xl bg-[#16324A] text-[#E8A33D] mx-auto flex flex-col items-center justify-center mb-3.5 shadow-md border-2 border-[#0E2434]">
              <span className="text-3xl font-black font-['Cairo'] leading-none">
                {busNumberDisplay}
              </span>
              <span className="text-[10px] text-[#CBD8E0] mt-1 font-medium">رقم الحافلة</span>
            </div>

            <div className="text-center mb-4">
              <h4 className="font-['Cairo'] text-lg sm:text-xl font-black mb-0.5 text-inherit">
                {student.name}
              </h4>
              <p className={`text-xs m-0 ${isDark ? 'text-slate-400' : 'text-[#5C6B75]'}`}>
                {student.grade || 'طالب مقيد بمدرسة أنس بن مالك الخاصة'}
              </p>
            </div>

            {/* Table / Details */}
            <div className={`rounded-xl p-3.5 border text-xs text-right space-y-2 mb-4 ${
              isDark ? 'bg-[#111D28] border-[#1F3244]' : 'bg-white border-[#E4DCC9]'
            }`}>
              <div className="flex justify-between items-center border-b border-inherit pb-1.5">
                <span className={isDark ? 'text-slate-400' : 'text-[#5C6B75]'}>السائق المسؤول:</span>
                <span className="font-bold">{student.driver_name || 'طاقم السائقين المعتمد'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-inherit pb-1.5">
                <span className={isDark ? 'text-slate-400' : 'text-[#5C6B75]'}>المشرف/ة:</span>
                <span className="font-bold">{student.supervisor_name || 'طاقم الإشراف المدرسي'}</span>
              </div>
              {student.station && (
                <div className="flex justify-between items-center border-b border-inherit pb-1.5">
                  <span className={isDark ? 'text-slate-400' : 'text-[#5C6B75]'}>محطة التجمع:</span>
                  <span className="font-bold">{student.station}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-0.5">
                <span className={isDark ? 'text-slate-400' : 'text-[#5C6B75]'}>مسؤول الحافلات:</span>
                <span className="font-bold text-[#C77F1F] dark:text-[#F5A623]">
                  {SCHOOL_CONTACTS.busCoordinator.name} ({SCHOOL_CONTACTS.busCoordinator.phone})
                </span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-3 border-t border-inherit flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> معتمد رسميًا
              </span>
              <span className={isDark ? 'text-slate-400' : 'text-[#5C6B75]'}>
                مديرة المدرسة: {SCHOOL_CONTACTS.principal.name}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className={`p-4 border-t flex flex-wrap gap-2 ${
          isDark ? 'bg-[#0B1520] border-[#1F3244]' : 'bg-[#FBF7EF] border-[#E4DCC9]'
        }`}>
          {/* Download PDF */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isPdfLoading}
            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-['Cairo'] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            {isPdfLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>تحميل كملف PDF</span>
          </button>

          {/* Print */}
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#16324A] hover:bg-[#0E2434] text-white text-xs font-['Cairo'] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#E8A33D]" />
            <span>طباعة فورية</span>
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className={`py-2.5 px-4 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-gray-200 hover:bg-gray-300 text-[#1E2A33]'
            }`}
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
