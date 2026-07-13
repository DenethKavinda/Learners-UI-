import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
// Import the native path lookups helper
import { t } from "./translations/index";

// Import images from assets folder
import closeImg from "./assets/Close.png";
import slipImg from "./assets/slip.png";
import img2 from "./assets/2.png";
import crossImg from "./assets/Cross.png";

// Questions Array with correct answers mapping
const QUESTIONS_DATA = [
  {
    id: 1,
    image: closeImg,
    text: "මාර්ග සංඥාවෙන් දැක්වෙන්නේ",
    options: [
      "A) ඉදිරියෙන් මාර්ගය වසා ඇත.",
      "B) දුම්රිය හරස් මාර්ගය ඉදිරියෙනි.",
      "C) ආරක්ෂා කර නොමැති දුම්රිය හරස් මාර්ගය.",
      "D) ආරක්ෂා කර නොමැති දුම්රිය හරස් මාර්ගය ඉදිරියෙනි.",
    ],
    correctAnswer: 0, // A
  },
  {
    id: 2,
    image: slipImg,
    text: "මාර්ග සංඥාවෙන් දැක්වෙන්නේ",
    options: [
      "A) ලිස්සන සුළු මාර්ගය ඉදිරියෙනි",
      "B) වංගු සහිත මාර්ගය ඉදිරියෙනි",
      "C) අනතුරුදායක මංසන්ධිය ඉදිරියෙනි",
      "D) ඉදිරියෙන් මාර්ගය පටුය",
    ],
    correctAnswer: 0, // A
  },
  {
    id: 3,
    image: img2,
    text: "පහත මාර්ග සංඥාවෙන් දැක්වෙන්නේ",
    options: [
      "A) ඔත්තේ දිනවල වාහන නැවැත්වීම තහනම්.",
      "B) ඉරට්ටේ දිනවල වාහන නැවැත්වීම තහනම්.",
      "C) ඔත්තේ දිනවල වාහන ඇතුල්වීම තහනම්.",
      "D) ඉරට්ටේ දිනවල වාහන ඇතුල්වීම තහනම්.",
    ],
    correctAnswer: 1, // B
  },
  {
    id: 4,
    image: crossImg,
    text: "මාර්ග සංඥාවෙන් දැක්වෙන්නේ",
    options: [
      "A) පදිකයින් සදහා ඉඩ දෙන්න.",
      "B) පදිකයින් මාරුවන ස්ථානය.",
      "C) පදික මාරුව ඉදිරියෙන්.",
      "D) පදිකයින් සදහා වෙන් කළ මාර්ගයේ ආරම්භය.",
    ],
    correctAnswer: 1, // B
  },
  {
    id: 5,
    image: null,
    text: "වාහනයක අවධානම හැගවීමේ ලාම්පු (Hazard Lamp) පාවිච්චි කිරීම කළ යුත්තේ",
    options: [
      "A) වාහනයක් හදිසි තත්ත්වයක් නිසා ධාවනය කරන බව දැක්වීම සදහාය.",
      "B) හන්දියකදී වාහනයක් කෙලින්ම ධාවනය කිරීමට අදහස් කරන අවස්ථාවේදීය.",
      "C) ප්‍රමුඛතාවය ලබා ගැනීමටය.",
      "D) වාහනයක් අබල තත්ත්වයට පත්ව නවතා තිබියදී පමණි.",
    ],
    correctAnswer: 3, // D (වාහනයක් අබල තත්ත්වයට පත්ව නවතා තිබියදී පමණි)
  },
  {
    id: 6,
    image: null,
    text: "වෙනත් වාහනයක් විසින් ඔබගේ වාහනය පසුකර යන අවස්ථාවකදී",
    options: [
      "A) ඔබගේ වාහනය අඩු ගියරයකට යොදා නතර කිරීමට සූදානම් විය යුතුය",
      "B) ඔබගේ වාහනය වේගය වැඩි නොකර පසුකරන්නාට ඔබගේ වාහනය පසුකර යාමට ඉඩදිය යුතුය.",
      "C) ඔබ පසුකර යාමට ඉඩදීමට කැමැත්තක් නොදක්වන්නේනම් ඔබට වාහනයේ වේගය වැඩි කළ හැක.",
      "D) ඔබ පසුකර යාමට ඉඩදීමට කැමැත්තක් නොදක්වන්නේ නම් ඔබගේ වාහනයේ දකුණු පස සංඥා දැල්විය යුතුය",
    ],
    correctAnswer: 1, // B (වේගය වැඩි නොකර පසුකරන්නාට ඉඩදිය යුතුය)
  },
];

export default function PracticeExam() {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("app_lang") || "en";
  });

  const [isExamStarted, setIsExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [score, setScore] = useState(0);

  const translate = (path) => t(path, currentLang);

  useEffect(() => {
    const handleLangChange = () => {
      setCurrentLang(localStorage.getItem("app_lang") || "en");
    };
    window.addEventListener("storage", handleLangChange);

    if (!isExamStarted || isExamFinished)
      return () => window.removeEventListener("storage", handleLangChange);

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          calculateScore();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      window.removeEventListener("storage", handleLangChange);
    };
  }, [isExamStarted, isExamFinished, currentLang]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const calculateScore = () => {
    let currentScore = 0;
    QUESTIONS_DATA.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        currentScore += 1;
      }
    });
    setScore(currentScore);
    setIsExamFinished(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS_DATA.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleOptionChange = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const restartExam = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeft(25 * 60);
    setIsExamFinished(false);
    setIsExamStarted(false);
    setScore(0);
  };

  const currentQuestion = QUESTIONS_DATA[currentQuestionIndex];
  const totalQuestions = QUESTIONS_DATA.length;
  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="bg-dot-pattern text-slate-800 antialiased min-h-screen flex flex-col justify-between w-full m-0 p-0 overflow-x-hidden relative">
      <style>{`
                .bg-dot-pattern {
                    background-color: #fafbfc;
                    background-image: radial-gradient(#e2e8f0 1.5px, transparent 1.5px);
                    background-size: 24px 24px;
                }
                html[lang="si"] body {
                    line-height: 1.65 !important;
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                .animate-scale-up {
                    animation: scaleUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleUp {
                    from { transform: scale(0.9) translateY(10px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wide">
                  {translate("exam.page_badge")}
                </span>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  {translate("exam.page_title_part1")}{" "}
                  <span className="text-emerald-700">
                    {translate("exam.page_title_part2")}
                  </span>
                </h1>
              </div>
              <button
                onClick={() => setIsExamStarted(true)}
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/10 text-base transition-all duration-150 transform active:scale-[0.99]"
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
                      className="bg-emerald-700 h-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-extrabold text-slate-700">
                    {translate("exam.label_q")} {currentQuestionIndex + 1}{" "}
                    {translate("exam.label_of")} {totalQuestions}
                  </span>
                </div>

                <div
                  className={`flex items-center gap-2 font-black px-4 py-2 rounded-xl text-sm transition-all ${
                    timeLeft < 180 && !isExamFinished
                      ? "bg-rose-600 text-white animate-pulse"
                      : "bg-rose-50 border border-rose-100 text-rose-700"
                  }`}
                >
                  <span>⏳</span>
                  <span>{formatTime()}</span>
                </div>
              </div>

              <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200/80 shadow-md space-y-8">
                <div className="space-y-4">
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md uppercase">
                    {translate("exam.label_question")} 0
                    {currentQuestionIndex + 1}
                  </span>
                  <h2 className="text-xl font-black text-slate-900 leading-relaxed">
                    {currentQuestion.text}
                  </h2>

                  {currentQuestion.image && (
                    <div className="pt-2">
                      <img
                        src={currentQuestion.image}
                        alt={`Question ${currentQuestion.id} Sign`}
                        className="max-h-40 w-auto object-contain rounded-lg border border-slate-100 p-2 bg-slate-50/50"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer group transition-all ${
                        selectedAnswers[currentQuestionIndex] === idx
                          ? "border-emerald-600 bg-emerald-50/30"
                          : "border-slate-200/60 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`mcq_option_${currentQuestionIndex}`}
                        checked={selectedAnswers[currentQuestionIndex] === idx}
                        onChange={() => handleOptionChange(idx)}
                        className="w-4 h-4 accent-emerald-700"
                      />
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      currentQuestionIndex === 0
                        ? "border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95"
                    }`}
                  >
                    {translate("exam.btn_prev")}
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/5 transition-all active:scale-95"
                  >
                    {currentQuestionIndex === totalQuestions - 1
                      ? "Finish"
                      : translate("exam.btn_next")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Nicely Centered Score Pop-up Modal */}
      {isExamFinished && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 md:p-10 max-w-md w-full text-center shadow-2xl border border-slate-100 space-y-6 animate-scale-up">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-4xl text-emerald-600 shadow-inner">
              🎉
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-950 tracking-tight">
                සුභ පැතුම්! (Congratulations)
              </h3>
              <p className="text-sm font-medium text-slate-500">
                ඔබ ප්‍රශ්නාවලිය සාර්ථකව අවසන් කර ඇත.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 max-w-[240px] mx-auto shadow-sm">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Your Score
              </span>
              <div className="text-4xl font-black text-emerald-700">
                {score}{" "}
                <span className="text-xl font-bold text-slate-400">
                  / {totalQuestions}
                </span>
              </div>
            </div>

            <button
              onClick={restartExam}
              className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/10 text-sm transition-all transform active:scale-[0.98]"
            >
              නැවත උත්සාහ කරන්න
            </button>
          </div>
        </div>
      )}

      {/* Full-width Footer Wrapper */}
      <div className="w-full px-6 sm:px-12 lg:px-24 border-t border-slate-100 bg-white">
        <Footer />
      </div>
    </div>
  );
}
