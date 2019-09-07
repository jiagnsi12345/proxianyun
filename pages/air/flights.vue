<template>
   <section class="contianer">
  <el-row type="flex" justify="space-between" >
     <div class="flights-content">
      <!-- 过滤条件 -->
                 
                <!-- 航班头部布局 -->
                <flightslistheader
                />
                
                
                <!-- 航班信息 -->
                <flightsitem v-for="(item,index) in flightsData.flights" :key="index" :data="item"/>
                    
                </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
  </el-row>
   </section>
</template>
<script>
import flightslistheader from '@/components/air/flightslistheader.vue'
import flightsitem from '@/components/air/flightsitem.vue'
export default {
    components:{
        flightslistheader,
        flightsitem
    },
    mounted(){
        this.$axios({
            url:'/airs',
            params:this.$route.query
        }).then(res=>{
            this.flightsData=res.data
        })
    },
    data(){
        return{
            flightsData:{}
        }
    }
}
</script>
<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>