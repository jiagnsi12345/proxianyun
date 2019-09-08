<template>
  <div class="class-form">
    <!-- tab欄 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        @click="handleSearchTab( index)"
        :class="{active:index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <!-- 表單 -->
    <el-form label-width="80px" class="search-form-content">
      <el-form-item label="出發城市">
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          @blur="handleDepartBlur"
          placeholder="请输入内容"
          @select="handleDepartSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到達城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请输入内容"
          @blur="handleDestBlur"
          @select="handleDestSelect"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="出發時間">
        <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" @change="handleDate" v-model="form.departDate" ></el-date-picker>
        <!-- :picker-options="pickerOptions" -->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">搜索</el-button>
      </el-form-item>
       <div class="reverse">
            <span @click="handleReverse">换</span>
        </div>
    </el-form>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      date:"",
      form:{
          departCity:"",
          departCode:"",
          destCity:"",
          destCode:"",
          departDate:""
      },
    //   pickerOptions: {
    //       disabledDate(time) {
    //         return time.getTime() < Date.now() - 8.64e7
    //       }
    // },
    //返回的城市
    DepartData:[],
    destData:[]
  }},
  methods: {
    handleSearchTab(index) {
      if (index === 1) {
        this.$alert("目前暂时不支持往返", "提示");
      }
    },
    queryDepartSearch(value,callback) {
        if(!value){
            callback([])
            return
        }
       
        this.$axios({
            url:'/airs/city',
            params:{
                name:value
            }
        }).then(res=>{
            const {data}=res.data;
            const newData=[];
            data.forEach(v=>{
                v.value=v.name.replace("市","");
                newData.push(v)
            })
            
            this.DepartData=newData;
            // this.form.departCity=newData[0].value;
            // this.form.departCode=newData[0].sort
            callback(newData)

            
        })
        
    },
    handleDepartSelect(item) {
       this.form.departCity=item.value;
       this.form.departCode=item.sort
    },
    queryDestSearch(value,callback) {
        if(!value){
            callback([])
            return
        }
        this.$axios({
            url:'/airs/city',
            params:{
                name:value
            }
        }).then(res=>{
            const {data}=res.data;
            const newData2=[];
            data.forEach(v=>{
                v.value=v.name.slice(0,v.name.length-1)
                newData2.push(v)
            })
             
             this.destData=newData2;
            // this.form.destCity=newData2[0].value
            // this.form.destCode=newData2[0].sort
            callback(newData2)
          
        })
    },
    handleDestSelect(item) {
        this.form.destCity=item.value;
        this.form.destCode=item.sort
    },
    handleDate(value) {
       this.form.departDate= moment(value).format('YYYY-MM-DD')
    },
    handleReverse(){
        const { destCity,destCode,departCity,departCode } = this.form;
        this.form.destCity=departCity;
        this.form.destCode=departCode;
        this.form.departCode=destCode;
        this.form.departCity=destCity;
    },
    handleSubmit(){
        
        if(!this.form.departCity){
          this.$alert("请填写出发地",'提示')
          return
        }
        if(!this.form.destCity){
          this.$alert("请填写目的地","提示")
        }
        if(!this.form.departDate){
          this.$alert("请选择日期","提示")
          return
        }
        
        const arr = JSON.parse(localStorage.getItem("airs"))||[];
        arr.push(this.form)
        localStorage.setItem("airs",JSON.stringify(arr))
        this.$router.push({
          path:"/air/flights",
          query:this.form
        })
    },
    handleDepartBlur(){
      this.form.departCity=this.DepartData[0]?this.DepartData[0].value:'';
      this.form.departCode=this.DepartData[0]?this.DepartData[0].sort:'';
    },
    handleDestBlur(){
      this.form.destCity=this.destData[0]?this.destData[0].value:'';
      this.form.destCode=this.destData[0]?this.destData[0].sort:'';
    }
  }
};
</script>
<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>