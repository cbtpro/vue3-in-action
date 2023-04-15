<template>
  <div :class="$style.authority">
    <div v-authority.display="'ADMIN'" :class="$style['button1']" @click="test">管理员</div>
    <div v-authority.hidden="'ADMIN'" :class="$style['button1']">管理员</div>
    <button v-authority.disabled="'ADMIN'" :class="$style['button']">管理员</button>
    <div v-authority.display="'SUPERUSER'" :class="$style['button1']" @click="test">超级管理员</div>
    <div v-authority.hidden="'SUPERUSER'" :class="$style['button1']">超级管理员</div>
    <button v-authority.disabled="'SUPERUSER'" :class="$style['button']">超级管理员</button>
    <input type="radio" name="radioGroup1" :class="$style.radio" />
    <input type="radio" name="radioGroup1" :class="$style.radio" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue'
import { useAuthorityStore, } from '../../store'
import useHttp from '../../api/use-http'

export default defineComponent({
  name: 'authority',
  setup() {
    const store = useAuthorityStore()
    const { http } = useHttp()

    const init = async () => {
      try {
        const { data, } = await http<IUserRole[]>({
          url: '/index/authority',
          method: 'get',
        })
        store.updateAuthority(data);
      } catch (error) {
        console.log(error)
      }
    }
    onBeforeMount(() => {
      init()
    })
    return {
      store,
      // auths,
      test() {
        console.log(Date.now())
      },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      window.setTimeout(() => {
        this.store.updateAuthority([])
      }, 5000)
    },
  },
})
</script>

<style lang="postcss" module>
.authority {
  width: 375px;
  height: 812px;
  background-color: #e7e7e7;
}
.button1 {
  width: 80px;
  height: 40px;
  padding: 4px 8px;
  background-color: red;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  padding: 4px 8px;
  background-color: yellow;
}
.radio {
  color: red;
}
</style>
