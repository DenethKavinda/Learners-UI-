import React, { useEffect, useState } from "react";
import Header from "./Components/Header"; // Corrected direct path lookup
import Footer from "./Components/Footer"; // Corrected direct path lookup
import { t } from "./translations/index"; // Corrected direct path lookup

export default function Contact() {
  // Determine initial language from local storage fallback to English
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("app_lang") || "en";
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle_type: "",
    message: "",
  });

  // Dynamic clean shortcut translation handler
  const translate = (path) => t(path, currentLang);

  useEffect(() => {
    // Listen to storage changes to keep state synced cleanly across views
    const handleLangChange = () => {
      setCurrentLang(localStorage.getItem("app_lang") || "en");
    };
    window.addEventListener("storage", handleLangChange);

    const reveals = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.15 },
    );
    reveals.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", handleLangChange);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `${translate("contact.alert_success_prefix")} ${formData.name}! ${translate("contact.alert_success_suffix")}`,
    );
  };

  return (
    <div className="bg-dot-pattern text-slate-800 antialiased min-h-screen flex flex-col justify-between w-full m-0 p-0 overflow-x-hidden">
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

      {/* Wide Header Wrapper */}
      <div className="w-full px-6 sm:px-12 lg:px-24 border-b border-slate-100 bg-white">
        <Header />
      </div>

      <main className="flex-grow w-full m-0 pt-12 pb-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 reveal-on-scroll">
            {/* BRAND COLOR UPDATE: changed text-indigo-600 to text-emerald-700 */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-emerald-700 border border-slate-200 shadow-sm tracking-wide uppercase">
              {translate("contact.page_badge")}
            </span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              {translate("contact.page_title_part1")}{" "}
              {/* BRAND COLOR UPDATE: changed text-indigo-600 to text-emerald-700 */}
              <span className="text-emerald-700">
                {translate("contact.page_title_part2")}
              </span>
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              {translate("contact.page_desc")}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start reveal-on-scroll">
            {/* Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100/60 hover:shadow-xl transition-all duration-500">
              <h2 className="text-xl font-black text-slate-900 mb-6">
                {translate("contact.form_heading")}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    {translate("contact.label_name")}
                  </label>
                  {/* BRAND COLOR UPDATE: changed focus:border-indigo-500 to focus:border-emerald-600 */}
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50/50 border border-slate-200 font-medium text-sm text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      {translate("contact.label_email")}
                    </label>
                    {/* BRAND COLOR UPDATE: changed focus:border-indigo-500 to focus:border-emerald-600 */}
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50/50 border border-slate-200 font-medium text-sm text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="phone"
                      className="text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      {translate("contact.label_phone")}
                    </label>
                    {/* BRAND COLOR UPDATE: changed focus:border-indigo-500 to focus:border-emerald-600 */}
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+94 7X XXX XXXX"
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50/50 border border-slate-200 font-medium text-sm text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="vehicle_type"
                    className="text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    {translate("contact.label_vehicle")}
                  </label>
                  <div className="relative">
                    {/* BRAND COLOR UPDATE: changed focus:border-indigo-500 to focus:border-emerald-600 */}
                    <select
                      id="vehicle_type"
                      name="vehicle_type"
                      value={formData.vehicle_type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50/50 border border-slate-200 font-medium text-sm text-slate-700 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        {translate("contact.opt_placeholder")}
                      </option>
                      <option value="car_auto">
                        {translate("contact.opt_car_auto")}
                      </option>
                      <option value="car_manual">
                        {translate("contact.opt_car_manual")}
                      </option>
                      <option value="dual_combo">
                        {translate("contact.opt_dual_combo")}
                      </option>
                      <option value="express_prep">
                        {translate("contact.opt_express")}
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    {translate("contact.label_message")}
                  </label>
                  {/* BRAND COLOR UPDATE: changed focus:border-indigo-500 to focus:border-emerald-600 */}
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="..."
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50/50 border border-slate-200 font-medium text-sm text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                {/* BRAND COLOR UPDATE: changed bg-indigo-600 hover:bg-indigo-700 to bg-emerald-700 hover:bg-emerald-800 */}
                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.99]"
                >
                  {translate("contact.btn_submit")}
                </button>
              </form>
            </div>

            {/* Support Info Block */}
            <div className="lg:col-span-5 space-y-6">
              <a
                href="https://wa.me/94772339227"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-200 group transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    💬
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      {translate("contact.support_title")}
                    </h4>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">
                      {translate("contact.support_subtitle")}
                    </p>
                  </div>
                </div>
              </a>

              {/* BRAND COLOR UPDATE: changed bg-indigo-50/50 border-indigo-100/80 text-indigo-900 text-indigo-950/70 to emerald color variants */}
              <div className="bg-emerald-50/40 rounded-2xl border border-emerald-100/80 p-6 space-y-2">
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span>📋</span> {translate("contact.requirements_title")}
                </h4>
                <p className="text-xs font-medium text-emerald-950/70 leading-relaxed">
                  {translate("contact.requirements_desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Wide Footer Wrapper */}
      <div className="w-full px-6 sm:px-12 lg:px-24 border-t border-slate-100 bg-white">
        <Footer />
      </div>
    </div>
  );
}
