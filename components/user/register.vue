<template>
  <div>
    <el-form :model="form" ref="form" :rules="rules" class="form">
      <el-form-item class="form-item" prop="username">
        <el-input placeholder="用户名手机" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="captcha">
        <el-input placeholder="验证码" v-model="form.captcha">
          <template slot="append">
            <el-button @click="handleSentCaptcha">发送验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="nickname">
        <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="password">
        <el-input type="password" placeholder="密码" show-password v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="checkpassword">
        <el-input type="password" placeholder="确认密码" show-password v-model="form.checkpassword"></el-input>
      </el-form-item>

      <el-form-item class="form-item">
        <el-button type="primary" class="submit" @click="handleRegSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    data(){
        var Cpassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
           callback(new Error('两次密码输入不一致'))
          }else{
            callback()  
          }
        }
        return{
             
            form:{
                username:'',
                nickname:'',
                captcha:'',
                password:'',
                checkpassword:''
            },
            rules:{
                username:[{
                    require:true,message:'用户不能为空',trigger:'blur'
                }],
                nickname:[{
                    require:true,message:'名字不能为空',trigger:'blur'
                }],
                captcha:[{
                    require:true,message:'验证码不能为空',trigger:'blur'
                }],
                password:[{
                    require:true,message:'密码不能为空',trigger:'blur'
                }],
                checkpassword:[{
                   require:true, validator: Cpassword,trigger:'blur'
                }]

            }
        }
    },
    methods: {
       
         // 验证码发送
        handleSentCaptcha(){
            if(!this.form.username){
                this.$massage.error("请先填写手机号")
                return
            }
            this.$axios({
                url:'/captchas',
                method:'post',
                data:{
                    tel: this.form.username
                }
            }).then(res=>{
               const {code} =res.data
               this.$alert(`模拟手机验证码是${code}`,'提示')
            })
        },
       // 注册 
       handleRegSubmit(){
            this.$refs.form.validate(valid=>{
                if(valid){
                    const {checkpassword,...res}=this.form;
                    this.$axios({
                        url:`/accounts/register`,
                        method:'post',
                        data:res
                    }).then(res=>{
                        this.$store.commit("user/setUserInfo",res.data)
                        setTimeout(()=>{
                            this.$router.replace('/')
                        },1000)
                    })
                }

            })
        }
        
    }
}
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>