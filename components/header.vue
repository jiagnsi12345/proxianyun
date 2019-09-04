<template>
  <div class="container">
    <el-row type="flex" class="main" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>

      <el-row type="flex" class="navs">
        <!-- nuxt-link的作用和使用方式和router-link -->
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>

      <!-- 登录跳转 -->
      <div v-if="!$store.state.user.userInfo.token">
        <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
      </div>
      <div v-else>
        <el-dropdown>
          <span  class="el-dropdown-link">
              <img
            :src="`${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar}`"
            alt
          />
          <span>
            {{$store.state.user.userInfo.user.nickname}}
            <i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
methods:{
    handleLogout(){
        // this.$emit('click');
        this.$store.commit('user/clearUserInfo')
        this.$message.success("退出成功")
        setTimeout(()=>{
            this.$router.push('user/login')
        },1000)
    }
}
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 2px 2px #ddd;

  .main {
    width: 1000px;
    margin: 0 auto;
  }

  .navs {
    flex: 1;
    margin-left: 10px;

    a {
      display: block;
      height: 60px;
      padding: 0 20px;
      box-sizing: border-box;

      &:hover {
        color: #409eff;
        border-bottom: 5px #409eff solid;
      }
    }

    // 该class是nuxt会去自动匹配nuxt-link的to的值，如果url和to的值相等会自动加上下面的class
    .nuxt-link-exact-active {
      background: #409eff;
      color: #fff;

      &:hover {
        color: #fff;
      }
    }
  }
  .logo {
    padding-top: 10px;
    img {
      width: 156px;
      height: 30px;
      display: block;
    }
  }
}
 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
        img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            vertical-align: middle;
            border: 2px solid #fff;
            box-sizing: border-box;
            &:hover{
                border: 2px solid #409EFF;
            }
    }
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  
</style>