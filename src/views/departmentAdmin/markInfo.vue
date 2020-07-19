<template>
  <el-dialog title="绑定标记点"
             :visible.sync="dialogFormVisible"
             width="30%"
             class="popup">
    <el-form ref="bindMark"
             label-width="100px">

      <el-form-item label="绑定标记点">
        <template>
          <el-select v-model="value"
                     filterable
                     placeholder="请选择">
            <el-option v-for="item in markList"
                       :key="item.markId"
                       :label="item.markName"
                       :value="item.markId">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

</template>

<script>
export default {
  data () {
    return {
      dialogFormVisible: false,
      orgId: -1,
      value: '',
      markList: [{ "markId": -1, "markName": "不绑定" }],
    }
  },
  created () {
    this.selectAllMark()
  },
  methods: {
    selectAllMark () {
      this.$http.get("/mark/selectAllMark").then(res => {
        this.markList = res.data
        this.markList.splice(0, 0, { "markId": -1, "markName": "不绑定" })
      })
    },
    submitForm () {
      this.$http.put("/mark/updateMarkOrgId", { params: { orgId: this.orgId, markId: this.value } }).then(res => {
        if (res.status == 200) {
          this.$notify({
            title: '成功',
            message: "操作成功",
            type: 'success'
          });

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