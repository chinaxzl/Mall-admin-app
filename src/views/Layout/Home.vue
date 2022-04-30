<template>
  <div class="home-container">
    <Menu :key="key" />
    <div
      :class="{
        'main-app': true,
        'menu-unfold': $store.state.changCollapsed.collapsed,
      }"
    >
      <Nav />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Menu from "./components/menu.vue";
import Nav from "./components/nav.vue";
export default {
  components: {
    Menu,
    Nav,
  },

  data(){
    return {
      key:1
    }
  },
  watch:{
    $route(){//给menu组件添加一个key值，当路由变化的时候，改变key值，使其重新读取
      this.key++
    }
  }

};
</script>

<style scoped lang="less">

.main-app {

  margin-left: 200px;
  transition: 0.3s;
  &.menu-unfold {
    margin-left: 80px;
  }
}
</style>
