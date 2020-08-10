<template>
  <el-dialog title="任务文件详情"
             width="30%"
             :visible.sync="dialogTableVisible">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="版本号"
                    prop="versionName">
        <el-input v-model="ruleForm.versionName"
                  placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="下载地址"
                    prop="downloadAddr">
        <el-input v-model="ruleForm.downloadAddr"
                  placeholder="版本文件下载地址"
                  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="MD5"
                    prop="md5">
        <el-input v-model="ruleForm.md5"
                  placeholder="版本文件下载MD5"
                  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="适配系统"
                    prop="adaptiveSys">
        <el-select v-model="ruleForm.adaptiveSys"
                   placeholder="请选择适配系统">
          <el-option label="Windows操作系统"
                     value="1"></el-option>
          <el-option label="UBunTu操作系统"
                     value="2"></el-option>
          <el-option label="deepin操作系统"
                     value="3"></el-option>
          <el-option label="android系统"
                     value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="更新类型"
                    prop="updateType">
        <el-radio-group v-model="ruleForm.updateType">
          <el-radio label="1">强制更新</el-radio>
          <el-radio label="2">建立更新</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-upload class="upload-demo clientUpdate"
                   style="display:inline-block"
                   :action=action
                   name="client"
                   :show-file-list=false
                   multiple
                   :limit="3"
                   :on-success="handleSuccess">
          <el-button type="primary"
                     style="margin-right:5px">点击上传</el-button>

        </el-upload>

        <el-button type="primary"
                   @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>

  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      action: this.$store.state.ip + '/cron/clientUpdateUpload',
      dialogTableVisible: false,
      ruleForm: {
        versionName: '',
        downloadAddr: '',
        md5: '',
        adaptiveSys: '',
        updateType: ''
      },
      rules: {
        versionName: [
          { required: true, message: '请输入版本号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        downloadAddr: [
          { required: true, message: '请先上传版本文件', trigger: 'blur' },
        ],
        md5: [
          { required: true, message: '请先上传版本文件', trigger: 'blur' },
        ]

      }
    }
  },
  methods: {
    handleSuccess (response) {
      console.log(response)
      this.ruleForm.downloadAddr = this.$store.state.ip + "/updateFilePath/" + response.filename
      this.ruleForm.md5 = response.md5
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params = {}
          params = this.ruleForm
          console.log(params)
          this.$http.post("/cron/addClientUpdate", params).then(res => {
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

    }

  }

}
</script>

<style lang="scss">
</style>