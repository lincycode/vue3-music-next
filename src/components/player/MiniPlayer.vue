<template>
  <transition name="mini">
    <div class="mini-player" v-show="!fullScreen" @click="showNormalPlayer">
      <div class="cd-wrapper">
        <div ref="cdRef" class="cd">
          <img ref="cdImageRef" width="40" height="40" :src="currentSong.pic" />
        </div>
      </div>
      <div class="slider-wrapper">
        <div class="slider-group">
          <div class="slider-page">
            <h2 class="name">
              {{ currentSong.name }}
            </h2>
            <p class="desc">
              {{ currentSong.singer }}
            </p>
          </div>
        </div>
      </div>
      <div class="control">
        <!-- <template #default="{ percentage }"> -->
        <!-- <span>{{ percentage }} %</span> -->
        <!-- </template>r -->
        <progress-circle :radius="32" :progress="progress" :max="1">
          <!-- <template #default> -->
          <i class="icon-mini" :class="miniPlayIcon" @click.stop="togglePlay"></i>
          <!-- </template> -->
        </progress-circle>
      </div>
    </div>
  </transition>
</template>

<script setup>
import ProgressCircle from './ProgressCycle.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import * as mutation from '@/assets/js/mutation-types';

const store = useStore();
const props = defineProps({
  progress: {
    type: Number,
    default: 0,
  },
});
const playing = computed(() => store.state.playing);
// 当前歌曲
const currentSong = computed(() => store.getters.currentSong);
const fullScreen = computed(() => store.state.fullScreen);
const miniPlayIcon = computed(() => {
  return playing.value ? 'icon-pause-mini' : 'icon-play-mini';
});
function togglePlay() {
  store.commit(mutation.SET_PLAYING_STATE, !playing.value);
}
function showNormalPlayer() {
  store.commit('setFullScreen', true);
}

const cdRef = ref(null);
defineExpose({
  cdRef,
});
</script>

<style lang="scss" scoped>
.mini-player {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: $color-highlight-background;
  .cd-wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .cd {
      height: 100%;
      width: 100%;
      img {
        border-radius: 50%;
        &.playing {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .slider-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-page {
        display: inline-block;
        width: 100%;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        .name {
          margin-bottom: 2px;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text;
        }
        .desc {
          @include no-wrap();
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }
    }
  }
  .control {
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;
    .icon-playlist {
      position: relative;
      top: -2px;
      font-size: 28px;
      color: $color-theme-d;
    }
    .icon-mini {
      position: absolute;
      left: 0;
      top: 0;
      color: $color-theme-d;
      font-size: 32px;
    }
  }
  &.mini-enter-active,
  &.mini-leave-active {
    transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
  }
  &.mini-enter-from,
  &.mini-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
}
</style>
