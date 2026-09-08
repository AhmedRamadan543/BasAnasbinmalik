import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { SearchCard } from './components/SearchCard';
import { ResultCard } from './components/ResultCard';
import { QuickContacts } from './components/QuickContacts';
import { RecentPasses } from './components/RecentPasses';
import {
  PlaceholderView,
  LoadingView,
  NeedMoreView,
  NotFoundView,
  ErrorView,
} from './components/StateViews';
import { ContactModal } from './components/ContactModal';
import { StudentPassModal } from './components/StudentPassModal';
import {
  searchTransportApi,
  searchDemoStudents,
  DEFAULT_API_URL,
} from './services/transportApi';
import {
  getSavedPasses,
  saveStudentPass,
  clearSavedPasses,
  getStoredTheme,
  setStoredTheme,
} from './utils/storage';
import { StudentTransportInfo, SearchStatus, SavedPass, ThemeMode, SCHOOL_CONTACTS } from './types';
import { AlertTriangle, Sparkles, Phone, MessageCircle } from 'lucide-react';

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [matches, setMatches] = useState<StudentTransportInfo[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedStudentForPass, setSelectedStudentForPass] = useState<StudentTransportInfo | null>(null);
  
  // Theme state
  const [theme, setTheme] = useState<ThemeMode>(getStoredTheme);
  const isDark = theme === 'dark';

  // Saved passes history
  const [savedPasses, setSavedPasses] = useState<SavedPass[]>([]);

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize theme class on root html & load saved passes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setStoredTheme(theme);
  }, [theme, isDark]);

  useEffect(() => {
    setSavedPasses(getSavedPasses());
  }, []);

  // Keyboard navigation: '/' to focus search, 'Escape' to clear/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user pressed '/' to focus search
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        // Prevent default only if not typing in an input/textarea
        const tag = (document.activeElement?.tagName || '').toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
          e.preventDefault();
          searchInputRef.current?.focus();
          searchInputRef.current?.select();
        }
      }

      // Check if user pressed 'Escape'
      if (e.key === 'Escape') {
        if (contactOpen) {
          setContactOpen(false);
          return;
        }
        if (selectedStudentForPass) {
          setSelectedStudentForPass(null);
          return;
        }
        if (query || matches.length > 0) {
          setQuery('');
          setStatus('idle');
          setMatches([]);
          searchInputRef.current?.blur();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [contactOpen, selectedStudentForPass, query, matches.length]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const executeSearch = async (searchTerm: string, useDemo = isDemoMode) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) {
      setStatus('idle');
      setMatches([]);
      return;
    }

    setStatus('loading');

    if (useDemo) {
      setTimeout(() => {
        const res = searchDemoStudents(trimmed);
        setStatus(res.status as SearchStatus);
        setMatches(res.matches || []);
        if (res.matches && res.matches.length === 1) {
          // Auto record single found match in recent passes
          const updated = saveStudentPass(res.matches[0], 'viewed');
          setSavedPasses(updated);
        }
      }, 250);
      return;
    }

    try {
      const data = await searchTransportApi(trimmed, DEFAULT_API_URL);
      if (data.status === 'found' && data.matches) {
        setMatches(data.matches);
        setStatus('found');
        if (data.matches.length === 1) {
          const updated = saveStudentPass(data.matches[0], 'viewed');
          setSavedPasses(updated);
        }
      } else if (data.status === 'need_more') {
        setMatches([]);
        setStatus('need_more');
      } else if (data.status === 'not_found') {
        setMatches([]);
        setStatus('not_found');
      } else {
        setStatus('idle');
        setMatches([]);
      }
    } catch {
      // If network is offline, check demo dataset
      const demoRes = searchDemoStudents(trimmed);
      if (demoRes.status === 'found') {
        setMatches(demoRes.matches || []);
        setStatus('found');
        if (demoRes.matches && demoRes.matches.length === 1) {
          const updated = saveStudentPass(demoRes.matches[0], 'viewed');
          setSavedPasses(updated);
        }
      } else {
        setStatus('error');
      }
    }
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      executeSearch(val);
    }, 350);
  };

  const handleClear = () => {
    setQuery('');
    setStatus('idle');
    setMatches([]);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    searchInputRef.current?.focus();
  };

  const handleSelectSample = (sample: string) => {
    setQuery(sample);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    executeSearch(sample);
  };

  const handleSelectStudentFromHistory = (student: StudentTransportInfo) => {
    setQuery(student.name);
    executeSearch(student.name);
  };

  const handleOpenPass = (student: StudentTransportInfo) => {
    setSelectedStudentForPass(student);
    const updated = saveStudentPass(student, 'viewed');
    setSavedPasses(updated);
  };

  const handleClearHistory = () => {
    clearSavedPasses();
    setSavedPasses([]);
  };

  const handleRetry = () => {
    executeSearch(query);
  };

  const handleEnableDemo = () => {
    setIsDemoMode(true);
    executeSearch(query, true);
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${
        isDark 
          ? 'bg-[#091017] text-slate-100 selection:bg-[#F5A623]/30 selection:text-white' 
          : 'bg-[#FBF7EF] text-[#1E2A33] selection:bg-[#E8A33D]/25 selection:text-[#0E2434]'
      }`} 
      dir="rtl"
    >
      <div>
        {/* Main Header with Theme Switcher and Grand Headline */}
        <Header 
          onOpenContact={() => setContactOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Content Container */}
        <main className="max-w-2xl mx-auto px-4 sm:px-6 pb-12 relative z-20">
          {/* Search Box */}
          <SearchCard
            ref={searchInputRef}
            value={query}
            onChange={handleQueryChange}
            onClear={handleClear}
            onSelectSample={handleSelectSample}
            isDark={isDark}
          />

          {/* Demo Mode Indicator Banner */}
          {isDemoMode && (
            <div className={`mt-3 rounded-xl p-3 flex items-center justify-between text-xs border ${
              isDark 
                ? 'bg-[#1F3244]/40 border-[#F5A623]/30 text-[#F5A623]' 
                : 'bg-[#E8A33D]/15 border-[#E8A33D]/30 text-[#16324A]'
            }`}>
              <div className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-[#C77F1F] dark:text-[#F5A623]" />
                <span>وضع المعاينة التجريبي مفعّل (عينات استرشادية)</span>
              </div>
              <button
                onClick={() => {
                  setIsDemoMode(false);
                  executeSearch(query, false);
                }}
                className="underline font-bold cursor-pointer hover:opacity-80"
              >
                العودة لقاعدة البيانات المباشرة
              </button>
            </div>
          )}

          {/* Results Display Area */}
          <div className="mt-5 space-y-3">
            {status === 'idle' && <PlaceholderView isDark={isDark} />}

            {status === 'loading' && <LoadingView isDark={isDark} />}

            {status === 'need_more' && <NeedMoreView isDark={isDark} />}

            {status === 'not_found' && (
              <NotFoundView 
                onOpenHelp={() => setContactOpen(true)} 
                isDark={isDark} 
              />
            )}

            {status === 'error' && (
              <ErrorView
                onRetry={handleRetry}
                onEnableDemo={handleEnableDemo}
                isDark={isDark}
              />
            )}

            {status === 'found' && (
              <div className="space-y-3">
                {matches.length > 1 && (
                  <div className={`text-xs rounded-xl p-3.5 flex items-start gap-2.5 border shadow-2xs leading-relaxed ${
                    isDark
                      ? 'bg-[#1F2937] border-[#F5A623]/40 text-[#F5A623]'
                      : 'bg-[#FDF4E4] border-[#F1DCAE] text-[#C77F1F]'
                  }`}>
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      يوجد أكثر من طالب مسجّل باسم متطابق — يُرجى التأكد من الصف الدراسي، أو التواصل مع مسؤول الحافلات للتأكيد.
                    </span>
                  </div>
                )}

                {matches.map((student, idx) => (
                  <ResultCard
                    key={`${student.name}-${student.bus_number}-${idx}`}
                    student={student}
                    onOpenPass={handleOpenPass}
                    isDark={isDark}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Recently Viewed Passes (Local Storage) */}
          <RecentPasses
            passes={savedPasses}
            onSelectStudent={handleSelectStudentFromHistory}
            onOpenPass={handleOpenPass}
            onClear={handleClearHistory}
            isDark={isDark}
          />

          {/* Prominent Quick Contacts Section for Bus Coordinator & Principal */}
          <QuickContacts isDark={isDark} />
        </main>
      </div>

      {/* Modern Footer with credentials & direct links */}
      <footer className={`text-center py-8 px-5 border-t transition-colors ${
        isDark ? 'bg-[#0B1520] border-[#1F3244] text-slate-400' : 'bg-[#FBF7EF] border-[#E4DCC9]/60 text-[#5C6B75]'
      }`}>
        <div className="w-10 h-1 bg-[#E8A33D] rounded-full mx-auto mb-4" />
        
        {/* Quick footer hotline */}
        <div className="flex items-center justify-center gap-4 flex-wrap mb-3 text-xs">
          <a
            href={`tel:${SCHOOL_CONTACTS.busCoordinator.rawPhone}`}
            className="inline-flex items-center gap-1.5 hover:text-[#C77F1F] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#E8A33D]" />
            <span>مسؤول الحافلات: {SCHOOL_CONTACTS.busCoordinator.name} ({SCHOOL_CONTACTS.busCoordinator.phone})</span>
          </a>
          <span className="hidden sm:inline opacity-40">•</span>
          <a
            href={`https://wa.me/${SCHOOL_CONTACTS.principal.waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-600 hover:underline"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>واتساب مديرة المدرسة: {SCHOOL_CONTACTS.principal.name}</span>
          </a>
        </div>

        <p className="m-0 text-xs font-semibold">
          إعداد: الأستاذ أحمد رمضان عبدالعزيز &nbsp;•&nbsp; مديرة المدرسة: الأستاذة هبة قطب
        </p>
        <p className="text-[11px] opacity-70 mt-1 mb-0 font-['Cairo']">
          سلطنة عُمان • مدرسة أنس بن مالك الخاصة — بوابة الاستعلام الذكي وتصاريح النقل المدرسي
        </p>
      </footer>

      {/* Modals */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        isDark={isDark}
      />

      <StudentPassModal
        student={selectedStudentForPass}
        onClose={() => setSelectedStudentForPass(null)}
        isDark={isDark}
      />
    </div>
  );
}
