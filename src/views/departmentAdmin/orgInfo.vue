<template>
  <el-dialog :title="isEdit ? '编辑' : '新增'"
             :visible.sync="dialogFormVisible"
             width="30%"
             class="popup">
    <el-form ref="orgForm"
             :model="form"
             :rules="rules"
             label-width="100px">
      <el-form-item label="部署点名称"
                    prop="orgName">
        <el-input v-model="form.orgName"></el-input>
      </el-form-item>
      <el-form-item label="部署点编码">
        <el-input type="orgCode"
                  v-model="form.orgCode"></el-input>
      </el-form-item>
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

      <el-form-item label="状态"
                    prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label='1'>正常</el-radio>
          <el-radio :label='0'>冻结</el-radio>
        </el-radio-group>
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
      isEdit: true,
      dialogFormVisible: false,
      form: {
        orgName: '',
        orgCode: '',
        status: 0,
        orgId: '',
      },
      value: '',
      markList: [{ "markId": -1, "markName": "不绑定" }],
      rules: {
        orgName: [
          { required: true, message: '请输入部署点名称', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ],
        orgCode: [
          { required: true, message: '请输入部署点编码', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择部署点状态', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.selectAllMark()
  },
  methods: {
    resetForm () {
      this.$refs.orgForm.resetFields();
    },
    submitForm () {
      this.$refs.orgForm.validate((valid) => {
        if (valid) {
          var pa = this.form
          pa.bindMarkId = this.value
          if (this.isEdit) {
            console.log(this.form)
            this.$http.put("org/updateOrgDto", pa).then(res => {
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
          } else {
            console.log("是增加")
            console.log(this.form)
            this.$http.post("org/addOrg", pa).then(res => {
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

        } else {
          console.log('error submit!!');
          return false;
        }

      })
    },
    selectAllMark () {
      this.$http.get("/mark/selectAllMark").then(res => {
        this.markList = res.data
        this.markList.splice(0, 0, { "markId": -1, "markName": "不绑定" })
      })
    }
  }


}
</script>

<style>
</style>