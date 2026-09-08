import React, { forwardRef } from 'react';
import { Search, X, Sparkles, Command } from 'lucide-react';

interface SearchCardProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  onSelectSample: (val: string) => void;
  isDark?: boolean;
}

const SAMPLE_NAMES = ["محمد أحمد", "سارة محمد", "أحمد رمضان"];

export const SearchCard = forwardRef<HTMLInputElement, SearchCardProps>(
  ({ value, onChange, onClear, onSelectSample, isDark }, ref) => {
    return (
      <div 
        className={`rounded-2xl p-5 sm:p-6 -mt-10 sm:-mt-12 relative z-20 border transition-all duration-200 ${
          isDark
            ? 'bg-[#111D28] border-[#1F3244] shadow-[0_20px_45px_-15px_rgba(0,0,0,0.7)] text-slate-100'
            : 'bg-white border-[#E4DCC9] shadow-[0_18px_40px_-18px_rgba(14,36,52,0.35)] text-[#1E2A33]'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <label 
            htmlFor="student-search" 
            className="font-['Cairo'] font-bold text-sm sm:text-base text-inherit m-0 block"
          >
            ابحث باسم الطالب (أو جزء من الاسم)
          </label>

          {/* Keyboard shortcut hint badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono opacity-70">
            <span>اضغط</span>
            <kbd className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${
              isDark ? 'bg-slate-800 border-slate-700 text-amber-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}>
              /
            </kbd>
            <span>للبحث •</span>
            <kbd className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${
              isDark ? 'bg-slate-800 border-slate-700 text-amber-300' : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}>
              Esc
            </kbd>
            <span>للمسح</span>
          </div>
        </div>

        <div className="relative">
          <input
            ref={ref}
            id="student-search"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="اكتب اسم الطالب هنا... (مثال: محمد أحمد)"
            autoComplete="off"
            dir="rtl"
            className={`w-full py-3.5 sm:py-4 pr-11 pl-12 rounded-xl border-2 font-['Tajawal'] text-base outline-none transition-all duration-200 ${
              isDark
                ? 'bg-[#0B1520] border-[#1F3244] text-white placeholder:text-slate-500 focus:border-[#F5A623] focus:ring-3 focus:ring-[#F5A623]/20'
                : 'bg-[#FBF7EF] border-[#E4DCC9] text-[#1E2A33] placeholder:text-[#5C6B75]/60 focus:border-[#C77F1F] focus:bg-white focus:ring-3 focus:ring-[#E8A33D]/25'
            }`}
          />

          {/* Search Icon */}
          <Search className={`absolute top-1/2 right-3.5 -translate-y-1/2 w-5 h-5 pointer-events-none ${
            isDark ? 'text-slate-400' : 'text-[#5C6B75]'
          }`} />

          {/* Clear Button */}
          {value ? (
            <button
              type="button"
              onClick={onClear}
              className={`absolute top-1/2 left-3 -translate-y-1/2 p-1.5 rounded-lg transition-colors cursor-pointer ${
                isDark 
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                  : 'text-[#5C6B75] hover:text-[#1E2A33] hover:bg-[#E4DCC9]/60'
              }`}
              title="مسح حقل البحث (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className={`absolute top-1/2 left-3.5 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded border pointer-events-none hidden sm:inline ${
              isDark ? 'border-slate-700 text-slate-500 bg-slate-800/60' : 'border-slate-300 text-slate-400 bg-slate-100'
            }`}>
              /
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mt-3">
          <p className={`text-xs m-0 ${isDark ? 'text-slate-400' : 'text-[#5C6B75]'}`}>
            يكفي كتابة الاسم الأول أو جزء منه — ستظهر النتيجة فورًا
          </p>

          {/* Quick sample chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[11px] flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-[#5C6B75]'}`}>
              <Sparkles className="w-3 h-3 text-[#E8A33D]" />
              تجربة سريعة:
            </span>
            {SAMPLE_NAMES.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => onSelectSample(name)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer font-medium ${
                  isDark
                    ? 'bg-[#0B1520] hover:bg-[#1F3244] text-slate-200 hover:text-[#F5A623] border-[#1F3244]'
                    : 'bg-[#FBF7EF] hover:bg-[#E8A33D]/15 text-[#16324A] hover:text-[#C77F1F] border-[#E4DCC9]'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

SearchCard.displayName = 'SearchCard';
