import Vue from 'vue'
import VueI18n from "vue-i18n";
import {getLocale, saveLocale} from './../utils/localStorage'
import cn from './cn'
import en from './en'
Vue.use(VueI18n)
const messages = {
    en,
    cn
}
let locale = getLocale()
if(!locale){    
    locale = 'cn'
    saveLocale(locale)
}
const i18n = new VueI18n({
    locale,
    messages
})
export default i18n