import React from 'react';
import { Phone, MessageCircle, ShieldCheck, UserCheck } from 'lucide-react';
import { SCHOOL_CONTACTS } from '../types';

interface QuickContactsProps {
  isDark?: boolean;
}

export const QuickContacts: React.FC<QuickContactsProps> = ({ isDark }) => {
  const coordinator = SCHOOL_CONTACTS.busCoordinator;
  const principal = SCHOOL_CONTACTS.principal;

  return (
    <div className={`mt-5 rounded-2xl p-4 sm:p-5 border transition-all ${
      isDark
        ? 'bg-[#111D28] border-[#1F3244] shadow-lg'
        : 'bg-white border-[#E4DCC9] shadow-[0_10px_25px_-10px_rgba(14,36,52,0.15)]'
    }`}>
      {/* Title */}
      <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-inherit">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-['Cairo'] font-bold text-sm sm:text-base m-0">
              خطوط الاتصال والمساعدة المباشرة
            </h4>
            <p className={`text-xs m-0 ${isDark ? 'text-slate-400' : 'text-[#5C6B75]'}`}>
              للاستفسارات الطارئة وتغيير نقاط التجمع مع الإدارة والمشرفين
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>متاح للاتصال والواتساب</span>
        </div>
      </div>

      {/* Two Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Card 1: Bus Coordinator (الأستاذ محمد الملاح) */}
        <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
          isDark
            ? 'bg-[#0B1520] border-[#1F3244]'
            : 'bg-[#FBF7EF] border-[#E4DCC9]'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                isDark ? 'bg-[#1F3244] text-[#F5A623]' : 'bg-[#E8A33D]/20 text-[#C77F1F]'
              }`}>
                {coordinator.title}
              </span>
              <UserCheck className="w-4 h-4 text-[#C77F1F] dark:text-[#F5A623]" />
            </div>
            <h5 className="font-['Cairo'] font-bold text-base m-0 mb-1 text-inherit">
              {coordinator.name}
            </h5>
            <p className="text-xs font-mono font-bold text-[#16324A] dark:text-[#F5A623] mb-3" dir="ltr">
              {coordinator.phone}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-inherit">
            <a
              href={`tel:${coordinator.rawPhone}`}
              className="flex-1 py-2 px-3 rounded-lg bg-[#16324A] hover:bg-[#0E2434] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="اتصال هاتفي مباشر"
            >
              <Phone className="w-3.5 h-3.5 text-[#E8A33D]" />
              <span>اتصال هاتفي</span>
            </a>
            <a
              href={`https://wa.me/${coordinator.waNumber}?text=${encodeURIComponent('السلام عليكم ورحمة الله، بخصوص النقل المدرسي لمدرسة أنس بن مالك الخاصة')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="محادثة واتساب مباشرة"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span>محادثة واتساب</span>
            </a>
          </div>
        </div>

        {/* Card 2: School Principal (الأستاذة هبة قطب) */}
        <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
          isDark
            ? 'bg-[#0B1520] border-[#1F3244]'
            : 'bg-[#FBF7EF] border-[#E4DCC9]'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                isDark ? 'bg-[#1F3244] text-emerald-400' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {principal.title}
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h5 className="font-['Cairo'] font-bold text-base m-0 mb-1 text-inherit">
              {principal.name}
            </h5>
            <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-[#5C6B75]'}`}>
              {principal.role}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-inherit">
            <a
              href={`https://wa.me/${principal.waNumber}?text=${encodeURIComponent('السلام عليكم ورحمة الله أستاذة هبة قطب مديرة مدرسة أنس بن مالك الخاصة')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="تواصل مباشر عبر الواتساب مع مديرة المدرسة"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span>واتساب مديرة المدرسة</span>
            </a>
            <a
              href={`tel:${principal.rawPhone}`}
              className={`p-2 rounded-lg border text-xs flex items-center justify-center transition-colors cursor-pointer ${
                isDark
                  ? 'border-[#1F3244] hover:bg-slate-800 text-slate-200'
                  : 'border-[#E4DCC9] hover:bg-white text-[#16324A]'
              }`}
              title="اتصال بالإدارة"
            >
              <Phone className="w-4 h-4 text-[#C77F1F]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
