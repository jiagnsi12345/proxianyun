<template>
  <section class="container">
    <h2 class="air-title"><span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h2>
    <!-- 搜索廣告欄 -->
    <el-row type="flex" justify="space-between">
       <!-- 搜索 -->
       <searchForm></searchForm>
       <!-- banner -->
      
       <div>
         <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt="">
       </div>
      </el-row>
       <!-- 廣告 -->
          <el-row type="flex" class="statement" >
              <el-col :span="8">
                <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
                <span>100%的航協認證</span>
              </el-col>
              <el-col :span="8">
                <i class="iconfont iconbaozheng" style="color:green"></i>
                <span>出行保證</span>
              </el-col>
              <el-col :span="8">
                <i class="iconfont icondianhua" style="color:#409EFF;"></i>
                <span>7×24小時服務</span>
              </el-col>
    </el-row>
    <h2 class="air-sale-title">
      <span class="iconfont icontejiajipiao"></span>
      <i>特價机票</i>
    </h2>
    
    <!-- 特價機票 -->

    <div class="air-sale">
        
    </div>


  </section>
</template>

<script>
import searchForm from '@/components/air/searchForm'
export default {
components:{
  searchForm
}
}
</script>

<style scoped lang="less">
.air-sale{
  border: 1px #ddd solid;
  padding:20px;
  margin-bottom:50px;

  .air-sale-pic{
    > div{
      width:225px;
      height:140px;
      position: relative;
      overflow: hidden;

      img{
        width:100%;
      }

      .layer-bar{
        position:absolute;
        bottom:0;
        left:0;
        background: rgba(0,0,0,0.5);
        color:#fff;
        height:30px;
        line-height: 30px;
        width:100%;
        box-sizing: border-box;
        padding: 0 15px;
        font-size: 14px;

        span:last-child{
          font-size:18px;
        }
      }
    }
  }
}

.air-sale-group{
  margin-top:20px;
  padding-top:8px;
  border-right:1px #eee solid;

  &:last-child{
    border-right:none;
  }

  .air-sale-row{
    font-size:12px;
    color:#666;
    margin-bottom:8px;

    .air-sale-price{
      color:orange;
      font-size: 20px;
    }
  }
}

.container{
  width:1000px;
  margin:0 auto;
}

.air-title{
  margin:15px 0;
  font-size:20px;
  font-weight: normal;
  color:orange;

  span{
    font-size:20px;
  }
}

.statement{
  margin:15px 0;
  border:1px #ddd solid;
  background:#f5f5f5;
  height: 58px;
  padding:10px 0;
  box-sizing:border-box;

  > div{
    text-align: center;
    line-height: 38px;
    border-right:1px #ddd solid;

    &:last-child{
      border-right: none;
    }

    *{
      vertical-align: middle;
    }

    i{
      font-size:30px;
    }
  }
}

.air-sale-title{
  margin:15px 0;
  font-size:20px;
  font-weight: normal;
  color:#409EFF;

  span{
    font-size:20px;
  }
}
</style>