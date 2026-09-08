import React from 'react';
import { SavedPass, StudentTransportInfo } from '../types';
import { History, Bus, Trash2, ArrowUpLeft, Download, IdCard } from 'lucide-react';

interface RecentPassesProps {
  passes: SavedPass[];
  onSelectStudent: (student: StudentTransportInfo) => void;
  onOpenPass: (student: StudentTransportInfo) => void;
  onClear: () => void;
  isDark?: boolean;
}

export const RecentPasses: React.FC<RecentPassesProps> = ({
  passes,
  onSelectStudent,
  onOpenPass,
  onClear,
  isDark,
}) => {
  if (!passes || passes.length === 0) return null;

  return (
    <div className={`mt-5 rounded-2xl p-4 sm:p-5 border transition-colors ${
      isDark 
        ? 'bg-[#111D28] border-[#1F3244] text-slate-100' 
        : 'bg-white border-[#E4DCC9] shadow-xs text-[#1E2A33]'
    }`}>
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-inherit">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#E8A33D]/20 text-[#C77F1F] dark:text-[#F5A623] flex items-center justify-center">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-['Cairo'] font-bold text-sm m-0">
              البطاقات المستعلم عنها مؤخرًا
            </h4>
            <p className={`text-[11px] m-0 ${isDark ? 'text-slate-400' : 'text-[#5C6B75]'}`}>
              محفوظة محليًا على جهازك لسرعة الوصول دون تكرار البحث ({passes.length})
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
            isDark 
              ? 'text-rose-400 hover:bg-rose-500/10' 
              : 'text-rose-600 hover:bg-rose-50'
          }`}
          title="مسح السجل"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">مسح السجل</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {passes.map((item, idx) => {
          const busNum = item.student.bus_number && item.student.bus_number.toString().trim()
            ? item.student.bus_number
            : '—';

          return (
            <div
              key={`${item.student.name}-${idx}`}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                isDark
                  ? 'bg-[#0B1520] border-[#1F3244] hover:border-[#F5A623]/50'
                  : 'bg-[#FBF7EF] border-[#E4DCC9] hover:border-[#C77F1F]/50'
              }`}
            >
              {/* Bus badge & info */}
              <div 
                className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
                onClick={() => onSelectStudent(item.student)}
                title="اضغط للبحث عن هذا الطالب"
              >
                <div className="w-10 h-10 rounded-lg bg-[#16324A] text-[#E8A33D] font-['Cairo'] font-bold text-sm flex items-center justify-center flex-shrink-0 border border-[#0E2434]">
                  {busNum}
                </div>
                <div className="min-w-0">
                  <p className="font-['Cairo'] font-bold text-xs sm:text-sm m-0 truncate hover:text-[#C77F1F] transition-colors">
                    {item.student.name}
                  </p>
                  <p className={`text-[11px] m-0 truncate ${isDark ? 'text-slate-400' : 'text-[#5C6B75]'}`}>
                    {item.student.grade || `حافلة ${busNum}`} • {item.student.driver_name ? `السائق: ${item.student.driver_name}` : 'بيانات النقل'}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenPass(item.student)}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                    isDark
                      ? 'text-[#F5A623] hover:bg-[#F5A623]/15'
                      : 'text-[#C77F1F] hover:bg-[#E8A33D]/15'
                  }`}
                  title="عرض البطاقة"
                >
                  <IdCard className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectStudent(item.student)}
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isDark
                      ? 'text-slate-300 hover:bg-slate-800'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                  title="بحث فوري"
                >
                  <ArrowUpLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
