<template>
  <el-container class="home-container">
    <!-- header nav -->
    <el-header>
      <div>
        <img src="" alt="">
        <div>Shop Manager</div>
      </div>
      <el-button class="logout-btn" type="info" @click="logout">Logout</el-button>
    </el-header>
    <!-- header nav -->
    <!--      main container -->
    <el-container>
      <!-- left side nav -->
      <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item :index="subItem.id+''" v-for="subItem in item.children" :key="subItem.id">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
      </el-aside>
      <!-- left side nav -->
      <!-- right main content -->
      <el-main>Main</el-main>
      <!-- right main content -->
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  created () {
    this.getMenuList()
  },
  data () {
    return {
      menuList: []
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      this.menuList = res.data
      console.log(res)
    }
  }
}
</script>

<style scoped>
  .logout-btn {
    margin: 10px 0;
  }
  .home-container {
    height: 100%;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
  }

  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
</style>
