const path =  require('path');
const resolve = (dir) => path.join(__dirname, dir);
function mock(app,url,data){
    app.get(url,(request,response)=>{
        response.json(data)
    })
}
const homeData = require('./src/mock/bookHome')
const shelfData = require('./src/mock/bookShelf')
const listData = require('./src/mock/bookList')
const flatListData = require('./src/mock/bookFlatList')
// eslint-disable-next-line no-unused-vars
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
module.exports = {
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
          .set('vue$', 'vue/dist/vue.esm.js')
          .set('@', resolve('src'))
          .set('@styles', resolve('src/assets/styles'))
          .set('@assets', resolve('src/assets'))
          .set('@scss', resolve('src/assets/scss'))
          .set('@components', resolve('src/components'))
          .set('@plugins', resolve('src/plugins'))
          .set('@views', resolve('src/views'))
          .set('@router', resolve('src/router'))
          .set('@store', resolve('src/store'))
          .set('@layouts', resolve('src/layouts'))
          .set('@static', resolve('src/static'));
    },
    devServer:{
        before(app){
            mock(app,'/book/home',homeData)
            mock(app,'/book/shelf',shelfData)
            mock(app,'/book/list',listData)
            mock(app,'/book/flat-list',flatListData)
        }
    }
}