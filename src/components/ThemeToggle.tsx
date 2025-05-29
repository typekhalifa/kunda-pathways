
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
};

export default ThemeToggle;
