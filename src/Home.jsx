import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { t } from "./translations/index";

export default function Home() {
  // Determine initial language from local storage fallback to English
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("app_lang") || "en";
  });

  // Metric States for the Count-Up Animation Engine
  const [passRate, setPassRate] = useState(0);
  const [students, setStudents] = useState(0);
  const [instructors, setInstructors] = useState(0);

  // Dynamic clean shortcut translation handler
  const translate = (path) => t(path, currentLang);

  useEffect(() => {
    // Handle changes to localStorage manually if changed on the same page
    const handleLangChange = () => {
      setCurrentLang(localStorage.getItem("app_lang") || "en");
    };
    window.addEventListener("storage", handleLangChange);

    // --- 1. Intersection Observer for Scroll-Driven Animations ---
    const reveals = document.querySelectorAll(".reveal-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 },
    );

    reveals.forEach((el) => observer.observe(el));

    // --- 2. Synchronized 5-Second Count-Up Animation Engine ---
    const animationDuration = 5000;
    const targets = { passRate: 98, students: 10000, instructors: 15 };
    let frameId;
    const startTime = performance.now();

    const updateCounters = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);

      setPassRate(Math.floor(progress * targets.passRate));
      setStudents(Math.floor(progress * targets.students));
      setInstructors(Math.floor(progress * targets.instructors));

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCounters);
      } else {
        setPassRate(targets.passRate);
        setStudents(targets.students);
        setInstructors(targets.instructors);
      }
    };

    frameId = requestAnimationFrame(updateCounters);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
      window.removeEventListener("storage", handleLangChange);
    };
  }, []);

  return (
    <div className="bg-dot-pattern text-slate-800 antialiased min-h-screen flex flex-col justify-between w-full">
      <style>{`
        .bg-dot-pattern {
            background-color: #fafbfc;
            background-image: radial-gradient(#e2e8f0 1.5px, transparent 1.5px);
            background-size: 24px 24px;
        }
        .reveal-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-on-scroll.active {
            opacity: 1;
            transform: translateY(0);
        }
        html[lang="si"] body {
            line-height: 1.65 !important;
        }
      `}</style>

      {/* Header Container Stretched Full Screen */}
      <div className="w-full px-4 sm:px-8 lg:px-16 border-b border-slate-100 bg-white">
        <Header />
      </div>

      <main className="flex-grow overflow-hidden w-full">
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32 reveal-on-scroll w-full">
          <div className="max-w-[95%] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Hero Left Content */}
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-emerald-700 border border-slate-200 shadow-sm tracking-wide uppercase transform hover:scale-105 transition-transform duration-300">
                  {translate("home.hero_badge")}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
                  {translate("home.hero_title_part1")} <br />
                  <span className="text-emerald-700">
                    {translate("home.hero_title_part2")}
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                  {translate("home.hero_desc")}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                  <a
                    href="#packages-section"
                    className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-lg shadow-emerald-700/10 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-center"
                  >
                    {translate("home.btn_book")}
                  </a>
                  <a
                    href="/PracticeExam"
                    className="px-8 py-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-2xl shadow-sm border border-emerald-100 transition-all duration-150 transform active:scale-95 text-center"
                  >
                    {translate("home.btn_exam")}
                  </a>
                  <a
                    href="/Feedback"
                    className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-600 font-bold rounded-2xl shadow-sm border border-slate-200 transition-all duration-150 transform active:scale-95 text-center"
                  >
                    {translate("home.btn_feedback")}
                  </a>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/80 max-w-xl mx-auto lg:mx-0">
                  <div>
                    <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      {passRate}%
                    </p>
                    <p className="text-xs text-slate-500 font-bold tracking-wider uppercase mt-1">
                      {translate("home.metric_pass")}
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      {students.toLocaleString()}+
                    </p>
                    <p className="text-xs text-slate-500 font-bold tracking-wider uppercase mt-1">
                      {translate("home.metric_students")}
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      {instructors}+
                    </p>
                    <p className="text-xs text-slate-500 font-bold tracking-wider uppercase mt-1">
                      {translate("home.metric_coaches")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hero Right Content (Wide Video Frame) */}
              <div className="lg:col-span-6 relative group w-full">
                <div className="absolute inset-0 bg-emerald-700/5 rounded-3xl blur-xl group-hover:bg-emerald-700/10 transition-all duration-500"></div>
                <div className="bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 relative transform group-hover:scale-[1.01] transition-all duration-500 ease-out w-full">
                  <div className="absolute -top-3 -right-3 bg-emerald-700 text-white font-bold text-xs py-1.5 px-3 rounded-xl shadow-md transform rotate-6 z-20 animate-pulse">
                    {translate("home.video_badge")}
                  </div>

                  <div className="bg-slate-50 aspect-video rounded-2xl overflow-hidden flex items-center justify-center relative border border-slate-100 shadow-inner z-10 w-full">
                    <iframe
                      className="absolute inset-0 w-full h-full object-cover"
                      src="https://www.youtube.com/embed/oskiEydAaok?si=YWiL2vHnMHNelp0e"
                      title="Learnerce Driving School Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>

                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-200/80 shadow-lg flex items-center justify-between z-10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <p className="text-xs font-bold text-slate-700">
                          {translate("home.video_status")}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                        {translate("home.video_action")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Features Section */}
        <section className="py-20 bg-white/60 border-t border-slate-200/60 backdrop-blur-sm reveal-on-scroll w-full">
          <div className="max-w-[95%] mx-auto px-4 sm:px-8 lg:px-16">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {translate("home.feat_heading")}
              </h2>
              <p className="text-slate-500 font-medium">
                {translate("home.feat_subheading")}
              </p>
            </div>

            {/* Feature Cards Layout */}
            <div className="grid md:grid-cols-3 gap-8 w-full">
              {/* Card 1 */}
              <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 transform hover:-translate-y-1 group h-auto min-h-[220px]">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center font-bold mb-6 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300">
                  🛡️
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {translate("home.card1_title")}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {translate("home.card1_desc")}
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 transform hover:-translate-y-1 group h-auto min-h-[220px]">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center font-bold mb-6 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300">
                  ⏰
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {translate("home.card2_title")}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {translate("home.card2_desc")}
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 transform hover:-translate-y-1 group h-auto min-h-[220px]">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center font-bold mb-6 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300">
                  🎓
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {translate("home.card3_title")}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {translate("home.card3_desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Packages Bottom Section */}
        <section
          id="packages-section"
          className="py-20 bg-transparent reveal-on-scroll w-full scroll-mt-28"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold bg-white text-emerald-700 border border-slate-200 shadow-sm tracking-wide uppercase">
                {translate("packages.page_badge")}
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {translate("packages.page_title_part1")}{" "}
                <span className="text-emerald-700">
                  {translate("packages.page_title_part2")}
                </span>
              </h2>
              <p className="text-sm font-medium text-slate-500 leading-normal max-w-xl mx-auto">
                {translate("packages.page_desc")}
              </p>
            </div>

            {/* Packages List Wrapper */}
            <div className="space-y-6">
              {/* PACKAGE 1: PREMIUM DUAL-VEHICLE COMBO */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col md:flex-row transform hover:shadow-xl hover:border-emerald-100 transition-all duration-300 group w-full">
                <div className="md:w-[32%] bg-slate-50/40 p-5 border-b md:border-b-0 md:border-r border-slate-200/60 flex flex-col justify-between relative">
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white font-extrabold text-[9px] uppercase tracking-wider py-0.5 px-2 rounded-md shadow-sm z-20">
                    {translate("packages.badge_popular")}
                  </div>
                  <div className="space-y-3">
                    <div className="w-full aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200/40 shadow-inner z-10">
                      <img
                        src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=600"
                        alt="Premium Combo"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {translate("packages.p1_title")}
                      </h3>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {translate("packages.p1_subtitle")}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 space-y-2.5">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-slate-400 text-xs font-bold notranslate">
                        LKR
                      </span>
                      <span className="text-2xl font-black text-slate-900 tracking-tight notranslate">
                        45,500
                      </span>
                      <span className="text-slate-400 text-[10px] font-semibold ml-1">
                        {translate("packages.price_suffix")}
                      </span>
                    </div>
                    <a
                      href="#"
                      className="block w-full text-center py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold rounded-lg transition-all shadow-sm active:scale-98"
                    >
                      {translate("packages.btn_register")}
                    </a>
                  </div>
                </div>

                <div className="md:w-[68%] p-6 flex flex-col justify-between space-y-4 bg-white">
                  <div className="space-y-1.5">
                    <h4 className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                      {translate("packages.section_arch")}
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                      {translate("packages.p1_desc")}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex gap-2.5 items-center">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 flex-shrink-0 flex items-center justify-center text-emerald-700 font-bold text-xs">
                        🚗
                      </div>
                      <div>
                        <h5 className="text-[11px] font-bold text-slate-900 leading-tight">
                          {translate("packages.metrics_label")}
                        </h5>
                        <p className="text-[11px] font-medium text-slate-500">
                          {translate("packages.p1_metrics_val")}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 flex-shrink-0 flex items-center justify-center text-emerald-700 font-bold text-xs">
                        🇲🇰
                      </div>
                      <div>
                        <h5 className="text-[11px] font-bold text-slate-900 leading-tight">
                          {translate("packages.class_label")}
                        </h5>
                        <p className="text-[11px] font-medium text-slate-500">
                          {translate("packages.p1_class_val")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {translate("packages.p1_perk")}
                  </div>
                </div>
              </div>

              {/* PACKAGE 2: STANDARD LIGHT VEHICLE */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col md:flex-row transform hover:shadow-xl hover:border-emerald-100 transition-all duration-300 group w-full">
                <div className="md:w-[32%] bg-slate-50/40 p-5 border-b md:border-b-0 md:border-r border-slate-200/60 flex flex-col justify-between relative">
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white font-extrabold text-[9px] uppercase tracking-wider py-0.5 px-2 rounded-md shadow-sm z-20">
                    {translate("packages.badge_value")}
                  </div>
                  <div className="space-y-3">
                    <div className="w-full aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200/40 shadow-inner z-10">
                      <img
                        src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600"
                        alt="Standard Car"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {translate("packages.p2_title")}
                      </h3>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {translate("packages.p2_subtitle")}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 space-y-2.5">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-slate-400 text-xs font-bold notranslate">
                        LKR
                      </span>
                      <span className="text-2xl font-black text-slate-900 tracking-tight notranslate">
                        32,000
                      </span>
                      <span className="text-slate-400 text-[10px] font-semibold ml-1">
                        {translate("packages.price_suffix")}
                      </span>
                    </div>
                    <a
                      href="#"
                      className="block w-full text-center py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold rounded-lg transition-all shadow-sm active:scale-98"
                    >
                      {translate("packages.btn_register")}
                    </a>
                  </div>
                </div>

                <div className="md:w-[68%] p-6 flex flex-col justify-between space-y-4 bg-white">
                  <div className="space-y-1.5">
                    <h4 className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                      {translate("packages.section_arch")}
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                      {translate("packages.p2_desc")}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex gap-2.5 items-center">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 flex-shrink-0 flex items-center justify-center text-emerald-700 font-bold text-xs">
                        🚗
                      </div>
                      <div>
                        <h5 className="text-[11px] font-bold text-slate-900 leading-tight">
                          {translate("packages.metrics_label")}
                        </h5>
                        <p className="text-[11px] font-medium text-slate-500">
                          {translate("packages.p2_metrics_val")}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 flex-shrink-0 flex items-center justify-center text-emerald-700 font-bold text-xs">
                        ⚙️
                      </div>
                      <div>
                        <h5 className="text-[11px] font-bold text-slate-900 leading-tight">
                          {translate("packages.method_label")}
                        </h5>
                        <p className="text-[11px] font-medium text-slate-500">
                          {translate("packages.p2_method_val")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {translate("packages.p2_perk")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Wrapper Stretched Full Screen */}
      <div className="w-full px-4 sm:px-8 lg:px-16 border-t border-slate-100 bg-white">
        <Footer />
      </div>
    </div>
  );
}
