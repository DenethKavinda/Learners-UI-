import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { t } from "./translations/index";

export default function Gallery() {
  // Determine initial language from local storage fallback to English
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("app_lang") || "en";
  });

  const [modalData, setModalData] = useState({ isOpen: false, category: "" });

  // Dynamic clean shortcut translation handler
  const translate = (path) => t(path, currentLang);

  useEffect(() => {
    // Listen to storage changes to keep state synced cleanly
    const handleLangChange = () => {
      setCurrentLang(localStorage.getItem("app_lang") || "en");
    };
    window.addEventListener("storage", handleLangChange);
    return () => window.removeEventListener("storage", handleLangChange);
  }, []);

  // All original image assets and array matrices preserved intact
  const imageDatabase = {
    graduates: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600",
    ],
    fleet: [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
    ],
    grounds: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=600",
    ],
    theory: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600",
    ],
  };

  // Dynamically localized titles for the popup container
  const titleDatabase = {
    graduates: translate("gallery.title_graduates"),
    fleet: translate("gallery.title_fleet"),
    grounds: translate("gallery.title_grounds"),
    theory: translate("gallery.title_theory"),
  };

  const openModal = (cat) => setModalData({ isOpen: true, category: cat });
  const closeModal = () => setModalData({ isOpen: false, category: "" });

  return (
    <div className="bg-dot-pattern text-slate-800 antialiased min-h-screen flex flex-col justify-between w-full m-0 p-0 overflow-x-hidden">
      <style>{`
                .bg-dot-pattern {
                    background-color: #fafbfc;
                    background-image: radial-gradient(#e2e8f0 1.5px, transparent 1.5px);
                    background-size: 24px 24px;
                }
                html[lang="si"] body {
                    line-height: 1.65 !important;
                }
            `}</style>

      {/* Wide Header Row */}
      <div className="w-full px-6 sm:px-12 lg:px-24 border-b border-slate-100 bg-white">
        <Header />
      </div>

      <main className="flex-grow w-full m-0 pt-12 pb-24 px-6 sm:px-12 lg:px-24">
        <div className="w-full mx-auto">
          {/* Header Sizing */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            {/* Updated badge with Brand Green color matching logo */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-emerald-700 border border-slate-200 shadow-sm tracking-wide uppercase">
              {translate("gallery.page_badge")}
            </span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              {translate("gallery.page_title_part1")}{" "}
              {/* Updated accent title section with Deep Green */}
              <span className="text-emerald-700">
                {translate("gallery.page_title_part2")}
              </span>
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              {translate("gallery.page_desc")}
            </p>
          </div>

          {/* 4-Column Responsive Layout Grid Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {/* Graduates Card */}
            <div
              onClick={() => openModal("graduates")}
              className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group w-full"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden relative border border-slate-100 bg-slate-100">
                <img
                  src={imageDatabase.graduates[0]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  alt="Graduates"
                />
                <span className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-md text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-lg tracking-wider">
                  {translate("gallery.label_graduates")}
                </span>
              </div>
              <div className="pt-4 px-1">
                {/* Brand Green color applied dynamically to hover state matching logo */}
                <h3 className="font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors text-base">
                  {translate("gallery.card_graduates_title")}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  {translate("gallery.click_to_view")}
                </p>
              </div>
            </div>

            {/* Fleet Card */}
            <div
              onClick={() => openModal("fleet")}
              className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group w-full"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden relative border border-slate-100 bg-slate-100">
                <img
                  src={imageDatabase.fleet[0]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  alt="Vehicles"
                />
                <span className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-md text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-lg tracking-wider">
                  {translate("gallery.label_fleet")}
                </span>
              </div>
              <div className="pt-4 px-1">
                {/* Brand Green color applied dynamically to hover state matching logo */}
                <h3 className="font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors text-base">
                  {translate("gallery.card_fleet_title")}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  {translate("gallery.click_to_view")}
                </p>
              </div>
            </div>

            {/* Grounds Card */}
            <div
              onClick={() => openModal("grounds")}
              className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group w-full"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden relative border border-slate-100 bg-slate-100">
                <img
                  src={imageDatabase.grounds[0]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  alt="Grounds"
                />
                <span className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-md text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-lg tracking-wider">
                  {translate("gallery.label_grounds")}
                </span>
              </div>
              <div className="pt-4 px-1">
                {/* Brand Green color applied dynamically to hover state matching logo */}
                <h3 className="font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors text-base">
                  {translate("gallery.card_grounds_title")}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  {translate("gallery.click_to_view")}
                </p>
              </div>
            </div>

            {/* Theory Card */}
            <div
              onClick={() => openModal("theory")}
              className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group w-full"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden relative border border-slate-100 bg-slate-100">
                <img
                  src={imageDatabase.theory[0]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  alt="Theory"
                />
                <span className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-md text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-lg tracking-wider">
                  {translate("gallery.label_theory")}
                </span>
              </div>
              <div className="pt-4 px-1">
                {/* Brand Green color applied dynamically to hover state matching logo */}
                <h3 className="font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors text-base">
                  {translate("gallery.card_theory_title")}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  {translate("gallery.click_to_view")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FULL-SCREEN OVERLAY POPUP MODAL */}
      {modalData.isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-12 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-[90%] lg:max-w-[85%] rounded-3xl overflow-hidden shadow-2xl relative border border-slate-100 max-h-[85vh] flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  {titleDatabase[modalData.category]}
                </h2>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  {translate("gallery.modal_hint")}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 shadow-sm flex items-center justify-center font-bold text-slate-500 hover:text-slate-900 text-xl transition-all active:scale-90"
              >
                &times;
              </button>
            </div>
            <div className="p-8 overflow-y-auto w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {imageDatabase[modalData.category]?.map((url, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-xl overflow-hidden border border-slate-100 shadow-sm group bg-slate-50"
                  >
                    <img
                      src={url}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      alt="Gallery item matrix block"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full px-6 sm:px-12 lg:px-24 border-t border-slate-100 bg-white">
        <Footer />
      </div>
    </div>
  );
}
