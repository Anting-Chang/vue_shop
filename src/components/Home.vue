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
            router
            unique-opened
            :default-active="activePath"
            class="el-menu-vertical-demo"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409BFF">
            <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- second level menu -->
              <el-menu-item :index="'/'+subItem.path+''" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
              <!-- second level menu -->
            </el-submenu>
          </el-menu>
      </el-aside>
      <!-- left side nav -->
      <!-- right main content -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- right main content -->
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable quote-props */

export default {
  name: 'Home',
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  data () {
    return {
      menuList: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      activePath: ''
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
    },
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
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

  .iconfont {
    margin-right: 10px;
  }

  .el-menu {
    border-right: none;
  }
</style>
