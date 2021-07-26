<template>
  <div ref="rootRef" :class="$style['insection-observer']">
    <div v-for="n in 10" :ref="setItemRef" :class="$style.box"></div>
  </div>
</template>

<script lang="ts">
import { ComponentInternalInstance, defineComponent, onBeforeUnmount, onBeforeUpdate, onMounted, ref } from 'vue'
import useIntersectionObserver from '../../api/use-intersection-observer';

export default defineComponent({
  name: 'insection-observer',
  setup() {
    const rootRef = ref<HTMLDivElement>()
    let boxRefs = ref<HTMLDivElement[]>([])
    const setItemRef = (el: ComponentInternalInstance | Element | null) => {
      if (el) {
        boxRefs.value.push(el as HTMLDivElement)
      }
    }
    const iobserver = ref<IntersectionObserver>()
    const init = () => {
      const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          const {
            isIntersecting,
            target,
          } = entry
          if (isIntersecting) {
            console.log(target, '显示')
          } else {
            console.log(target, '隐藏')
          }
        })
      }
      const { IntersectionObserver } = useIntersectionObserver()
      iobserver.value = new IntersectionObserver(intersectionCallback, {
        root: rootRef.value
      })
      boxRefs.value.forEach(item => {
        iobserver.value?.observe(item)
      })
    }
    onBeforeUpdate(() => {
      boxRefs.value = []
    })
    onMounted(() => {
      init()
    })
    onBeforeUnmount(() => {
      boxRefs.value.forEach(item => {
        iobserver.value?.unobserve(item)
      })
    })
    return {
      rootRef,
      boxRefs,
      setItemRef,
    }
  },
})
</script>

<style module>
:root {
  --box-bg-color1: brown;
  --box-bg-color2: red;
  --box-bg-color3: yellow;
  --box-bg-color4: #ffccbc;
  --box-bg-color5: #ffac9c;
  --box-bg-color6: #FF8C7C;
  --box-bg-color7: #ff7c6c;
  --box-bg-color8: #ff6c5c;
  --box-bg-color9: #f75c4c;
  --box-bg-color10: #e74c3c;
}
.insection-observer {
  width: 600px;
  height: 800px;
  background-color: #e7e7e7;
  overflow-y: scroll;
  padding-top: 50px;
  padding-bottom: 50px;
}
.insection-observer::-webkit-scrollbar {
  display: none;
}
.box {
  width: 300px;
  height: 300px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.box:nth-of-type(n) {
  background-color: var(--box-bg-color1);
}
.box:nth-of-type(2n) {
  background-color: var(--box-bg-color2);
}
.box:nth-of-type(3n) {
  background-color: var(--box-bg-color3);
}
.box:nth-of-type(4n) {
  background-color: var(--box-bg-color4);
}
.box:nth-of-type(5n) {
  background-color: var(--box-bg-color5);
}
.box:nth-of-type(6n) {
  background-color: var(--box-bg-color6);
}
.box:nth-of-type(7n) {
  background-color: var(--box-bg-color7);
}
.box:nth-of-type(8n) {
  background-color: var(--box-bg-color8);
}
.box:nth-of-type(9n) {
  background-color: var(--box-bg-color9);
}
.box:nth-of-type(10) {
  background-color: var(--box-bg-color10);
}
</style>