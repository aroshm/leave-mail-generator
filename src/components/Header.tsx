import { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
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
    <div className="flex items-center justify-between py-10 bg-emerald-50 dark:bg-slate-800 text-emerald-600 w-7xl mx-auto">
      <div>
        <p className="flex gap-2.5 items-center text-5xl font-normal mb-1">
          <CiMail/>
          Leave Email Generator
        </p>

        <p>Create structured leave notifications for your team and HR.</p>
      </div>
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
