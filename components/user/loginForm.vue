<template>
    <el-form status-icon class="form" :rules="rules" :model="form" ref="form">
  <el-form-item  class="form-item" prop="username">
    <el-input placeholder="用户名/手机" v-model="form.username" ></el-input>
  </el-form-item>
  <el-form-item class="form-item" prop="password">
    <el-input placeholder="密码"  v-model="form.password" type="password" ></el-input>
  </el-form-item>
    <p class="form-text">
        <nuxt-link to="#">忘记密码</nuxt-link>
    </p>
    <el-button type="primary" class="submit" @click="handleLoginSubmit">登录</el-button>
 
</el-form>
</template>
<script>
export default {
    data(){
        return{
            form:{
                password:'',
                username:''

            },
            rules:{
                password:[
                     { 
                    required: true, 
                    message: '请输入用户名', 
                    trigger: 'blur' 
                },
                ],
                username:[
                     { 
                    required: true, 
                    message: '请输入密码', 
                    trigger: 'blur' 
                },
                ]

            }
        }
    },
    methods:{
        handleLoginSubmit(){
            this.$refs['form'].validate(valid=>{
              if(valid){
                    this.$axios({
                        url:'/accounts/login',
                        method:'post',
                        data:this.form
                    }).then(res=>{
                        this.$store.commit('user/setUserInfo',res.data)
                        // setTimeout(()=>{
                        //     this.$router.replace('/')
                        // },1000)
                        this.$router.back();
                    })
                }else{
                  
                }
            })
                
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>