<template>
    <div class="container">
    <!-- 轮播图 -->
    <el-carousel arrow="always">
      <el-carousel-item v-for="(item,index) in banner" :key="index">
        <div class="banner-image" :style="`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
        background-size:contain contain`"
        >
        </div>
      </el-carousel-item>
    </el-carousel>
<!-- 输入框 -->
    </div>
</template>

<script>
export default {
data(){
    return{
        banner:[]
        
    }
},
mounted(){
    this.$axios({
        url:'/scenics/banners'
    }).then(res=>{
        const {data} =res.data;
        this.banner=data
    })
}
}
</script>

<style scoped lang="less">
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;

    /deep/ .el-carousel__container{
        height:700px;
    }
    .banner-image{
        width:100%;
        height:100%;
    }
}
</style>