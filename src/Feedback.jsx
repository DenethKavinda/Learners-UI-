import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
// Import the native path lookups helper
import { t } from "./translations/index";

export default function Feedback() {
  // Determine initial language from local storage fallback to English
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("app_lang") || "en";
  });

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedChip, setSelectedChip] = useState("");
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [comments, setComments] = useState("");

  // Dynamic clean shortcut translation handler
  const translate = (path) => t(path, currentLang);

  useEffect(() => {
    // Listen to storage changes to keep state synced cleanly across views
    const handleLangChange = () => {
      setCurrentLang(localStorage.getItem("app_lang") || "en");
    };
    window.addEventListener("storage", handleLangChange);
    return () => window.removeEventListener("storage", handleLangChange);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert(translate("feedback.alert_no_rating"));
      return;
    }
    alert(translate("feedback.alert_success"));
    window.location.href = "/";
  };

  // BRAND COLOR UPDATE: changed border-indigo-600 bg-indigo-50/40 text-indigo-700 to brand emerald green variants
  const chipClass = (value) =>
    `border p-3 rounded-xl text-center cursor-pointer block group transition-all relative ${
      selectedChip === value
        ? "border-emerald-600 bg-emerald-50/40 text-emerald-800"
        : "border-slate-200 bg-slate-50/30 hover:bg-slate-50 text-slate-600"
    }`;

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

      {/* Full-width Header Wrapper */}
      <div className="w-full px-6 sm:px-12 lg:px-24 border-b border-slate-100 bg-white">
        <Header />
      </div>

      <main className="flex-grow w-full m-0 pt-12 pb-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            {/* BRAND COLOR UPDATE: changed bg-indigo-50 text-indigo-600 border-indigo-100 to emerald variants */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wide">
              {translate("feedback.page_badge")}
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {translate("feedback.page_title_part1")}{" "}
              {/* BRAND COLOR UPDATE: changed text-indigo-600 to text-emerald-700 */}
              <span className="text-emerald-700">
                {translate("feedback.page_title_part2")}
              </span>
            </h1>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              {translate("feedback.page_desc")}
            </p>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200/80 shadow-lg space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Panel */}
              <div className="space-y-2 text-center pb-4 border-b border-slate-100">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  {translate("feedback.label_rating")}
                </label>
                <div className="flex items-center justify-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`text-3xl md:text-4xl transition-transform active:scale-90 filter drop-shadow-sm ${
                        star <= (hoverRating || rating)
                          ? "text-amber-400 scale-110"
                          : "text-slate-200"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label
                    htmlFor="student_name"
                    className="text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    {translate("feedback.label_name")}
                  </label>
                  {/* BRAND COLOR UPDATE: changed focus:border-indigo-500 to focus:border-emerald-600 */}
                  <input
                    type="text"
                    id="student_name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Amara Perera"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50/50 border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="assigned_instructor"
                    className="text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    {translate("feedback.label_instructor")}
                  </label>
                  <div className="relative">
                    <select
                      id="assigned_instructor"
                      required
                      value={instructor}
                      onChange={(e) => setInstructor(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50/50 border border-slate-200 text-sm focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        {translate("feedback.opt_instructor_placeholder")}
                      </option>
                      <option value="sarah">Sarah Wickrema</option>
                      <option value="david">David Perera</option>
                      <option value="jude">Jude Silva</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {translate("feedback.label_package")}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setSelectedChip("combo")}
                    className={chipClass("combo")}
                  >
                    <span className="text-xs font-bold block">
                      {translate("feedback.pkg_combo")}
                    </span>
                  </div>
                  <div
                    onClick={() => setSelectedChip("car")}
                    className={chipClass("car")}
                  >
                    <span className="text-xs font-bold block">
                      {translate("feedback.pkg_car")}
                    </span>
                  </div>
                  <div
                    onClick={() => setSelectedChip("express")}
                    className={chipClass("express")}
                  >
                    <span className="text-xs font-bold block">
                      {translate("feedback.pkg_express")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="feedback_comments"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  {translate("feedback.label_comments")}
                </label>
                {/* BRAND COLOR UPDATE: changed focus:border-indigo-500 to focus:border-emerald-600 */}
                <textarea
                  id="feedback_comments"
                  required
                  rows="5"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="..."
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50/50 border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white resize-none transition-all"
                ></textarea>
              </div>

              {/* BRAND COLOR UPDATE: changed bg-indigo-600 hover:bg-indigo-700 to brand emerald greens */}
              <button
                type="submit"
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-emerald-700/10 active:scale-[0.99]"
              >
                {translate("feedback.btn_submit")}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Full-width Footer Wrapper */}
      <div className="w-full px-6 sm:px-12 lg:px-24 border-t border-slate-100 bg-white">
        <Footer />
      </div>
    </div>
  );
}
