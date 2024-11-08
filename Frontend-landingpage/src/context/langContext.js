import { createContext, useState } from "react";
import { IntlProvider } from "react-intl";
import SpanishMessages from "../language/es-MX.json";
import EnglishMessages from "../language/en-US.json";

const langContext = createContext();
const LangProvider = ({ children }) => {
  let defaultLocale = "en-US";
  let defaultLanguage = EnglishMessages;

  //Local Storage lang
  const lang = localStorage.getItem("lang");
  if (lang) {
    defaultLocale = lang;
    if (lang === "es-MX") {
      defaultLanguage = SpanishMessages;
    } else if (lang === "en-US") {
      defaultLanguage = EnglishMessages;
    } else {
      defaultLocale = "en-US";
      defaultLanguage = EnglishMessages;
    }
  }

  const [language, setLanguage] = useState(defaultLanguage);
  const [locale, setLocale] = useState(defaultLocale);

  //Switch case lang
  const Pagelanguage = (languagePage) => {
    switch (languagePage) {
      case "es-MX":
        setLanguage(SpanishMessages);
        setLocale("es-MX");
        localStorage.setItem("lang", "es-MX");
        break;
      case "en-US":
        setLanguage(EnglishMessages);
        setLocale("en-US");
        localStorage.setItem("lang", "en-US");
        break;
      default:
        setLanguage(EnglishMessages);
        setLocale("en-US");
    }
  };

  return (
    <langContext.Provider value={{ Pagelanguage, locale }}>
      <IntlProvider locale={locale} messages={language}>
        {children}
      </IntlProvider>
    </langContext.Provider>
  );
};

export { LangProvider, langContext };
