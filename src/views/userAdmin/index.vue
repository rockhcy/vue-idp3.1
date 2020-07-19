<template>
  <div class="user-center">
    <span style="font-size: 23px">用户管理</span><br>
    <el-row>
      <el-dropdown>
        <el-button type="primary">
          导入用户<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>获取模板</el-dropdown-item>
          <el-dropdown-item>导入用户</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary"
                 @click="adduser()"
                 class="hcy-el-button">添加用户</el-button>
      <el-dropdown split-button
                   type="primary"
                   @command="handleCommand">
        冻结/解冻
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">冻结用户</el-dropdown-item>
          <el-dropdown-item command="1">解冻用户</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary"
                 @click="deleteuser()">删除用户</el-button>
      <div class="grid-content bg-purple">
        <el-input placeholder="请输入内容"
                  v-model="search_key"
                  class="input-with-select">
          <el-button slot="append"
                     @click="getUserList"
                     type="success">Go</el-button>
        </el-input>
      </div>
    </el-row>
    <el-row>
      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column prop="userId"
                         label="#"
                         type="selection"
                         width="55">
        </el-table-column>
        <el-table-column prop="username"
                         label="用户名"
                         width="180">
        </el-table-column>
        <el-table-column prop="loginname"
                         label="登录名"
                         width="180">
        </el-table-column>
        <el-table-column prop="phone"
                         label="联系方式">
        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱">
        </el-table-column>
        <el-table-column prop="status"
                         label="用户状态"
                         width="100"
                         :filters="[{ text: '正常', value: 1 }, { text: '冻结', value: 0 }]"
                         :filter-method="filterTag"
                         filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'primary' : 'success'"
                    disable-transitions>{{scope.row.status === 1 ? '冻结' : '正常'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="creater"
                         label="创建人">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="prev, pager, next"
                     :total=totalNum
                     :current-page=currentPage
                     @current-change="handleCurrentChange"
                     @prev-click="handlePrevClick"
                     @next-click="handlerNextClick">
      </el-pagination>
    </el-row>
    <!-- 模态框 -->
    <UserInfo ref="editUser"></UserInfo>
  </div>
</template>

<script>
// import analogData from '../../analogData.js'
import UserInfo from './userInfo';
export default {
  components: {
    UserInfo
  },
  data () {
    return {
      isEdit: false,
      fromTitle: "",
      tableData: [],
      multipleSelection: [],
      search_key: '',
      dialogFormVisible: false,
      totalNum: 0,
      currentPage: 1

    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log("选中行")
      console.log(val)
    },
    deleteuser () {
      console.log("选中行")
      console.log(this.multipleSelection)
      if (this.multipleSelection.length == 0) {
        this.$notify.error({
          title: 'err',
          message: '请先选择要操作的数据列',
        });
        return;
      }

      var params = [];
      for (var i in this.multipleSelection) {
        console.log(this.multipleSelection[i])
        params.push(this.multipleSelection[i].userId)
      }
      console.log(params)
      this.$http.delete("/user/deleteUserById", { data: params }).then(res => {
        if (res.status == 200) {
          this.$notify({
            title: 'success',
            message: '删除用户成功',
            type: 'success'
          });
          this.getUserList()
        } else {
          this.$notify.error({
            title: 'err',
            message: '未知错误！',
          });
        }
      })
    },
    filterTag (value, row) {
      return row.status === value;
    },
    filterHandler (value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    handleEdit (index, row) {
      console.log(index, row);
      this.$http.get("/user/selectUserDtoById", { params: { userId: row.userId } }).then(res => {
        console.log(res.data)
        this.$router.push('/userAdmin/adduser')
        this.$refs.editUser.dialogFormVisible = true
        // 暂时只取第一个角色，因为客户不能接受多角色设定
        res.data.roleId = res.data.roles[0].authority.substr(5)
        console.log(3, res.data.status)
        var params = {}
        params.loginname = res.data.loginname
        params.password = res.data.password
        params.email = res.data.email
        params.icon = res.data.icon
        params.status = res.data.status
        params.roleId = res.data.roles[0].authority.substr(5)
        // params.roleList = res.data.roles[0].authority.substr(5)
        params.username = res.data.username
        params.phone = res.data.phone
        params.userId = res.data.userId
        console.log(params)


        this.$refs.editUser.form = params
        this.$refs.editUser.imageUrl = this.$store.state.ip + "/userIcon/" + res.data.icon

      });
    },
    handleDelete (index, row) {
      console.log(index, row);
      var params = []
      params.push(row.userId)
      this.$http.delete("/user/deleteUserById", { data: params }).then(res => {
        if (res.status == 200) {
          this.$notify({
            title: 'success',
            message: '删除用户成功',
            type: 'success'
          });
          this.getUserList()
        }
      })

    },
    adduser () {
      this.$refs.editUser.isEdit = false
      this.$refs.editUser.dialogFormVisible = true
      this.fromTitle = "添加用户"
      this.$router.push('/userAdmin/adduser')
    },
    getUserList () {
      var params = {};
      params.loginname = this.search_key;
      params.current = this.currentPage
      params.size = 10;
      this.$http.get("user/selectAllUser", { params: params }).then(res => {
        if (res.status == 200) {
          console.log("res.data", res.data)
          this.tableData = res.data.records
          this.totalNum = res.data.total
        }
      })
    },
    handleCurrentChange (val) {
      console.log("page:", val)
      this.currentPage = val
      this.getUserList()
    },
    handlePrevClick (val) {
      console.log("page:", val)
      this.currentPage = val
      this.getUserList()
    },
    handlerNextClick (val) {
      console.log("page:", val)
      this.currentPage = val
      this.getUserList()
    },
    handleCommand (status) {
      console.log(status)
      if (this.multipleSelection.length == 0) {
        this.$notify.error({
          title: 'err',
          message: '请先选择要操作的数据列!',
        });
        return
      }

      var userIds = []
      for (var i in this.multipleSelection) {
        userIds.push(this.multipleSelection[i].userId)
      }

      var params = {}
      params.userIds = userIds
      params.status = status
      this.$http.put("/user/updateUserStatus", params).then(res => {
        if (res.status == 200) {
          console.log("res.data", res.data)
          this.getUserList()
        }
      })
    }

  }
}
</script>

<style lang="scss">
.user-center {
  margin: 7px;
}
.hcy-el-button {
  margin-left: 10px;
}
.el-dropdown {
  margin: 10px;
}
.grid-content {
  width: 300px;
}
</style>