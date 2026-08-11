import { useLang } from "@/i18n/LanguageContext";
import { Lang } from "@/i18n/content";

const options: { value: Lang; label: string }[] = [
  { value: "zh", label: "中文" },
  { value: "en", label: "EN" },
];

const LanguageToggle = () => {
  const { lang, setLang } = useLang();

  return (
    <div
      className="inline-flex items-center rounded-lg bg-white/10 p-0.5"
      role="group"
      aria-label="Language"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setLang(o.value)}
          aria-pressed={lang === o.value}
          className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
            lang === o.value
              ? "bg-white text-[hsl(221,60%,18%)] font-semibold"
              : "text-slate-300 hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
