<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <div class="flights-content">
        <!-- 过滤条件 -->
        <flightsFliters :data='cacheDataList' @setDataList="setDataList"/>

        <!-- 航班头部布局 -->
        <flightslistheader />

        <!-- 航班信息 -->
        <flightsitem v-for="(item,index) in dataList" :key="index" :data="item" />
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="indexPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>
<script>
import flightslistheader from "@/components/air/flightslistheader.vue";
import flightsitem from "@/components/air/flightsitem.vue";
import flightsFliters from "@/components/air/flightsFliters.vue";
export default {
  components: {
    flightslistheader,
    flightsitem,
    flightsFliters
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      this.flightsData = res.data;
      this.cacheDataList={...res.data};
      console.log(res.data);
      this.total=this.flightsData.total;
      this.dataList=this.flightsData.flights.slice(0,this.pageSize)
      
    });
  },
  data() {
    return {
      flightsData: {
        info:{},
        options:{}
      },
      cacheDataList:{
        info:{},
        options:{}
      },
      total:0,
      pageSize:5,
      indexPage:1,
      dataList:[]
    };
  },
  methods:{
      handleSizeChange(val){
          this.pageSize=val;
          this.dataList=this.flightsData.flights.slice(0,val);
      },
      handleCurrentChange(val){
          this.indexPage=val;
          this.dataList=this.flightsData.flights.slice((this.indexPage-1)*this.pageSize,this.indexPage*this.pageSize)
      },
      setDataList(arr){
        this.flightsData.flights=arr;
        this.indexPage = 1;
        this.dataList=this.flightsData.flights.slice(
          (this.indexPage-1)*this.pageSize,
          this.indexPage*this.pageSize
        );
        this.total=arr.length;
      }
  }
};
</script>
<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>