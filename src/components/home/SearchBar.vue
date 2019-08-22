<template>
  <div>
    <div
      class="search-bar"
      :class="{'hideTitle':!titleVisible,'hide-shadow':!shadowVisible}"
    >
      <transition name="title-move">
        <div
          class="search-bar-title-wrapper"
          v-show="titleVisible"
        >
          <div class="title-text-wrapper">
            <span class="icon-text title">
              {{$t('home.title')}}
            </span>
          </div>
          <div class="title-icon-shake-wrapper"
          @click="showFlapCard"
          >
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <div
        class="title-icon-back-wrapper"
        :class="{'hideTitle':!titleVisible}"
        @click="back"
      >
        <span class="icon-back icon"></span>
      </div>
      <div
        class="search-bar-input-wrapper"
        :class="{'hideTitle':!titleVisible}"
      >
        <div
          class="search-bar-blank"
          :class="{'hideTitle':!titleVisible}"
        >

        </div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input
            type="text"
            class="input"
            :placeholder="$t('home.hint')"
            v-model="searchText"
            @click="showHotSearch"
          >
        </div>
      </div>
    </div>
    <hot-search-list ref="hotSearch" v-show="hotSearchVisible"></hot-search-list>
  </div>
</template>
<script>
import { storeHomeMixin } from '../../utils/mixin';
import HotSearchList from './HotSearchList'
export default {
  mixins: [storeHomeMixin],
  components: {
    HotSearchList
  },
  data() {
    return {
      titleVisible: true,
      shadowVisible: false,
      hotSearchVisible: false,
      searchText: ''
    }
  },
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()

      }
    },
    hotSearchOffsetY(offsetY) {
      if (offsetY > 0) {
        this.showShadow()
      } else {
        this.hideShadow()
      }
    }
  },
  methods: {
    showFlapCard(){
      this.setFlapCardVisible(true)
    },
    back() {
      if (this.offsetY > 0) {
        this.showShadow()
      } else {
        this.hideShadow()
      }
      this.hideHotSearch()
    },
    showHotSearch() {
      this.hideTitle()
      this.hideShadow()
      this.hotSearchVisible = true
      this.$nextTick(()=>{
        this.$refs.hotSearch.reset()
      })
    },
    hideHotSearch() {
      this.hotSearchVisible = false
      if (this.offsetY > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
    },
    hideTitle() {
      this.titleVisible = false
    },
    showTitle() {
      this.titleVisible = true
    },
    hideShadow() {
      this.shadowVisible = false
    },
    showShadow() {
      this.shadowVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@styles/global.scss";
.search-bar {
  position: relative;
  z-index: 150;
  width: 100%;
  height: px2rem(94);
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, 0.1);
  &.hideTitle {
    height: px2rem(52);
  }
  &.hide-shadow {
    box-shadow: none;
  }
  .title-icon-back-wrapper {
    z-index: 200;
    position: absolute;
    left: px2rem(15);
    top: 0;
    height: px2rem(42);
    transition: height $homeAnimationTime $homeAnimationType;
    @include center;
    &.hideTitle {
      height: px2rem(52);
    }
  }
  .search-bar-title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(42);

    .title-text-wrapper {
      @include center;
      width: 100%;
      height: px2rem(42);
    }

    .title-icon-shake-wrapper {
      position: absolute;
      right: px2rem(15);
      top: 0;
      height: px2rem(42);
    }
  }
  .search-bar-input-wrapper {
    position: absolute;
    left: 0;
    top: px2rem(42);
    display: flex;
    width: 100%;
    height: px2rem(52);
    padding: px2rem(10);
    box-sizing: border-box;
    transition: top $homeAnimationTime $homeAnimationType;
    &.hideTitle {
      top: 0;
    }
    .search-bar-blank {
      flex: 0 0 0;
      width: 0;
      transition: all $homeAnimationTime $homeAnimationType;

      &.hideTitle {
        flex: 0 0 px2rem(31);
        width: px2rem(31);
      }
    }
    .search-bar-input {
      @include left;
      width: 100%;
      background: #f4f4f4;
      border-radius: px2rem(20);
      border-radius: px2rem(20px);
      padding: px2rem(5) px2rem(15);
      box-sizing: border-box;
      border: px2rem(1) solid #eee;
      .icon-search {
        color: #999;
      }
      .input {
        width: 100%;
        height: px2rem(22);
        border: none;
        background: transparent;
        margin-left: px2rem(10);
        font-size: px2rem(12);
        color: #666;
        &:focus {
          outline: none;
        }

        &::-webkit-input-placeholder {
          color: #ccc;
        }
      }
    }
  }
}
</style>