import { useMemo } from "react";

import { en } from "./translations/en";
import { ru } from "./translations/ru";
import { hy } from "./translations/hy";
import { I18nItemName, I18nSection, Language, TranslateArg, TranslateFunc } from "./translations/types";
import { useSelector } from "react-redux";
import { RootState } from "@app/store";

export * from './translations/types'

const TranslationMap = {en, ru, hy}


function translate<S extends I18nSection, K extends I18nItemName<S>>
(language: Language, section: S, key: K, ...args: TranslateArg<S, K>) {
    const stringOrFunction = TranslationMap[language][section][key]
    if (typeof stringOrFunction === 'function') {
        return stringOrFunction.apply(null, args)
    }
    return stringOrFunction;
}


export function getTranslator<S extends I18nSection, K extends I18nItemName<S>>(lang: Language, section: S) {
    return function <K extends I18nItemName<S>>(key: K, ...args: TranslateArg<S, K>) {
        return translate(lang, section, key, ...args);
    }
}

export function useI18N<S1 extends I18nSection>(section: S1): [TranslateFunc<S1>];
export function useI18N<S1 extends I18nSection, S2 extends I18nSection>(section: S1, section2: S2): [TranslateFunc<S1>, TranslateFunc<S2>];
export function useI18N<S1 extends I18nSection, S2 extends I18nSection, S3 extends I18nSection>(section: S1, section2: S2, section3: S3): [TranslateFunc<S1>, TranslateFunc<S2>, TranslateFunc<S3>];
export function useI18N(...sections: I18nSection[]) {
    const lang = useSelector((state: RootState) => state.user.language)
    return useMemo(() => sections.map((s) => getTranslator(lang, s)), [lang, sections])
}
