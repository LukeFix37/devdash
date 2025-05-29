import { Moon, Sun } from 'lucide-react';
import useDarkMode from '../hooks/useDarkMode';
import '../App.css';

export default function Header() {
  const [theme, setTheme] = useDarkMode();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="flex items-center justify-between p-4 bg-primary text-primary-foreground shadow-lg rounded-xl mb-6">
      <h1 className="text-2xl font-bold">DevDash</h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </header>
  );
}
