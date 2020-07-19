<template>
  <!-- 含叶子节点 -->
  <el-submenu v-if="!data.treeLeaf" :key="data[props.menuHref]" :index="data[props.menuName]">
    <template slot="title">
      <i  :class="data[props.menuIcon]"></i>
      <span slot="title">{{ data[props.menuName] }}</span>
    </template>
    <!-- 递归调用自身遍历子节点 -->
    <menu-item v-for="node in data[props.childrenNodes]" :key="node[props.menuHref]" :data="node" />
  </el-submenu>
  <!-- 叶子节点 -->
  <el-menu-item  v-else :key="data[props.menuHref]" @click="selectClick(data)" :index="data[props.menuName]" :route="{ name: data[props.menuHref] }">
    <i  :class="data[props.menuIcon]"></i>
    <span :class="data.class">{{ data[props.menuName] }}</span>
  </el-menu-item>

</template>
<script>
  import {mapGetters} from 'vuex'
export default {

  name: 'MenuItem',
  computed: {
    ...mapGetters(['isShow']),
  },
  props: {
    // 节点对象
    data: {
      type: Object,
      required: true,
    },

    // 配置项
    props: {
      type: Object,
      default: () => ({
        menuName: 'menuName',        // 标签文字
        menuIcon: 'menuIcon',         // 图标类名
        menuHref: 'menuHref',    // 跳转模块名称
        childrenNodes: 'childrenNodes', // 子节点，数组
      }),
    },
  },
  data() {
    return {
      // 是否为叶子节点
      isLeaf: this.data[this.props.childrenNodes] && this.data[this.props.childrenNodes].length,
      // src:[
      //         '../../../../assets/user.svg',
      // ]
    };
  },
  methods: {
    selectClick(data) {
      // eslint-disable-next-line no-console
      console.log(data);
    },
  },
};
</script>

