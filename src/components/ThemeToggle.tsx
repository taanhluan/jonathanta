import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
type Theme = 'light' | 'dark';
export function readTheme(): Theme {
  try { const saved = localStorage.getItem('profile-theme'); if (saved === 'light' || saved === 'dark') return saved; } catch { /* Storage may be disabled. */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem('profile-theme', theme); } catch { /* Keep the in-memory preference. */ }
  }, [theme]);
  return <button type="button" className="theme-toggle" onClick={() => setTheme(value => value === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'} aria-pressed={theme === 'dark'} title={theme === 'dark' ? 'Giao diện sáng' : 'Giao diện tối'}>{theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}<span>{theme === 'dark' ? 'Sáng' : 'Tối'}</span></button>;
}
