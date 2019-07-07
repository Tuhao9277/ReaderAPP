<template>
    <div class="ebook-reader">
        <div id="read"></div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Epub from 'epubjs'
global.ePub = Epub
export default {
    methods:{
      initEpub() {
          const url = 'http://10.9.65.198:8081/epub/'+this.fileName
          + '.epub';
          console.log(url)
          this.book = new Epub(url);
          this.rendition = this.book.renderTo('read',{
              width:innerWidth,
              height:innerHeight,
              method:'default'
          })
          this.rendition.display();
      }
    },
    computed: {
        ...mapGetters(['fileName'])
    },
     mounted() {
         
         this.$store.dispatch('setFileName',this.$route.params.filename.split('|').join('/')).then(() => {
             
             this.initEpub();
         })
    },
}
</script>
<style lang="scss" scoped>

</style>
