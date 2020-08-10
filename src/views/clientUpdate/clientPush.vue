<template>
  <el-dialog title="添加推送任务"
             width="30%"
             :visible.sync="dialogClientPushVisible">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="版本号">
        <el-input v-model="ruleForm.versionName"
                  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="执行时间">
        <el-date-picker v-model="value1"
                        type="datetime"
                        placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="作用单位">
        <el-select v-model="orgCode"
                   multiple
                   collapse-tags
                   style="margin-left: 20px;margin-right:20px"
                   placeholder="部署单位">
          <el-option v-for="item in orgList"
                     :key="item.orgId"
                     :label="item.orgName"
                     :value="item.orgCode">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="addClientPushCron('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>

  </el-dialog>

</template>

<script>
export default {
  data () {
    return {
      dialogClientPushVisible: false,
      value1: '',
      orgList: [],
      orgCode: [],
      ruleForm: {
        versionName: '',
        clientUpadteId: '',
        executeTime: '',
        orgCodeList: [],
      },
      rules: {
        version: [
          { required: true, message: '请输入版本号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        versionDesc: [
          { required: true, message: '请先上传版本文件', trigger: 'blur' },
        ]
      }
    }
  },
  created () {
    this.getOrgList()
  },
  methods: {
    addClientPushCron (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.orgCodeList = this.orgCode
          this.ruleForm.executeTime = this.value1
          console.log(this.ruleForm)
          this.$http.post("/cron/addClientPushCron", this.ruleForm).then(res => {
            if (res.status == 200) {
              this.$notify({
                title: 'success',
                message: '删除用户成功',
                type: 'success'
              });
              this.dialogVisible = false
            } else {
              console.log(res.data)
            }
          })


        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleSuccess (response) {
      console.log(response)
      this.ruleForm.downloadAddress = this.$store.state.ip + "/updateFilePath/" + response.filename
      this.ruleForm.md5 = response.md5
    },
    getOrgList () {
      this.$http.get("/org/getOrgList", { params: { orgName: "" } }).then(res => {
        console.log(res.data)
        this.orgList = res.data.records
      });
    }
  }

}
</script>

<style>
</style>