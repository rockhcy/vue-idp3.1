<template>
  <el-dialog title="新增监控策略"
             :visible.sync="dialogFormVisible"
             width="50%"
             class="popup">
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="80px">
      <el-form-item label="策略类型"
                    prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label=1>端口监控</el-radio>
          <el-radio label=0>进程监控</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="策略内容"
                    prop="loginname">
        <el-input v-model="form.loginname"></el-input>
      </el-form-item>
      <el-form-item label="策略描述"
                    prop="loginname">
        <el-input v-model="form.loginname"></el-input>
      </el-form-item>
      <el-form-item label="策略状态"
                    prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label=1>正常</el-radio>
          <el-radio label=0>冻结</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="适用范围"
                    prop="status">
        <template>
          <el-transfer filterable
                       :filter-method="filterMethod"
                       filter-placeholder="请输入单位名称"
                       v-model="value"
                       :data="data">
          </el-transfer>
        </template>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="dialogVisible = false">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    const generateData = _ => {
      console.log(_)
      const data = [];
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data;
    };
    return {
      dialogFormVisible: false,
      strategyType: [
        { value: '端口监控', lable: '2' },
        { value: '进程监控', lable: '1' }
      ],
      form: {
        type: ''
      },
      data: generateData(),
      value: [],
      filterMethod (query, item) {
        return item.pinyin.indexOf(query) > -1;
      }
    }
  }
}
</script>

<style>
</style>