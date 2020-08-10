<template>
  <el-dialog title="新增监控策略"
             :visible.sync="dialogFormVisible"
             width="50%"
             class="popup">
    <el-form ref="form"
             :model="form"
             label-width="80px">
      <el-form-item label="策略类型"
                    prop="strategyType">
        <el-radio-group v-model="form.strategyType">
          <el-radio label=2>端口监控</el-radio>
          <el-radio label=1>进程监控</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="策略内容"
                    prop="strategyContent">
        <el-input v-model="form.strategyContent"></el-input>
      </el-form-item>
      <el-form-item label="策略描述"
                    prop="strategyDesc">
        <el-input v-model="form.strategyDesc"></el-input>
      </el-form-item>
      <el-form-item label="策略状态"
                    prop="strategyStatus">
        <el-radio-group v-model="form.strategyStatus">
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
                       v-model="form.orgCodes"
                       :data="allOrg">
          </el-transfer>
        </template>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="addPorProBlacklist">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogFormVisible: false,
      strategyType: [
        { value: '端口监控', lable: '2' },
        { value: '进程监控', lable: '1' }
      ],
      form: {
        strategyType: '',
        strategyContent: '',
        strategyDesc: '',
        strategyStatus: '',
        orgCodes: []
      },
      allOrg: [],
      filterMethod (query, item) {
        return item.pinyin.indexOf(query) > -1;
      }
    }
  },
  created () {
    this.getOrgList()
  },
  methods: {
    getOrgList () {
      var pa = {}
      pa.orgName = ''
      pa.current = 1
      pa.size = 999;
      this.$http.get("/org/getOrgList", { params: pa }).then(res => {
        console.log(res.data)
        var data = []
        res.data.records.forEach((item, index) => {
          console.log(index)
          data.push({
            label: item.orgCode,
            key: item.orgId,
            pinyin: item.orgCode
          });
        })
        this.allOrg = data
      })
    },
    addPorProBlacklist () {
      console.log(this.form)
      this.$http.post("/admin/addPorProBlacklist", this.form, { headers: { 'Content-Type': 'application/json' } }).then(res => {
        if (res.status == 200) {
          this.$notify({
            title: '成功',
            message: "操作成功",
            type: 'success'
          });
          location.reload();
        } else {
          console.log(res.data)
        }
      })

    }
  }
}
</script>

<style>
</style>