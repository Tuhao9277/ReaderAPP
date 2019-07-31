<template>
    <div class="ebook-reader">
        <div id="read">
          <ebook-title></ebook-title>
          <ebook-reader></ebook-reader>
          <ebook-menu></ebook-menu>
        </div>
    </div>
</template>
<script>
import EbookReader from '@/components/ebook/Ebook'
import EbookTitle from '@/components/ebook/EbookTitle'
import EbookMenu from '@/components/ebook/EbookMenu'
import { getReadTime, saveReadTime } from '../../utils/localStorage';
import { ebookMixin } from '../../utils/mixin';
export default {
    mixins:[ebookMixin],
    components:{
      EbookReader,
      EbookTitle,
      EbookMenu
    },
    methods:{
      // 开启定时任务
      startLoopReadTime(){
        let readTime = getReadTime(this.fileName)
        if(!readTime){
          readTime = 0
        }
        this.task = setInterval(() => {
          readTime++ 

          if(readTime % 30 === 0 ){
            saveReadTime(this.fileName,readTime)
          }
        }, 1000);
      }
    },
    mounted(){
      this.startLoopReadTime()
    },
    beforeDestroy(){
      if(this.task){
        clearInterval(this.task)
      }
    }
}
</script>
<style lang="scss" scoped>

</style>
