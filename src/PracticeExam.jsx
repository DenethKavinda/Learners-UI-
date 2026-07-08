import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
// Import the native path lookups helper
import { t } from "./translations/index";

export default function PracticeExam() {
  // Determine initial language from local storage fallback to English
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("app_lang") || "en";
  });

  const [isExamStarted, setIsExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 Minutes in seconds
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);

  // Dynamic clean shortcut translation handler
  const translate = (path) => t(path, currentLang);

  useEffect(() => {
    // Listen to storage changes to keep state synced cleanly across views
    const handleLangChange = () => {
      setCurrentLang(localStorage.getItem("app_lang") || "en");
    };
    window.addEventListener("storage", handleLangChange);

    if (!isExamStarted)
      return () => window.removeEventListener("storage", handleLangChange);

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          alert(translate("exam.alert_time_up"));
          window.location.reload();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      window.removeEventListener("storage", handleLangChange);
    };
  }, [isExamStarted, currentLang]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const simulateNext = () => {
    setCurrentQuestionIndex(8);
    alert(translate("exam.alert_next_question"));
  };

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
        <div className="max-w-4xl mx-auto">
          {!isExamStarted ? (
            /* Start Splash Screen */
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-lg space-y-8 max-w-2xl mx-auto">
              <div className="text-center space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-wide">
                  {translate("exam.page_badge")}
                </span>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  {translate("exam.page_title_part1")}{" "}
                  <span className="text-indigo-600">
                    {translate("exam.page_title_part2")}
                  </span>
                </h1>
              </div>
              <button
                onClick={() => setIsExamStarted(true)}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg text-base"
              >
                {translate("exam.btn_start")}
              </button>
            </div>
          ) : (
            /* Main Interactive MCQ Display */
            <div className="space-y-6">
              <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 uppercase">
                    {translate("exam.label_progress")}
                  </span>
                  <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden border">
                    <div
                      className="bg-indigo-600 h-full transition-all duration-300"
                      style={{
                        width: currentQuestionIndex === 1 ? "5%" : "40%",
                      }}
                    ></div>
                  </div>
                  <span className="text-xs font-extrabold text-slate-700">
                    {translate("exam.label_q")} {currentQuestionIndex}{" "}
                    {translate("exam.label_of")} 20
                  </span>
                </div>

                <div
                  className={`flex items-center gap-2 font-black px-4 py-2 rounded-xl text-sm transition-all ${
                    timeLeft < 180
                      ? "bg-rose-600 text-white animate-pulse"
                      : "bg-rose-50 border border-rose-100 text-rose-700"
                  }`}
                >
                  <span>⏳</span>
                  <span>{formatTime()}</span>
                </div>
              </div>

              <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200/80 shadow-md space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase">
                    {translate("exam.label_question")} 0{currentQuestionIndex}
                  </span>
                  <h2 className="text-xl font-black text-slate-900">
                    {translate(`exam.q${currentQuestionIndex}_text`)}
                  </h2>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200/60 hover:bg-slate-50 cursor-pointer group">
                    <input
                      type="radio"
                      name="mcq_option"
                      className="w-4 h-4 text-indigo-600"
                    />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                      {translate(`exam.q${currentQuestionIndex}_opt1`)}
                    </span>
                  </label>
                  <label className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200/60 hover:bg-slate-50 cursor-pointer group">
                    <input
                      type="radio"
                      name="mcq_option"
                      className="w-4 h-4 text-indigo-600"
                    />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                      {translate(`exam.q${currentQuestionIndex}_opt2`)}
                    </span>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <button
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-400 bg-slate-50"
                    disabled
                  >
                    {translate("exam.btn_prev")}
                  </button>
                  <button
                    onClick={simulateNext}
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all active:scale-95"
                  >
                    {translate("exam.btn_next")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Full-width Footer Wrapper */}
      <div className="w-full px-6 sm:px-12 lg:px-24 border-t border-slate-100 bg-white">
        <Footer />
      </div>
    </div>
  );
}
