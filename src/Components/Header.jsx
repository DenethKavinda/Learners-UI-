import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added for routing structures[cite: 9]
import { t } from "../translations/index"; // Matches translation lookup paths[cite: 9]
import ThisaraLogo from "../assets/ThisaraLogo.png"; // Imported your new logo image[cite: 9]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); //[cite: 9]
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false); //[cite: 9]
  const location = useLocation(); // Hook to listen to internal active path switches[cite: 9]
  const navigate = useNavigate(); //[cite: 9]

  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("app_lang") || "en"; //[cite: 9]
  });

  const changeLanguage = (langCode) => {
    localStorage.setItem("app_lang", langCode); //[cite: 9]
    setCurrentLang(langCode); //[cite: 9]
    setIsLangDropdownOpen(false); //[cite: 9]
    window.location.reload(); //[cite: 9]
  };

  const toggleMobileLanguage = () => {
    changeLanguage(currentLang === "en" ? "si" : "en"); //[cite: 9]
  };

  // Dynamic active state path calculation logic matching hash section triggers safely
  const isCurrentPath = (path) => {
    if (path === "/Packages") {
      return location.hash === "#packages-section";
    }
    if (path === "/") {
      return location.pathname === "/" && location.hash !== "#packages-section";
    }
    return location.pathname === path;
  };

  // BRAND COLOR UPDATE: changed text-indigo-600 to text-emerald-700 for the active link item highlight look
  const linkClass = (path) =>
    `inline-block text-sm transition-all duration-150 transform active:scale-95 ${
      isCurrentPath(path)
        ? "font-bold text-emerald-700"
        : "font-semibold text-slate-600 hover:text-slate-900" // Default state[cite: 9]
    }`;

  const handleNavigationClick = () => {
    setIsMobileMenuOpen(false); //[cite: 9]
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Skips smooth scroll delays to prevent layout stuck states[cite: 9]
    });
  };

  // Programmatic smooth scroll handler targeting the home page bottom block[cite: 9]
  const handlePackageNav = (e) => {
    e.preventDefault(); //[cite: 9]
    setIsMobileMenuOpen(false); //[cite: 9]

    if (location.pathname === "/") {
      //[cite: 9]
      const element = document.getElementById("packages-section"); //[cite: 9]
      if (element) {
        //[cite: 9]
        element.scrollIntoView({ behavior: "smooth" }); //[cite: 9]
        window.history.pushState(null, "", "#packages-section");
      }
    } else {
      navigate("/"); //[cite: 9]
      setTimeout(() => {
        //[cite: 9]
        const element = document.getElementById("packages-section"); //[cite: 9]
        if (element) {
          //[cite: 9]
          element.scrollIntoView({ behavior: "smooth" }); //[cite: 9]
        }
      }, 100); //[cite: 9]
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 bg-white border-b border-slate-200/60 shadow-sm w-full">
        {" "}
        <div className="w-full mx-auto px-4 sm:px-12 lg:px-24">
          {" "}
          <div className="flex justify-between h-24 md:h-28 items-center w-full relative">
            {" "}
            {/* Logo linked to home natively */}
            <Link
              to="/"
              onClick={handleNavigationClick} //[cite: 9]
              className="flex-shrink-0 flex items-center gap-2 sm:gap-4 transform transition-all duration-150 active:scale-95 cursor-pointer max-w-[80%] sm:max-w-none" //[cite: 9]
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center flex-shrink-0 overflow-hidden rounded-xl">
                {" "}
                <img
                  src={ThisaraLogo}
                  alt="Thisara Driving School Logo"
                  className="w-full h-full object-contain" //[cite: 9]
                />
              </div>
              <span className="text-xs xs:text-sm sm:text-xl font-extrabold text-slate-900 tracking-tight notranslate truncate sm:whitespace-normal">
                {" "}
                THISARA DRIVING SCHOOL
              </span>
            </Link>
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-5 lg:space-x-8">
              {" "}
              <Link
                to="/"
                onClick={handleNavigationClick} //[cite: 9]
                className={linkClass("/")}
              >
                {t("nav.home", currentLang)}
              </Link>
              {/* Package target intercept updated to use customized scroll engine */}
              <a
                href="#packages-section"
                onClick={handlePackageNav} //[cite: 9]
                className={linkClass("/Packages")}
              >
                {t("nav.packages", currentLang)}
              </a>
              <Link
                to="/Gallery"
                onClick={handleNavigationClick} //[cite: 9]
                className={linkClass("/Gallery")}
              >
                {t("nav.gallery", currentLang)}
              </Link>
              <Link
                to="/About"
                onClick={handleNavigationClick} //[cite: 9]
                className={linkClass("/About")}
              >
                {t("nav.about", currentLang)}
              </Link>
              <Link
                to="/Contact"
                onClick={handleNavigationClick} //[cite: 9]
                className={linkClass("/Contact")}
              >
                {t("nav.contact", currentLang)}
              </Link>
            </div>
            {/* Language Switcher Dropdown */}
            <div className="hidden md:flex items-center space-x-4">
              {" "}
              <div className="relative inline-block text-left">
                {" "}
                <button
                  type="button"
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)} //[cite: 9]
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/60 transition-all duration-150 active:scale-95" //[cite: 9]
                >
                  <span>🌐</span>
                  <span>{currentLang === "si" ? "සිංහල" : "English"}</span>{" "}
                  <svg
                    className="w-4 h-4 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor" //[cite: 9]
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />{" "}
                  </svg>
                </button>
                {isLangDropdownOpen && ( //[cite: 9]
                  <div className="absolute right-0 mt-2 w-32 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-50 transform origin-top-right">
                    {" "}
                    <button
                      onClick={() => changeLanguage("en")} //[cite: 9]
                      className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between" //[cite: 9]
                    >
                      <span>English</span>
                      {/* BRAND COLOR UPDATE: changed text-indigo-600 to text-emerald-700 */}
                      {currentLang === "en" && (
                        <span className="text-emerald-700 text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => changeLanguage("si")} //[cite: 9]
                      className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between" //[cite: 9]
                    >
                      <span>සිංහල</span>
                      {/* BRAND COLOR UPDATE: changed text-indigo-600 to text-emerald-700 */}
                      {currentLang === "si" && (
                        <span className="text-emerald-700 text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-1.5 sm:space-x-2 z-50 flex-shrink-0">
              {" "}
              <button
                type="button"
                onClick={toggleMobileLanguage} //[cite: 9]
                className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-bold bg-slate-50 border border-slate-200 text-slate-600 transition-all active:scale-95" //[cite: 9]
              >
                <span>🌐</span>
                <span>{currentLang === "si" ? "සිං" : "EN"}</span>{" "}
              </button>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} //[cite: 9]
                className="text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-all duration-150 transform active:scale-90" //[cite: 9]
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor" //[cite: 9]
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />{" "}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu Content Panel Drawer */}
        {isMobileMenuOpen && ( //[cite: 9]
          /* Shifted mobile panel context down slightly to top-24 to handle enlarged navbar frame[cite: 9] */
          <div className="md:hidden absolute top-24 left-0 w-full border-t border-slate-100 bg-white py-4 px-6 space-y-2 shadow-xl z-40 animate-fadeIn">
            {" "}
            {/* BRAND COLOR UPDATE: changed bg-indigo-50 text-indigo-600 variants to bg-emerald-50 text-emerald-700 properties across mobile rows */}
            <Link
              to="/"
              onClick={handleNavigationClick} //[cite: 9]
              className={`block px-4 py-2 rounded-xl text-sm ${isCurrentPath("/") ? "bg-emerald-50 font-bold text-emerald-700" : "font-medium text-slate-600"}`} //[cite: 9]
            >
              {t("nav.home", currentLang)}
            </Link>
            <a
              href="#packages-section"
              onClick={handlePackageNav} //[cite: 9]
              className={`block px-4 py-2 rounded-xl text-sm ${isCurrentPath("/Packages") ? "bg-emerald-50 font-bold text-emerald-700" : "font-medium text-slate-600"}`} //[cite: 9]
            >
              {t("nav.packages", currentLang)}
            </a>
            <Link
              to="/Gallery"
              onClick={handleNavigationClick} //[cite: 9]
              className={`block px-4 py-2 rounded-xl text-sm ${isCurrentPath("/Gallery") ? "bg-emerald-50 font-bold text-emerald-700" : "font-medium text-slate-600"}`} //[cite: 9]
            >
              {t("nav.gallery", currentLang)}
            </Link>
            <Link
              to="/About"
              onClick={handleNavigationClick} //[cite: 9]
              className={`block px-4 py-2 rounded-xl text-sm ${isCurrentPath("/About") ? "bg-emerald-50 font-bold text-emerald-700" : "font-medium text-slate-600"}`} //[cite: 9]
            >
              {t("nav.about", currentLang)}
            </Link>
            <Link
              to="/Contact"
              onClick={handleNavigationClick} //[cite: 9]
              className={`block px-4 py-2 rounded-xl text-sm ${isCurrentPath("/Contact") ? "bg-emerald-50 font-bold text-emerald-700" : "font-medium text-slate-600"}`} //[cite: 9]
            >
              {t("nav.contact", currentLang)}
            </Link>
          </div>
        )}
      </nav>
      {/* Adjusted structural height to avoid layout shifting on lower section page text initialization[cite: 9] */}
      <div className="h-24 md:h-28 w-full flex-shrink-0"></div>
    </>
  );
}
