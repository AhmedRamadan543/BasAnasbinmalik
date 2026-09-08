import React from 'react';
import { Bus, UserCheck, AlertCircle, WifiOff, RefreshCw, HelpCircle } from 'lucide-react';

interface StateViewProps {
  isDark?: boolean;
}

export const PlaceholderView: React.FC<StateViewProps> = ({ isDark }) => {
  return (
    <div className={`text-center py-10 px-5 transition-colors ${isDark ? 'text-slate-400' : 'text-[#5C6B75]'}`}>
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 border transition-colors ${
        isDark ? 'bg-[#111D28] text-[#F5A623] border-[#1F3244]' : 'bg-[#E8A33D]/10 text-[#C77F1F] border-[#E8A33D]/20'
      }`}>
        <Bus className="w-8 h-8" />
      </div>
      <p className="font-['Cairo'] font-bold text-base mb-1 text-inherit">
        ابدأ بكتابة اسم الطالب أعلاه
      </p>
      <p className="text-sm max-w-xs mx-auto opacity-80">
        لعرض رقم الحافلة، اسم السائق، ومشرف الرحلة المعتمد فورًا
      </p>
    </div>
  );
};

export const LoadingView: React.FC<StateViewProps> = ({ isDark }) => {
  return (
    <div className={`text-center py-9 px-5 transition-colors ${isDark ? 'text-slate-300' : 'text-[#5C6B75]'}`}>
      <div className="w-9 h-9 mx-auto mb-3 border-3 border-[#E4DCC9] dark:border-slate-700 border-t-[#C77F1F] dark:border-t-[#F5A623] rounded-full animate-spin" />
      <span className="text-sm font-medium font-['Cairo']">جاري البحث في كشوفات النقل المدرسي...</span>
    </div>
  );
};

export const NeedMoreView: React.FC<StateViewProps> = ({ isDark }) => {
  return (
    <div className={`text-center py-8 px-5 rounded-2xl border shadow-xs transition-colors ${
      isDark ? 'bg-[#111D28] border-[#1F3244] text-slate-200' : 'bg-white border-[#E4DCC9] text-[#5C6B75]'
    }`}>
      <div className="w-12 h-12 rounded-full bg-[#E8A33D]/15 text-[#C77F1F] dark:text-[#F5A623] flex items-center justify-center mx-auto mb-3">
        <UserCheck className="w-6 h-6" />
      </div>
      <strong className="block font-['Cairo'] font-bold text-base mb-1 text-inherit">
        الاسم غير مكتمل بعد
      </strong>
      <span className="text-sm block max-w-sm mx-auto leading-relaxed opacity-85">
        يوجد أكثر من طالب بأسماء متقاربة — يُرجى كتابة اسم الطالب ثنائيًا أو ثلاثيًا لعرض بيانات حافلته المحددة بدقة.
      </span>
    </div>
  );
};

interface NotFoundViewProps extends StateViewProps {
  onOpenHelp: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onOpenHelp, isDark }) => {
  return (
    <div className={`text-center py-8 px-5 rounded-2xl border shadow-xs transition-colors ${
      isDark ? 'bg-[#111D28] border-[#1F3244] text-slate-200' : 'bg-white border-[#E4DCC9] text-[#5C6B75]'
    }`}>
      <div className="w-12 h-12 rounded-full bg-red-500/10 text-rose-500 flex items-center justify-center mx-auto mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <strong className="block font-['Cairo'] font-bold text-base mb-1 text-inherit">
        لا يوجد طالب مسجل بهذا الاسم
      </strong>
      <span className="text-sm block max-w-sm mx-auto leading-relaxed mb-4 opacity-85">
        تأكد من صحة كتابة الاسم كما هو مقيد بالمدرسة، أو تواصل مع مسؤول الحافلات لمطابقة الاسم.
      </span>
      <button
        type="button"
        onClick={onOpenHelp}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#16324A] hover:bg-[#0E2434] text-white text-xs font-semibold font-['Cairo'] transition-colors cursor-pointer shadow-xs"
      >
        <HelpCircle className="w-3.5 h-3.5 text-[#E8A33D]" />
        <span>تواصل مع مسؤول الحافلات للمساعدة</span>
      </button>
    </div>
  );
};

interface ErrorViewProps extends StateViewProps {
  onRetry: () => void;
  onEnableDemo?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ onRetry, onEnableDemo, isDark }) => {
  return (
    <div className={`text-center py-8 px-5 rounded-2xl border shadow-xs transition-colors ${
      isDark ? 'bg-[#111D28] border-[#1F3244] text-slate-200' : 'bg-white border-[#E4DCC9] text-[#5C6B75]'
    }`}>
      <div className="w-12 h-12 rounded-full bg-red-500/10 text-rose-500 flex items-center justify-center mx-auto mb-3">
        <WifiOff className="w-6 h-6" />
      </div>
      <strong className="block font-['Cairo'] font-bold text-base mb-1 text-inherit">
        تعذّر الاتصال بقاعدة البيانات
      </strong>
      <span className="text-sm block max-w-sm mx-auto leading-relaxed mb-4 opacity-85">
        يرجى التأكد من اتصال الإنترنت ثم إعادة المحاولة، أو استعراض العينات التجريبية.
      </span>
      <div className="flex items-center justify-center gap-2.5 flex-wrap">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#16324A] hover:bg-[#0E2434] text-white text-xs font-semibold font-['Cairo'] transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#E8A33D]" />
          <span>إعادة المحاولة</span>
        </button>
        {onEnableDemo && (
          <button
            type="button"
            onClick={onEnableDemo}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold font-['Cairo'] transition-colors cursor-pointer border ${
              isDark
                ? 'bg-[#1F3244] hover:bg-[#2A445C] text-[#F5A623] border-[#F5A623]/30'
                : 'bg-[#E8A33D]/20 hover:bg-[#E8A33D]/30 text-[#C77F1F] border-[#E8A33D]/30'
            }`}
          >
            <span>استعراض بيانات تجريبية</span>
          </button>
        )}
      </div>
    </div>
  );
};
