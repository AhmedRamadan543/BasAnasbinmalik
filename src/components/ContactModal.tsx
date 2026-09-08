import React from 'react';
import { X, Phone, MessageCircle, ShieldCheck, UserCheck, Clock, MapPin, Bus } from 'lucide-react';
import { SCHOOL_CONTACTS } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, isDark }) => {
  if (!isOpen) return null;

  const coordinator = SCHOOL_CONTACTS.busCoordinator;
  const principal = SCHOOL_CONTACTS.principal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className={`w-full max-w-lg rounded-2xl shadow-2xl border overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 transition-colors ${
          isDark
            ? 'bg-[#111D28] border-[#1F3244] text-slate-100'
            : 'bg-white border-[#E4DCC9] text-[#1E2A33]'
        }`}
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#16324A] via-[#102638] to-[#0A1A28] text-white p-5 flex items-center justify-between border-b border-[#E8A33D]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8A33D]/20 text-[#E8A33D] flex items-center justify-center border border-[#E8A33D]/30">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Cairo'] font-bold text-base sm:text-lg m-0 text-white">
                إدارة النقل والمساعدة المباشرة
              </h3>
              <p className="text-xs text-[#CBD8E0] m-0">
                مدرسة أنس بن مالك الخاصة — خدمة أولياء الأمور
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#CBD8E0] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="إغلاق (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-right">
          {/* Official Contacts Section */}
          <div className="space-y-3">
            <p className="font-['Cairo'] font-bold text-sm text-[#C77F1F] dark:text-[#F5A623] m-0">
              أرقام التواصل الرسمية المباشرة:
            </p>

            {/* Bus Coordinator */}
            <div className={`p-4 rounded-xl border flex flex-col gap-2 ${
              isDark ? 'bg-[#0B1520] border-[#1F3244]' : 'bg-[#FBF7EF] border-[#E4DCC9]'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#C77F1F] dark:text-[#F5A623] block">
                    {coordinator.title}
                  </span>
                  <h4 className="font-['Cairo'] font-bold text-base m-0">
                    {coordinator.name}
                  </h4>
                </div>
                <UserCheck className="w-5 h-5 text-[#C77F1F] dark:text-[#F5A623]" />
              </div>
              <p className="text-sm font-mono font-bold text-[#16324A] dark:text-slate-200" dir="ltr">
                {coordinator.phone}
              </p>
              <div className="flex gap-2 pt-1">
                <a
                  href={`tel:${coordinator.rawPhone}`}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#16324A] hover:bg-[#0E2434] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E8A33D]" />
                  <span>اتصال مباشر</span>
                </a>
                <a
                  href={`https://wa.me/${coordinator.waNumber}?text=${encodeURIComponent('السلام عليكم ورحمة الله، بخصوص خط سير حافلات مدرسة أنس بن مالك الخاصة')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>واتساب مباشر</span>
                </a>
              </div>
            </div>

            {/* Principal */}
            <div className={`p-4 rounded-xl border flex flex-col gap-2 ${
              isDark ? 'bg-[#0B1520] border-[#1F3244]' : 'bg-[#FBF7EF] border-[#E4DCC9]'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block">
                    {principal.title}
                  </span>
                  <h4 className="font-['Cairo'] font-bold text-base m-0">
                    {principal.name}
                  </h4>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-[#5C6B75]'}`}>
                {principal.role}
              </p>
              <div className="flex gap-2 pt-1">
                <a
                  href={`https://wa.me/${principal.waNumber}?text=${encodeURIComponent('السلام عليكم ورحمة الله أستاذة هبة قطب مديرة مدرسة أنس بن مالك الخاصة')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>محادثة واتساب مديرة المدرسة</span>
                </a>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className={`p-3.5 rounded-xl border text-xs space-y-2 ${
            isDark ? 'bg-[#0B1520]/50 border-[#1F3244] text-slate-300' : 'bg-[#FDF4E4] border-[#F1DCAE] text-[#7A4B0A]'
          }`}>
            <p className="font-['Cairo'] font-bold text-xs text-inherit m-0">
              توجيهات وإرشادات مهمة:
            </p>
            <div className="flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#C77F1F]" />
              <span>يرجى التواجد في نقطة التجمع المحددة قبل موعد الحافلة بـ 10 دقائق لضمان عدم التأخير.</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#C77F1F]" />
              <span>في حال تغيير عنوان الطالب أو الانتقال لمسكن جديد، يرجى إخطار الإدارة لتعديل خط السير.</span>
            </div>
          </div>

          {/* Footer of modal */}
          <div className="pt-2 border-t border-inherit flex items-center justify-between text-xs">
            <span className={isDark ? 'text-slate-400' : 'text-[#5C6B75]'}>
              إعداد: الأستاذ أحمد رمضان عبدالعزيز
            </span>
            <button
              onClick={onClose}
              className={`py-2 px-4 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-gray-100 hover:bg-gray-200 text-[#1E2A33]'
              }`}
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
