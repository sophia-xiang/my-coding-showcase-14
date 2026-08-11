import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { content, Lang, SiteContent } from "./content";

const STORAGE_KEY = "site-lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: SiteContent;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const readInitialLang = (): Lang => {
  if (typeof window === "undefined") return "zh";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "zh" || saved === "en") return saved;
  return navigator.language?.toLowerCase().startsWith("zh") ? "zh" : "en";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: content[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
