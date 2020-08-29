<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="dialogVisible = true">Create Account</el-button>
        </el-col>
        <el-table
          :data="userList"
          style="width: 100%">
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column prop="username" label="Name"></el-table-column>
          <el-table-column prop="email" label="Email"></el-table-column>
          <el-table-column prop="mobile" label="Tel"></el-table-column>
          <el-table-column prop="role_name" label="Role"></el-table-column>
          <el-table-column prop="mg_state" label="Status">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="userStateChange(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-edit" type="primary" @click="editUser(scope.$index, scope.row)"></el-button>
              <el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteUser(scope.$index, scope.row)"></el-button>
              <el-tooltip class="item" effect="dark" content="Edit Role" :enterable="false" placement="top">
                <el-button size="mini" icon="el-icon-share" type="warning" @click="editRole(scope.$index, scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <!-- Add user dialog -->
    <el-dialog title="Create Account" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <!-- Dialog main content -->
      <el-form :model="createAccountForm" status-icon :rules="createAccountRules">
        <el-form-item label="Username" prop="username">
          <el-input v-model="createAccountForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="createAccountForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model.number="createAccountForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number" prop="phoneNumber">
          <el-input v-model="createAccountForm.phoneNumber" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- Dialog footer -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data () {
    // eslint-disable-next-line no-unused-vars
    var email = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      console.log(value)
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      createAccountForm: {
        username: '',
        password: '',
        email: '',
        phoneNumber: ''
      },
      createAccountRules: {
        username: [
          { required: true, message: 'Please enter a username', trigger: 'blur' },
          { min: 3, max: 15, message: 'Username must have a length between 3 and 15', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter a password', trigger: 'blur' },
          { min: 3, max: 10, message: 'Password must have a length between 3 and 10', trigger: 'blur' }
        ],
        email: [
          { validator: email, trigger: 'blur' },
          { required: true, message: 'Please enter a username', trigger: 'blur' }
        ]
      },
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: '',
      dialogVisible: false
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('Get user Info failed!')
      }
      this.userList = res.data.users
      this.total = res.data.total
      console.log(res)
    },
    userStateChange (userInfo) {
      this.$confirm('This action will changed the status of this user', 'Notice', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
        if (res.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state
          return this.$message({ type: 'error', message: 'Error happened, Please try again' })
        }
        this.$message({
          type: 'success',
          message: 'Successful'
        })
      }).catch(() => {
        userInfo.mg_state = !userInfo.mg_state
        this.$message({
          type: 'info',
          message: 'Edit Cancelled'
        })
      })
      console.log(userInfo)
    },
    handleClose (done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      done()
      //   })
      //   .catch(_ => {})
    },
    editUser (index, row) {
      console.log('edit user clicked', index, row)
    },
    deleteUser (index, row) {
      console.log('delete user clicked', index, row)
    },
    editRole (index, row) {
      console.log('edit role clicked', index, row)
    }
  }
}
</script>

<style lang="less" scoped></style>
