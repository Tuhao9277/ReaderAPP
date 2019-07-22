export const FONT_SIZE_LIST = [
    { fontSize: 12 },
    { fontSize: 14 },
    { fontSize: 16 },
    { fontSize: 18 },
    { fontSize: 20 },
    { fontSize: 22 },
    { fontSize: 24 }
]
export const FONT_FAMILY_LIST =[
    {font:'Default'},
    {font:'Cabin'},
    {font:'Days One'},
    {font:'Montserrat'},
    {font:'Tangerine'},
]
// 
export function themeList(vue){
    return [
        {
            alias:vue.$t('book.themeDefault'),
            name:'Default',
            style:{
                body:{
                    'color':'#4c5059',
                    'background':'#cecece'
                }
            }
        },
        {
            alias:vue.$t('book.themeEye'),
            name: "Eye",
            style: {
              body: {
                color: "#000",
                background: "#ceeaba"
              }
            }
          },
          {
            alias:vue.$t('book.themeNight'),
            name: "Night",
            style: {
              body: {
                color: "#fff",
                background: "#333A43"
              }
            }
          },
          {
            alias:vue.$t('book.themeGold'),
            name: "Gold",
            style: {
              body: {
                color: "#000",
                background: "rgb(241,236,226)"
              }
            }
          }
    ]
}
export function addCss (href){
    const link = document.createElement('link')
    link.setAttribute('rel','stylesheet')
    link.setAttribute('type','text/css')
    link.setAttribute('href',href)
    document.getElementsByTagName('head')[0].appendChild(link)
}
export function removeCss(href){
    const links = document.getElementsByTagName('link')
    for (let i = links.length; i>=0;i--) {
        const link = links[i]
        if(link && link.getAttribute('href') && link.getAttribute('href') === href){
            link.parentNode.removeChild(link)
        }
    }
}
export function removeAllCss(href){
    removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
    removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
    removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
    removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
    removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)

}