<template>
  <div>
    <div class="tabs">
      <span
        v-for="(item, index) in ['新闻','娱乐','体育']"
        :key="index"
        @click="handleC(index)"
        :class="{ active : current === index }"
      >{{item}}</span>
    </div>

    <div v-show="current === 0">
      <ul>
        <li>新闻</li>
        <li>新闻</li>
        <li>新闻</li>
      </ul>
    </div>
    <div v-show="current === 1">
      <ul>
        <li>娱乐</li>
        <li>娱乐</li>
        <li>娱乐</li>
      </ul>
    </div>
    <div v-show="current === 2">
      <ul>
        <li>体育</li>
        <li>体育</li>
        <li>体育</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    };
  },
  methods: {
    handleC(index) {
      this.current = index;
    }
  }
};
</script>

<style lang='less' scope>
.active {
  color: red;
}
</style>