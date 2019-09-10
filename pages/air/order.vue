<template>
    <div class="container">
          <el-row type="flex" justify="space-between" >
              <!-- 订单表单 -->
              <orderForm />
              <!-- 侧边栏 -->
                  <orderAside class="aside"/>
          </el-row>
    </div>
</template>
<script>
import orderForm from "@/components/air/orderForm.vue"
import orderAside from "@/components/air/orderAside.vue"
export default {
    components:{
        orderForm,
        orderAside
    }
}
</script>
<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>