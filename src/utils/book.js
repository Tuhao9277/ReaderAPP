import { getReadTime } from "./localStorage";
import { realPx } from "./utils";

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
                    'background':'#cecece',
                    'padding-top':`${realPx(48)}px!important`,
                    'padding-bottom':`${realPx(48)}px!important`
                }
            }
        },
        {
            alias:vue.$t('book.themeEye'),
            name: "Eye",
            style: {
              body: {
                color: "#000",
                background: "#ceeaba",
                'padding-top':`${realPx(48)}px!important`,
                'padding-bottom':`${realPx(48)}px!important`
                
              }
            }
          },
          {
            alias:vue.$t('book.themeNight'),
            name: "Night",
            style: {
              body: {
                color: "#fff",
                background: "#333A43",
                'padding-top':`${realPx(48)}px!important`,
                'padding-bottom':`${realPx(48)}px!important`
              }
            }
          },
          {
            alias:vue.$t('book.themeGold'),
            name: "Gold",
            style: {
              body: {
                color: "#000",
                background: "rgb(241,236,226)",
                'padding-top':`${realPx(48)}px!important`,
                'padding-bottom':`${realPx(48)}px!important`
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

const BOOK_SHELF_KEY = 'bookShelf'

export function addToShelf(book) {
  let bookList = getLocalStorage(BOOK_SHELF_KEY)
  bookList = clearAddFromBookList(bookList)
  book.type = 1
  bookList.push(book)
  bookList.forEach((item, index) => {
    item.id = index + 1
  })
  appendAddToBookList(bookList)
  setLocalStorage(BOOK_SHELF_KEY, bookList)
}

export function appendAddToBookList(bookList) {
  bookList.push({
    cover: '',
    title: '',
    type: 3,
    id: Number.MAX_SAFE_INTEGER
  })
}

export function clearAddFromBookList(bookList) {
  return bookList.filter(item => {
    return item.type !== 3
  })
}

export function removeFromBookShelf(bookItem) {
  let bookList = getLocalStorage(BOOK_SHELF_KEY)
  bookList = bookList.filter(item => {
    if (item.itemList) {
      item.itemList = item.itemList.filter(subItem => subItem.fileName !== bookItem.fileName)
    }
    return item.fileName !== bookItem.fileName
  })
  setLocalStorage(BOOK_SHELF_KEY, bookList)
}

export function flatBookList(bookList) {
  if (bookList) {
    let orgBookList = bookList.filter(item => {
      return item.type !== 3
    })
    const categoryList = bookList.filter(item => {
      return item.type === 2
    })
    categoryList.forEach(item => {
      const index = orgBookList.findIndex(v => {
        return v.id === item.id
      })
      if (item.itemList) {
        item.itemList.forEach(subItem => {
          orgBookList.splice(index, 0, subItem)
        })
      }
    })
    orgBookList.forEach((item, index) => {
      item.id = index + 1
    })
    orgBookList = orgBookList.filter(item => item.type !== 2)
    return orgBookList
  } else {
    return []
  }
}

export function findBook(fileName) {
  const bookList = getLocalStorage(BOOK_SHELF_KEY)
  return flatBookList(bookList).find(item => item.fileName === fileName)
}

export function removeBookCache(fileName) {
  return new Promise((resolve, reject) => {
    removeLocalStorage(fileName)
    removeLocalStorage(`${fileName}-info`)
    removeLocalForage(fileName, () => {
      console.log(`[${fileName}]删除成功...`)
      resolve()
    }, reject)
  })
}

export function switchLocale(vue) {
  if (vue.$i18n.locale === 'en') {
    vue.$i18n.locale = 'cn'
  } else {
    vue.$i18n.locale = 'en'
  }
  setLocalStorage('locale', vue.$i18n.locale)
}

export function reset(vue) {
  vue.$store.dispatch('setMenuVisible', false)
  vue.$store.dispatch('setSettingVisible', 0)
  vue.$store.dispatch('setFontFamilyVisible', false)
  vue.$store.dispatch('setSpeakingIconBottom', realPx(58))
}

export function getReadTimeByMinute(fileName){
  const readTime = getReadTime(fileName)
  if(!readTime){
    return 0
  }
  else{
    return Math.ceil(readTime / 60)
  }
}
export function flatten(array){
  return [].concat( ...array.map(item=> [].concat(item,...flatten(item.subitems)) ))
}