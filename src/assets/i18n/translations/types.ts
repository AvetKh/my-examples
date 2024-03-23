import { Translation } from "./en";


export type Currency = 'AMD' | 'USD' | 'EUR' | 'RUB';
export type Language = 'hy' | 'ru' | 'en';
export const LanguageName: Record<Language, string> = {
    hy: 'Հայերեն',
    en: 'English',
    ru: 'Русский',
}
export const CurrencySymbol: Record<Currency, string> = {
    AMD: '֏',
    USD: '$',
    RUB: '₽',
    EUR: '€',
}
export const SupportedLanguages: Language[] = Object.keys(LanguageName) as Language[]
export const SupportedCurrencies: Currency[] = Object.keys(CurrencySymbol) as Currency[]


export type I18nSection = keyof Translation;
export type I18nItemName<S extends I18nSection> = keyof Translation[S];
export type I18nItem<S extends I18nSection, K extends I18nItemName<S>> = Translation[S][K];

export type TranslateArg<S extends I18nSection, K extends I18nItemName<S>>
    = I18nItem<S, K> extends ((...arg: any) => string) ? Parameters<I18nItem<S, K>> : [];

export type TranslateFunc<S extends I18nSection>
    = <K extends I18nItemName<S>>(key: K, ...args: TranslateArg<S, K>) => string
