<template>
  <div id="app">
    <router-view v-show="isRouterAlive" />
  </div>
</template>
<script>
import '@/style/global.scss'
export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  position: relative;
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  // background: #f3f3f4;
}
body .el-table th.gutter {
  display: table-cell !important;
}
</style>
