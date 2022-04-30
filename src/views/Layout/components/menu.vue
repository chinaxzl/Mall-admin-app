<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[selectedKeys]"
      :default-open-keys="[openKeys]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.changCollapsed.collapsed"
    >
      <template v-for="item in $store.state.menuRouter.menuRouter"
        ><a-sub-menu :key="item.name" v-if="!item.meta.show">
          <span slot="title"
            ><a-icon :type="item.meta.icon" /><span>{{
              item.meta.title
            }}</span></span
          >
          <template v-for="child in item.children">
            <a-menu-item v-if="!child.meta.show" :key="child.name">
              <router-link :to="{ name: child.name }"
                ><a-icon :type="child.meta.icon" />{{
                  child.meta.title
                }}</router-link
              ><!--此处需要用具名路由，使用其他路由会出现错误-->
            </a-menu-item>
          </template>
        </a-sub-menu></template
      >
    </a-menu>
  </div>
</template>

<script>
export default {
  computed: {
    selectedKeys() {//初始选中的菜单项 key 数组
      //根据计算属性来监听数据的变化从而渲染新页面的渲染
      return this.$router.currentRoute.matched[1]
        ? this.$router.currentRoute.matched[1].name
        : "";
    },

    openKeys() {//初始展开的 SubMenu 菜单项 key 数组
      return this.$router.currentRoute.matched[0].name;
    },
  },
};
</script>

<style scoped lang="less">
.menu-list {
  position: fixed;
  width: 200px;
  height: 100%;
}
.ant-menu {
  height: 100%;
}
</style>