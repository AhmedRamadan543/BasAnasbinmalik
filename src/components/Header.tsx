import React from 'react';
import { Bus, ShieldCheck, PhoneCall, Sun, Moon, Sparkles, CheckCircle } from 'lucide-react';
import { ThemeMode, SCHOOL_CONTACTS } from '../types';

interface HeaderProps {
  onOpenContact: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenContact,
  theme,
  onToggleTheme,
}) => {
  const isDark = theme === 'dark';

  return (
    <header className="relative bg-gradient-to-b from-[#16324A] via-[#10273B] to-[#0A1A28] text-white pt-6 sm:pt-8 pb-16 sm:pb-20 px-4 sm:px-6 text-center overflow-hidden border-b border-[#E8A33D]/20">
      {/* Decorative background grid and ambient lighting */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle at 85% 15%, #E8A33D 0%, transparent 45%), radial-gradient(circle at 15% 85%, #0284C7 0%, transparent 40%)'
        }}
      />
      
      {/* Subtle decorative geometric overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      {/* Top utility bar */}
      <div className="relative z-10 max-w-4xl mx-auto flex items-center justify-between gap-3 pb-6 text-xs">
        {/* Ministry & School badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-[#E8A33D] font-medium backdrop-blur-md border border-white/10 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#E8A33D]" />
          <span className="font-['Cairo'] font-semibold">منظومة النقل المدرسي المعتمدة</span>
        </div>

        {/* Action Controls: Theme Switcher & Help */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all cursor-pointer border ${
              isDark
                ? 'bg-[#F5A623]/20 text-[#F5A623] border-[#F5A623]/40 hover:bg-[#F5A623]/30'
                : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
            }`}
            title={isDark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن (عالي التباين)'}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#F5A623]" />
                <span className="hidden sm:inline">الوضع الفاتح</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-200" />
                <span className="hidden sm:inline">الوضع الليلي</span>
              </>
            )}
          </button>

          {/* Quick Contact Button */}
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8A33D] hover:bg-[#C77F1F] text-[#0E2434] transition-all cursor-pointer text-xs font-['Cairo'] font-bold shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#0E2434]" />
            <span className="hidden xs:inline">أرقام الطوارئ والمساعدة</span>
            <span className="xs:hidden">مساعدة</span>
          </button>
        </div>
      </div>

      {/* Main Hero Section with Grand Headline */}
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* School Identifier */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#E8A33D]/15 border border-[#E8A33D]/30 text-[#E8A33D] mb-3.5">
          <Bus className="w-4 h-4 text-[#E8A33D]" />
          <span className="font-['Cairo'] font-bold text-xs sm:text-sm tracking-wide">
            سلطنة عُمان • مدرسة أنس بن مالك الخاصة
          </span>
        </div>

        {/* GRAND REQUESTED HEADLINE */}
        <h1 className="font-['Cairo'] font-black text-3xl sm:text-5xl md:text-5xl text-white tracking-tight leading-[1.25] sm:leading-[1.2] mb-3 text-balance">
          <span className="text-[#F5A623] block sm:inline">أمان ابنك يبدأ من هنا</span>
          <span className="hidden sm:inline"> — </span>
          <span className="text-white block sm:inline">مدرسة أنس بن مالك الخاصة</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#D1DFE8] text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal mb-5">
          بوابة الاستعلام الفوري والمباشر عن حافلات الطلاب، خطوط السير اليومية، وتفاصيل السائقين والمشرفين المعتمدين.
        </p>

        {/* Feature Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-xs text-[#CBD8E0]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>استعلام فوري مباشر</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>تحميل بطاقة الحافلة PDF</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>إشراف معتمد وموثوق</span>
          </div>
        </div>
      </div>

      {/* Characteristic bottom concave curve matching school aesthetic */}
      <div 
        className={`absolute left-0 right-0 bottom-0 h-8 sm:h-10 transition-colors duration-200 ${
          isDark ? 'bg-[#091017]' : 'bg-[#FBF7EF]'
        }`}
        style={{
          borderRadius: '60% 60% 0 0 / 100% 100% 0 0'
        }}
      />
    </header>
  );
};
