import React, { useState } from 'react';
import { StudentTransportInfo } from '../types';
import { Copy, Check, Share2, IdCard, Phone, MapPin, Download, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { downloadStudentPassPdf } from '../utils/pdfGenerator';
import { saveStudentPass } from '../utils/storage';

interface ResultCardProps {
  student: StudentTransportInfo;
  onOpenPass: (student: StudentTransportInfo) => void;
  isDark?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ student, onOpenPass, isDark }) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const busNumberDisplay = student.bus_number && student.bus_number.toString().trim()
    ? student.bus_number
    : '—';

  const handleCopy = () => {
    const text = `🚌 بيانات النقل المدرسي — مدرسة أنس بن مالك الخاصة
الطالب: ${student.name}
${student.grade ? `الصف: ${student.grade}\n` : ''}رقم الحافلة: (${busNumberDisplay})
السائق: ${student.driver_name || 'غير محدد'}
المشرف: ${student.supervisor_name || 'طاقم الإشراف المدرسي'}
مسؤول الحافلات: الأستاذ محمد الملاح (+968 9403 2639)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🚌 *بيانات النقل المدرسي — مدرسة أنس بن مالك الخاصة*\n` +
      `👤 *الطالب:* ${student.name}\n` +
      (student.grade ? `📚 *الصف:* ${student.grade}\n` : '') +
      `🔢 *رقم الحافلة:* (${busNumberDisplay})\n` +
      `👨‍✈️ *السائق:* ${student.driver_name || 'غير محدد'}\n` +
      `📋 *المشرف/ة:* ${student.supervisor_name || 'طاقم الإشراف المدرسي'}\n` +
      `📞 *مسؤول الحافلات:* الأستاذ محمد الملاح (+968 9403 2639)\n` +
      `📍 مدرسة أنس بن مالك الخاصة`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      await downloadStudentPassPdf(student);
      saveStudentPass(student, 'downloaded');
    } catch (err) {
      console.error('Failed to generate PDF', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className={`rounded-2xl p-4 sm:p-5 border transition-all relative overflow-hidden ${
        isDark
          ? 'bg-[#111D28] border-[#1F3244] shadow-lg text-slate-100'
          : 'bg-white border-[#E4DCC9] shadow-sm hover:shadow-md text-[#1E2A33]'
      }`}
    >
      {/* Top golden accent bar */}
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-[#16324A] via-[#E8A33D] to-[#16324A]" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Bus Badge */}
        <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#16324A] text-[#E8A33D] flex flex-col items-center justify-center font-['Cairo'] font-extrabold shadow-sm border border-[#0E2434] self-start sm:self-center">
          <span className="text-2xl leading-none">{busNumberDisplay}</span>
          <span className="text-[10px] text-[#CBD8E0] font-normal mt-0.5 tracking-tighter">حافلة رقم</span>
        </div>

        {/* Info & details */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2">
            <div>
              <h3 className="font-['Cairo'] font-bold text-base sm:text-lg m-0 truncate">
                {student.name}
              </h3>
              <p className={`text-xs sm:text-sm mt-0.5 mb-1 ${isDark ? 'text-slate-400' : 'text-[#5C6B75]'}`}>
                {student.grade ? `الصف: ${student.grade}` : `الحافلة المدرسية رقم ${busNumberDisplay}`}
              </p>
            </div>

            {/* Action buttons toolbar */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* PDF Download Button */}
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-[#0B1520] hover:bg-[#1F3244] text-[#F5A623] border-[#1F3244]'
                    : 'bg-[#FBF7EF] hover:bg-[#E8A33D]/15 text-[#C77F1F] border-[#E4DCC9]'
                }`}
                title="تحميل بطاقة الحافلة كملف PDF للاستخدام دون إنترنت"
              >
                {isGeneratingPdf ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>تحميل PDF</span>
              </button>

              {/* View Pass Modal Button */}
              <button
                type="button"
                onClick={() => onOpenPass(student)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-[#16324A] hover:bg-[#0E2434] text-white transition-colors cursor-pointer"
                title="عرض وتصريح البطاقة المدرسية"
              >
                <IdCard className="w-3.5 h-3.5 text-[#E8A33D]" />
                <span>عرض البطاقة</span>
              </button>

              {/* WhatsApp Share Button */}
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="p-1.5 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-transparent hover:border-emerald-200 transition-colors cursor-pointer"
                title="مشاركة عبر واتساب"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopy}
                className={`p-1.5 rounded-lg border border-transparent transition-colors cursor-pointer ${
                  isDark
                    ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                    : 'text-[#5C6B75] hover:text-[#16324A] hover:bg-[#FBF7EF]'
                }`}
                title="نسخ بيانات النقل"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5 pt-2.5 border-t border-inherit">
            <div className="flex flex-col">
              <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-[#5C6B75]'}`}>
                رقم الحافلة المخصصة
              </span>
              <span className="text-sm font-bold font-['Cairo'] text-[#C77F1F] dark:text-[#F5A623]">
                حافلة رقم {busNumberDisplay}
              </span>
            </div>

            <div className="flex flex-col">
              <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-[#5C6B75]'}`}>
                اسم السائق
              </span>
              <span className="text-sm font-bold truncate">
                {student.driver_name || '—'}
              </span>
              {student.driver_phone && (
                <a
                  href={`tel:${student.driver_phone}`}
                  className="text-[11px] text-[#C77F1F] hover:underline inline-flex items-center gap-1 mt-0.5"
                >
                  <Phone className="w-2.5 h-2.5" />
                  اتصال بالسائق
                </a>
              )}
            </div>

            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-[#5C6B75]'}`}>
                المشرف / المشرفة
              </span>
              <span className={`text-sm font-bold truncate ${student.supervisor_name ? '' : 'text-slate-400 font-normal'}`}>
                {student.supervisor_name || 'سيُضاف قريبًا'}
              </span>
              {student.supervisor_phone && (
                <a
                  href={`tel:${student.supervisor_phone}`}
                  className="text-[11px] text-[#C77F1F] hover:underline inline-flex items-center gap-1 mt-0.5"
                >
                  <Phone className="w-2.5 h-2.5" />
                  اتصال بالمشرف
                </a>
              )}
            </div>
          </div>

          {student.station && (
            <div className="mt-2.5 pt-2 border-t border-inherit flex items-center gap-1.5 text-xs opacity-90">
              <MapPin className="w-3.5 h-3.5 text-[#C77F1F] dark:text-[#F5A623] flex-shrink-0" />
              <span>نقطة التجمع / المحطة: </span>
              <span className="font-semibold">{student.station}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
