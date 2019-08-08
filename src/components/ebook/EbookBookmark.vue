<template>
    <div class="ebook-bookmark" >
        <div class="ebook-bookmark-text-wrapper">
            <div class="ebook-bookmark-down-wrapper">
                <span class="icon-down"></span>
        </div>
        <div class="ebook-bookmark-text">
            {{text}}
        </div>
        <div class="ebook-bookmark-icon-wrapper">
            <book-mark></book-mark>
        </div>
        </div>
    </div>
</template>
<script>
    import Bookmark from './BookMark'
export default {
    data() {
        return {
            text:this.$t('book.pulldownAddMark')
        }
    },
    components:{
        Bookmark
    }
}
</script>
<style lang="scss" scoped>
@import "@styles/global.scss";
.ebook-bookmark{
    position: absolute;
    top: px2rem(-35);
    left: 0;
    z-index: 200;
    width: 100%;
    height: px2rem(25);

    .ebook-bookmark-text-wrapper{
        position: absolute;
        right: px2rem(45);
        bottom: 0;
        display: flex;
        .ebook-bookmark-down-wrapper{
            font-size: px2rem(14);
            color: white;
            transition:  all ,2s linear;
            @include center;
        }
               .ebook-bookmark-text{
                   font-size: px2rem(14);
                   color:#fff;
            }
        .ebook-bookmark-icon-wrapper{
            position: absolute;
            right: 0;
            bottom: 0;
            margin-right: px2rem(15);
          
            
        }
        
    };
}
</style>
