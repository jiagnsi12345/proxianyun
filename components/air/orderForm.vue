<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="users[index].username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="users[index].id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 删除乘机人 -->
          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index" >
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}万`"
            border
            @change="handleChange(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <span v-show="false">{{allPrice}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoData: {
      },
        users: [
          {
            username: "",
            id: ""
          }
        ],
        insurances: [],
        contactName: "",
        contactPhone: "",
        invoice: false,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id,
        captcha: "",
        can:{},
        infoData:{}
     
    };
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({ username: "", id: "" });
    },

    // 移除乘机人
    handleDeleteUse(index) {
      this.users.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      if (!this.contactPhone) {
        this.$message.error("请先填写手机号");
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "post",
        data: {
          tel: this.contactPhone
        }
      }).then(res => {
        const { code } = res.data;
        this.$alert(`模拟手机验证码是${code}`, "提示");
      });
    },

    // 提交订单
    handleSubmit() {
        let data={
            users:this.users,
            insurances:this.insurances,
            contactName:this.contactName,
            contactPhone:this.contactPhone,
            invoice:this.invoice,
            seat_xid:this.seat_xid,
            air:this.air,
            captcha:this.captcha
        }
       
        this.users.forEach(element => {
            if(!(element.username||element.id)){
                this.$message.error('乘机人不能为空')
                console.log(element.username,element.id)
            } 
        });
        if(!this.contactName){
             this.$message.error('联系人姓名不能为空')
        }
        if(!this.contactPhone){
            this.$message.error('联系电话不能为空')
        }
        if(!this.captcha){
            this.$message.error('验证码不能为空')
        }
           
        
        this.$axios({
            url:"/airorders",
            headers:{
                Authorization:`Bearer ${this.$store.state.user.userInfo.token}`
            }
            ,method:'post',
            data
           
        }).then(res=>{
          console.log(res)
         const {id} = res.data.data
           this.$router.push({
             path:"/air/pay",
             query:{
               id
             }
           })
        })
    },
    // 管理保险id
    handleChange(id) {
      const index = this.insurances.indexOf(id);
      if (index > -1) {
        this.insurances.splice(index, 1);
      } else {
        this.insurances.push(id);
      }

      console.log(this.insurances);
    }
  },
  mounted() {
    //你选择了什么机票的axios请求
    this.$axios({
      url: "/airs/" + this.$route.query.id,
      params:{seat_xid:this.$route.query.seat_xid}
    }).then(res => {
      this.infoData=res.data
      console.log(res.data)
      this.$store.commit("air/setInfoData",this.infoData)
    });
  },
  computed:{
    allPrice(){
      if(!this.infoData.seat_infos){
        return 0
      }
      let price = 0;
      price += this.infoData.seat_infos.org_settle_price;
      price +=this.infoData.airport_tax_audlet;
      price+=30*this.insurances.length;
      price*=this.users.length;
      this.$store.commit("air/setAllPrice",price)
      return price
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>