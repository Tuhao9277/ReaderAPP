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

export default {
    components:{
      EbookReader,
      EbookTitle,
      EbookMenu
    }
}
</script>
<style lang="scss" scoped>

</style>
