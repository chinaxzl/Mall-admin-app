<template>
  <div class="main-header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon
        :type="
          $store.state.changCollapsed.collapsed ? 'menu-unfold' : 'menu-fold'
        "
      />
    </a-button>
    <div class="breadcrumb">
      <template>
        <a-breadcrumb>
          <a-breadcrumb-item>{{
            currentRouteTitle[0] ? currentRouteTitle[0].meta.title : ""
          }}</a-breadcrumb-item>
          <a-breadcrumb-item
            ><router-link :to="{ name:currentRouteTitle[1]? currentRouteTitle[1].name :''}">{{
              currentRouteTitle[1] ? currentRouteTitle[1].meta.title : ""
            }}</router-link></a-breadcrumb-item
          >
        </a-breadcrumb>
      </template>
    </div>
    <div class="user-info">
      <ul>
        <li>
          欢迎{{ $store.state.userCookie.user.username }}
          <a-icon type="down" />
        </li>
        <li @click="handleOut">退出</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //初始化，不然刚进入页面不会显示面包屑
      currentRouteTitle: this.$router.currentRoute.matched,
    };
  },

  methods: {
    toggleCollapsed() {
      //设置左导航的伸缩
      this.$store.dispatch("changCollapsed/collapsed");
    },
    handleOut() {
      //点击退出后，清除cookie，并跳转到登录夜
      this.$store.dispatch("userCookie/fachlogOut");
      this.$router.push("/login");
    },
  },

  watch: {
    $route() {
      //观察路由变化，改变面包屑
      this.currentRouteTitle = this.$router.currentRoute.matched;
    },
  },

};
</script>

<style scoped lang="less">
.main-header {
  position: relative;
  border-bottom: 1px solid #ccc;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
}
.breadcrumb {
  display: inline-block;
  margin-left: 20px;
}
.user-info {
  position: fixed;
  top: 0;
  right: 20px;
  cursor: pointer;
  text-align: center;
  z-index: 999;

  li:not(:first-child) {
    display: none;
    text-align: center;
    &:hover {
      background: #eee;
      color: #999;
      font-weight: 700;
    }
  }
  li {
    padding: 0 20px;
  }
  &:hover {
    li {
      display: block;
    }
  }
}
</style>