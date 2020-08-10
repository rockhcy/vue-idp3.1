<template>
  <el-dialog :title="isEdit ? '编辑' : '新增'"
             :visible.sync="dialogFormVisible"
             width="30%"
             class="popup">
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="80px">
      <el-form-item label="登录名"
                    prop="loginname">
        <el-input v-model="form.loginname"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password"
                  v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="昵称"
                    prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号"
                    prop="phone">
        <el-input v-model="form.phone">
        </el-input>
      </el-form-item>
      <el-form-item label="角色"
                    prop="roleId">
        <el-radio-group v-model="form.roleId">
          <el-radio label="ROOT">ROOT</el-radio>
          <el-radio label="ADMIN">管理员</el-radio>
          <el-radio label="USER">用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账户状态"
                    prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label=1>正常</el-radio>
          <el-radio label=0>冻结</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户头像">
        <!-- 在action中写入文件上传的url -->
        <el-upload class="avatar-uploader"
                   :action="userIconUploadAddr"
                   name="icon"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload"
                   :on-error="uploadErr">
          <img v-if="imageUrl"
               :src="imageUrl"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      isEdit: true,
      userIconUploadAddr: this.$store.state.ip + '/user/userIconUpload',
      dialogFormVisible: false,
      form: {
        loginname: '',
        password: '',
        username: '',
        email: '',
        phone: "",
        roleId: '',
        status: 1,
        icon: '',
        userId: ''
      },
      formLabelWidth: '120px',
      imageUrl: '',
      rules: {
        loginname: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择用户状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    //头像上传成功的钩子
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res, res.data)
      this.form.icon = res
    },
    //头像上传失败的钩子
    uploadErr (err, file) {
      console.log(err, file)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.form.roleList = [this.form.roleId]
            this.$http.post("/user/updateUser", this.form).then(res => {
              if (res.status == 200) {
                this.$notify({
                  title: '成功',
                  message: "操作成功",
                  type: 'success'
                });
                this.dialogFormVisible = false
                location.reload();

              } else {
                console.log('error submit!!');
                return false;
              }
            })
          } else {
            var params = {}
            params.loginname = this.form.loginname
            params.password = this.form.password
            params.email = this.form.email
            params.icon = this.form.icon
            params.status = this.form.status
            params.roleList = [this.form.roleId]
            params.username = this.form.username
            params.phone = this.form.phone
            this.$http.post("/user/addUser", params).then(res => {
              if (res.status == 200) {
                this.$notify({
                  title: '成功',
                  message: "操作成功",
                  type: 'success'
                });
                this.dialogFormVisible = false
                this.$refs.form.resetFields();
                location.reload();
              } else {
                console.log('error submit!!');
                return false;
              }
            })

          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    resetForm () {
      this.$refs.form.resetFields();
    },
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>