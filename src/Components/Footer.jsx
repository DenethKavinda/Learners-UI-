import React, { useState, useEffect } from "react";
import { t } from "../translations/index"; // Direct path mapping matching your operational routing template
import ThisaraLogo from "../assets/ThisaraLogo.png"; // Imported your logo image

export default function Footer() {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("app_lang") || "en";
  });

  const translate = (path) => t(path, currentLang);

  useEffect(() => {
    const handleLangChange = () => {
      setCurrentLang(localStorage.getItem("app_lang") || "en");
    };
    window.addEventListener("storage", handleLangChange);
    return () => window.removeEventListener("storage", handleLangChange);
  }, []);

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-8 relative z-10 w-full mt-auto">
      <div className="w-full mx-auto px-6 sm:px-12 lg:px-24">
        {/* Section: Leadership & Management */}
        <div className="pb-12 border-b border-slate-100 mb-12">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6 md:text-left text-center">
            {translate("footer.team_heading")}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/50 hover:shadow-md transition-all h-auto min-h-[88px]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                alt="Sarah Wickrema"
                className="w-14 h-14 rounded-xl object-cover shadow-sm border border-slate-200 flex-shrink-0"
              />
              <div>
                <h5 className="text-sm font-bold text-slate-900 notranslate">
                  Sarah Wickrema
                </h5>
                {/* BRAND COLOR UPDATE: text-indigo-600 changed to text-emerald-700 */}
                <p className="text-xs text-emerald-700 font-semibold">
                  {translate("footer.role_sarah")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/50 hover:shadow-md transition-all h-auto min-h-[88px]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                alt="David Perera"
                className="w-14 h-14 rounded-xl object-cover shadow-sm border border-slate-200 flex-shrink-0"
              />
              <div>
                <h5 className="text-sm font-bold text-slate-900 notranslate">
                  David Perera
                </h5>
                {/* BRAND COLOR UPDATE: text-indigo-600 changed to text-emerald-700 */}
                <p className="text-xs text-emerald-700 font-semibold">
                  {translate("footer.role_david")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/50 hover:shadow-md transition-all h-auto min-h-[88px]">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"
                alt="Jude Silva"
                className="w-14 h-14 rounded-xl object-cover shadow-sm border border-slate-200 flex-shrink-0"
              />
              <div>
                <h5 className="text-sm font-bold text-slate-900 notranslate">
                  Jude Silva
                </h5>
                {/* BRAND COLOR UPDATE: text-indigo-600 changed to text-emerald-700 */}
                <p className="text-xs text-emerald-700 font-semibold">
                  {translate("footer.role_jude")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Main Directory Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-100 items-start">
          {/* Branding Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center flex-shrink-0 overflow-hidden rounded-xl">
                <img
                  src={ThisaraLogo}
                  alt="Thisara Driving School Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight notranslate">
                THISARA DRIVING SCHOOL
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-sm">
              {translate("footer.branding_desc")}
            </p>
          </div>

          {/* Contact Information Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
              {translate("footer.connect_heading")}
            </h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/94772339227"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors group"
              >
                <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  💬
                </span>
                <span className="notranslate text-[11px] sm:text-xs">
                  WhatsApp (+94 77 233 9227)
                </span>
              </a>

              {/* BRAND COLOR UPDATE: bg-indigo-50 text-indigo-600 changed to bg-emerald-50 text-emerald-700 */}
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
                <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center text-sm">
                  📞
                </span>
                <span className="notranslate">Hotline: 077-2339227</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
                <span className="w-7 h-7 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center text-sm">
                  ✉️
                </span>
                <span className="notranslate truncate">
                  thisaralearners@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Social Channels Column */}
          <div className="md:col-span-3 space-y-4 md:text-right">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
              {translate("footer.social_heading")}
            </h4>
            <p className="text-[11px] font-medium text-slate-400">
              {translate("footer.social_desc")}
            </p>

            {/* BRAND COLOR UPDATE: hover:bg-indigo-50 hover:text-indigo-600 changed to hover:bg-emerald-50 hover:text-emerald-700 */}
            <div className="flex items-center gap-2 md:justify-end pt-1">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/60 flex items-center justify-center text-slate-600 hover:text-emerald-700 transition-all transform hover:-translate-y-0.5 shadow-sm"
                title="Like us on Facebook"
              >
                <span className="text-sm font-bold">📘</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-200/60 flex items-center justify-center text-slate-600 hover:text-red-600 transition-all transform hover:-translate-y-0.5 shadow-sm"
                title="Subscribe on YouTube"
              >
                <span className="text-sm font-bold">▶️</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-900 border border-slate-200/60 flex items-center justify-center text-slate-600 hover:text-white transition-all transform hover:-translate-y-0.5 shadow-sm"
                title="Follow us on X"
              >
                <span className="text-xs font-bold">✖️</span>
              </a>
            </div>
            <p className="text-[10px] font-medium text-slate-400 italic">
              {translate("footer.working_hours")}
            </p>
          </div>
        </div>

        {/* Footer Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-semibold text-slate-400">
            &copy; 2026 Learnerce Driving Systems. All rights reserved.
          </p>
          <div className="flex space-x-6 text-[11px] font-semibold text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">
              {translate("footer.terms")}
            </a>
            <a href="#" className="hover:text-slate-600 transition-colors">
              {translate("footer.privacy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
