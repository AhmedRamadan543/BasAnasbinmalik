import { SavedPass, StudentTransportInfo, ThemeMode } from '../types';

const STORAGE_KEY_PASSES = 'ans_transport_saved_passes_v1';
const STORAGE_KEY_THEME = 'ans_transport_theme_v1';

export function getSavedPasses(): SavedPass[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PASSES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('Failed to read saved passes from storage', e);
    return [];
  }
}

export function saveStudentPass(
  student: StudentTransportInfo,
  action: 'viewed' | 'printed' | 'downloaded' = 'viewed'
): SavedPass[] {
  try {
    const existing = getSavedPasses();
    // Filter out duplicates with same name and bus_number
    const filtered = existing.filter(
      (item) => !(item.student.name.trim() === student.name.trim() && item.student.bus_number === student.bus_number)
    );

    const newPass: SavedPass = {
      student,
      viewedAt: Date.now(),
      action,
    };

    // Store most recent first, max 10
    const updated = [newPass, ...filtered].slice(0, 10);
    localStorage.setItem(STORAGE_KEY_PASSES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed to save pass to storage', e);
    return [];
  }
}

export function clearSavedPasses(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_PASSES);
  } catch (e) {
    console.warn('Failed to clear passes', e);
  }
}

export function getStoredTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  } catch {
    return 'light';
  }
}

export function setStoredTheme(theme: ThemeMode): void {
  try {
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  } catch (e) {
    console.warn('Failed to set stored theme', e);
  }
}
