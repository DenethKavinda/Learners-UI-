import localTranslations from "./frontend.json";

// Simulate standard local translations engine runtime memory
let cachedTranslations = localTranslations;

export const t = (path, lang = "en") => {
    if (!cachedTranslations) return path;

    const keys = path.split(".");
    let cur = cachedTranslations;

    for (const k of keys) {
        if (cur && typeof cur === "object" && k in cur) cur = cur[k];
        else return path;
    }

    if (cur && typeof cur === "object") {
        return cur[lang] ?? cur.en ?? path;
    }

    return cur ?? path;
};

export default { t };
