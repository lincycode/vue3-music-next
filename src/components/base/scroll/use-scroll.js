import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue';

BScroll.use(ObserveDOM);

export default function useScroll(wrapper, options = {}, emits) {
  let scroll = ref(null);
  onMounted(() => {
    // debugger;
    // 此处 debugger发现初始时内容没加载出来,内容没有高度
    // 因此一开始不会滚动,所以需要使用observerDOM插件
    scroll.value = new BScroll(wrapper.value, { observeDOM: true, ...options });
    if ([1, 2, 3].includes(options.probeType)) {
      scroll.value.on('scroll', event => {
        emits('scroll', event);
      });
    }
  });
  onUnmounted(() => {
    scroll.value.destroy();
  });
  return scroll;
}
