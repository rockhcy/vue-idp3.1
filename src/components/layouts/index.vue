<template>
  <div class="quanbu">
    <LayoutHeader />
    <layout-sidebar />
    <main ref="main"
          class="g-main"
          :style="{ 'width':  `calc(100% - ${$store.state.menuWidth})` }">
      <transition name="fade-move"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
    <div class="footer"
         :style="{ 'width': `calc(100% - ${$store.state.menuWidth})` }">
      <div class="footer-left">和信创天科技股份有限公司</div>
      <div class="footer-right">Copyright VEsystem © 2009-2020</div>
    </div>
  </div>
</template>
<script>
import LayoutHeader from "./components/Header";
import LayoutSidebar from "./components/Sidebar";
export default {
  name: "Layout",
  components: {
    LayoutHeader,
    LayoutSidebar,
  },
  data () {
    return {};
  },
  created () {
    if (document.body.clientWidth < 600) {
      this.$store.state.isPhone = true;
    }
    window.onresize = () => {
      this.$store.state.isPhone = document.body.clientWidth < 600;
    }
  },
};
</script>
<style lang="scss">
.quanbu {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  /*min-width:1260px;*/
}
.fade-move-leave-active,
.fade-move-enter-active {
  transition: all 0.15s;
}
.fade-move-enter {
  opacity: 0;
  transform: translateX(-10px);
}
.fade-move-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.g-main {
  display: block;
  float: left;
  // padding: 0 15px;
  position: relative;
  border-top: 1px solid #e4e7ed;
  overflow-y: auto;
  height: calc(100% - 103px);
  /*text-align: center;*/
}
.footer {
  width: calc(100% - 200px);
  height: 40px;
  background: #ffffff;
  line-height: 40px;
  position: absolute;
  right: 0;
  bottom: 0;
}
.footer-left {
  display: inline-block;
  padding-left: 27px;
}
.footer-right {
  display: inline-block;
  float: right;
  padding-right: 29px;
}
.phoneClass {
  width: 100% !important;
}
</style>
