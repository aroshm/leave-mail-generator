import { useEffect, useState } from "react";
import { GoMoon, GoSun } from "react-icons/go";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex items-center justify-between p-2.5 bg-emerald-100 border-b border-emerald-800 dark:bg-emerald-800 dark:border-emerald-100 dark:text-emerald-50">
      <p className="text-5xl font-semibold">Leave Email Generator</p>
      <div>
        <button
          className="cursor-pointer"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <GoSun className="h-7 w-7" />
          ) : (
            <GoMoon className="h-7 w-7" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
