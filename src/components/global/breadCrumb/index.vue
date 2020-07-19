<template>
<!-- 面包屑组件 -->
  <el-card class="box-card">
    <div class="name">{{name}}</div>
    <ul class="bread">
      <li>
        <span @click="$router.push('/main/index')">系统导航</span> <span>/</span>
      </li>
      <li v-for="(item, i) in breadData" :key="i">
        <span>{{item}}</span> <span>/</span>
      </li>
    </ul>
  </el-card>
</template>

<script>
export default {
  name: 'BreadCrumb',
  props: {
    name: {
      type: String,
      default: '',
    },
    breadData: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.box-card{
  padding-bottom: 10px;
  margin-bottom: 15px;
}
.name{
  color: #676A6C;
  font-size: 24px;
}
.bread{
  margin-top: 5px;
  width: 100%;
  >li{
    padding: 5px;
    display: inline-block;
    float: left;
    color: #676A6C;
    >span:nth-child(1){
      margin-right: 5px;
      cursor: pointer;
    }
    >span:nth-child(2){
      color: #CECCD4;
    }
  }
  >li:last-child{
    font-weight: 600;
    >span:nth-child(2){
      display: none;
      cursor: auto!important;
    }
  }
}
</style>