import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Added for routing structures
import { t } from "../translations/index"; // Matches translation lookup paths
import ThisaraLogo from "../assets/ThisaraLogo.png"; // Imported your new logo image

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const location = useLocation(); // Hook to listen to internal active path switches

  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("app_lang") || "en";
  });

  const changeLanguage = (langCode) => {
    localStorage.setItem("app_lang", langCode);
    setCurrentLang(langCode);
    setIsLangDropdownOpen(false);
    window.location.reload();
  };

  const toggleMobileLanguage = () => {
    changeLanguage(currentLang === "en" ? "si" : "en");
  };

  // React router location path checker
  const isCurrentPath = (path) => location.pathname === path;

  const linkClass = (path) =>
    `inline-block text-sm transition-all duration-150 transform active:scale-95 ${
      isCurrentPath(path)
        ? "font-bold text-indigo-600"
        : "font-semibold text-slate-600 hover:text-slate-900"
    }`;

  // Force snap calculation block to guarantee top screen alignment instantly
  const handleNavigationClick = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Skips smooth scroll delays to prevent layout stuck states
    });
  };

  return (
    <>
      {/* Changed background from bg-white/80 backdrop-blur-md to a solid solid bg-white */}
      <nav className="fixed top-0 left-0 z-50 bg-white border-b border-slate-200/60 shadow-sm w-full">
        {/* Full-width container lining up exactly with pages */}
        <div className="w-full mx-auto px-4 sm:px-12 lg:px-24">
          {/* Increased container height to h-24 on mobile and md:h-28 on desktop to fit the larger logo nicely */}
          <div className="flex justify-between h-24 md:h-28 items-center w-full relative">
            {/* Logo linked to home natively */}
            <Link
              to="/"
              onClick={handleNavigationClick}
              className="flex-shrink-0 flex items-center gap-2 sm:gap-4 transform transition-all duration-150 active:scale-95 cursor-pointer max-w-[80%] sm:max-w-none"
            >
              {/* Maximized logo image dimensions */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center flex-shrink-0 overflow-hidden rounded-xl">
                <img
                  src={ThisaraLogo}
                  alt="Thisara Driving School Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs xs:text-sm sm:text-xl font-extrabold text-slate-900 tracking-tight notranslate truncate sm:whitespace-normal">
                THISARA DRIVING SCHOOL
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-5 lg:space-x-8">
              <Link
                to="/"
                onClick={handleNavigationClick}
                className={linkClass("/")}
              >
                {t("nav.home", currentLang)}
              </Link>

              <Link
                to="/Packages"
                onClick={handleNavigationClick}
                className={linkClass("/Packages")}
              >
                {t("nav.packages", currentLang)}
              </Link>

              <Link
                to="/Gallery"
                onClick={handleNavigationClick}
                className={linkClass("/Gallery")}
              >
                {t("nav.gallery", currentLang)}
              </Link>

              <Link
                to="/About"
                onClick={handleNavigationClick}
                className={linkClass("/About")}
              >
                {t("nav.about", currentLang)}
              </Link>

              <Link
                to="/Contact"
                onClick={handleNavigationClick}
                className={linkClass("/Contact")}
              >
                {t("nav.contact", currentLang)}
              </Link>
            </div>

            {/* Language Switcher Dropdown Action (Desktop Mode Only) */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/60 transition-all duration-150 active:scale-95"
                >
                  <span>🌐</span>
                  <span>{currentLang === "si" ? "සිංහල" : "English"}</span>

                  <svg
                    className="w-4 h-4 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isLangDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-50 transform origin-top-right">
                    <button
                      onClick={() => changeLanguage("en")}
                      className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>English</span>
                      {currentLang === "en" && (
                        <span className="text-indigo-600 text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => changeLanguage("si")}
                      className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>සිංහල</span>
                      {currentLang === "si" && (
                        <span className="text-indigo-600 text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Actions Container */}
            <div className="md:hidden flex items-center space-x-1.5 sm:space-x-2 z-50 flex-shrink-0">
              <button
                type="button"
                onClick={toggleMobileLanguage}
                className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-bold bg-slate-50 border border-slate-200 text-slate-600 transition-all active:scale-95"
              >
                <span>🌐</span>
                <span>{currentLang === "si" ? "සිං" : "EN"}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-all duration-150 transform active:scale-90"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Content Panel Drawer */}
        {isMobileMenuOpen && (
          /* Shifted mobile panel context down slightly to top-24 to handle enlarged navbar frame */
          <div className="md:hidden absolute top-24 left-0 w-full border-t border-slate-100 bg-white py-4 px-6 space-y-2 shadow-xl z-40 animate-fadeIn">
            <Link
              to="/"
              onClick={handleNavigationClick}
              className={`block px-4 py-2 rounded-xl text-sm ${isCurrentPath("/") ? "bg-indigo-50 font-bold text-indigo-600" : "font-medium text-slate-600"}`}
            >
              {t("nav.home", currentLang)}
            </Link>
            <Link
              to="/Packages"
              onClick={handleNavigationClick}
              className={`block px-4 py-2 rounded-xl text-sm ${isCurrentPath("/Packages") ? "bg-indigo-50 font-bold text-indigo-600" : "font-medium text-slate-600"}`}
            >
              {t("nav.packages", currentLang)}
            </Link>
            <Link
              to="/Gallery"
              onClick={handleNavigationClick}
              className={`block px-4 py-2 rounded-xl text-sm ${isCurrentPath("/Gallery") ? "bg-indigo-50 font-bold text-indigo-600" : "font-medium text-slate-600"}`}
            >
              {t("nav.gallery", currentLang)}
            </Link>
            <Link
              to="/About"
              onClick={handleNavigationClick}
              className={`block px-4 py-2 rounded-xl text-sm ${isCurrentPath("/About") ? "bg-indigo-50 font-bold text-indigo-600" : "font-medium text-slate-600"}`}
            >
              {t("nav.about", currentLang)}
            </Link>
            <Link
              to="/Contact"
              onClick={handleNavigationClick}
              className={`block px-4 py-2 rounded-xl text-sm ${isCurrentPath("/Contact") ? "bg-indigo-50 font-bold text-indigo-600" : "font-medium text-slate-600"}`}
            >
              {t("nav.contact", currentLang)}
            </Link>
          </div>
        )}
      </nav>

      {/* Adjusted structural height to avoid layout shifting on lower section page text initialization */}
      <div className="h-24 md:h-28 w-full flex-shrink-0"></div>
    </>
  );
}
