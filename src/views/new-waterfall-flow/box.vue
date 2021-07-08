<template>
  <div :class="$style.box">
    <div :class="$style.info">
      <a :href="good.href">
        <div :class="$style.pic">
          <img :src="good.src" @load="loadComplete" style="height: auto;" />
        </div>
      </a>
      <div :class="$style.title">
        <a>
          <div>
            <strong :class="$style.price">
              <!-- <em>¥</em>{{good.price}} -->
              {{good.uuid}}
            </strong>
          </div>
          <div>
            <em>{{good.name}}</em>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, toRef, toRefs, watch } from 'vue'


export default defineComponent({
  name: 'box',
  // props: {
  //   uuid: {
  //     type: String,
  //     required: true,
  //   },
  //   name:  {
  //     type: String,
  //     required: true,
  //   },
  //   title:  {
  //     type: String,
  //     required: true,
  //   },
  //   src:  {
  //     type: String,
  //     required: true,
  //   },
  //   price:  {
  //     type: Number,
  //     required: true,
  //   },
  // },
  // setup(props) {
  //   const uuid = toRef(props, 'uuid')
  //   const name = toRef(props, 'name')
  //   const title = toRef(props, 'title')
  //   const src = toRef(props, 'src')
  //   const price = toRef(props, 'price')
  //   return {
  //     uuid,
  //     name,
  //     title,
  //     src,
  //     price,
  //   }
  // }
  props: {
    good: {
      type: Object as PropType<IGood>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    // const good = reactive<IGood>(props.good)
    const good = toRefs(props).good
    //  watch(() => props.good, (selection, prevSelection) => { 
    //   const {
    //     uuid,
    //     name,
    //     title,
    //     src,
    //     href,
    //     price,
    //   } = selection
    //   good.uuid = uuid
    //   good.name = name
    //   good.title = title
    //   good.src = src
    //   good.href = href
    //   good.price = price
    // })
    const loadComplete = () => {
      emit('completed', props.index)
    }
    return {
      good,
      loadComplete,
    }
  },
})
</script>

<style module>
.box {
  /* position: absolute; */
  width: 280px;
  height: auto;
  padding: 10px;
  border: none;
  /* float: left; */
}
.info {
  width: 280px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 11px #666;
  background: #fff;
}
.pic {
  width: 260px;
  height: auto;
  margin: 0 auto;
  padding-top: 10px;
}
.pic:hover {
  -webkit-animation: shade 3s ease-in-out 1;
  -moz-animation: shade 3s ease-in-out 1;
  -ms-animation: shade 3s ease-in-out 1;
  -o-animation: shade 3s ease-in-out 1;
  animation: shade 3s ease-in-out 1;
}
.pic img {
  width: 260px;
  border-radius: 3px;
}
.title {
  width: 260px;
  height: 40px;
  margin: 0 auto;
  line-height: 40px;
  text-align: center;
  color: #666;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
}

.price {
  color: #e4393c;
  font-size: 20px;
  float: left;
  margin-left: 10px;
}
</style>
