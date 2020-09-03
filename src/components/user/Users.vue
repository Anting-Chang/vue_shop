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
    <el-dialog title="Create Account" :visible.sync="createAccountDialogVisible" width="30%" :before-close="handleClose">
      <!-- Dialog main content -->
      <el-form :model="createAccountForm" status-icon :rules="createAccountRules" ref="createAccountForm">
        <el-form-item label="Username" prop="username">
          <el-input v-model="createAccountForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="createAccountForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="createAccountForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number" prop="mobile">
          <el-input v-model="createAccountForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- Dialog footer -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="createAccountDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addUser">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- Edit user dialog -->
    <el-dialog title="Edit Account" :visible.sync="editAccountDialogVisible" width="30%" :before-close="handleClose">
      <!-- Dialog main content -->
      <el-form :model="editAccountForm" status-icon :rules="editAccountRules" ref="editAccountForm">
        <el-form-item label="Username">
          <el-input v-model="editAccountName" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="editAccountForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number" prop="mobile">
          <el-input v-model="editAccountForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- Dialog footer -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAccountDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitEditUser">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data: function () {
    const email = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Email is required'))
      }
      const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (emailReg.test(value)) {
        return callback()
      } else {
        return callback(new Error('Please enter a valid email address'))
      }
    }
    const mobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Phone number is required'))
      }
      const phoneReg = /^[0-9]+$/
      if (phoneReg.test(value)) {
        return callback()
      } else {
        return callback(new Error('Please enter only numbers'))
      }
    }
    return {
      editAccountForm: {
        email: '',
        mobile: ''
      },
      editAccountName: '',
      editAccountId: '',
      createAccountForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editAccountRules: {
        email: [
          {
            validator: email,
            required: true,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            validator: mobile,
            required: true,
            trigger: 'blur'
          }
        ]
      },
      createAccountRules: {
        username: [
          {
            required: true,
            message: 'Please enter a username',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: 'Username must have a length between 3 and 15',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please enter a password',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: 'Password must have a length between 3 and 10',
            trigger: 'blur'
          }
        ],
        email: [
          {
            validator: email,
            required: true,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            validator: mobile,
            required: true,
            trigger: 'blur'
          }
        ]
      },
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 7
      },
      userList: [],
      total: '',
      createAccountDialogVisible: false,
      editAccountDialogVisible: false
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
    addUser () {
      this.$refs.createAccountForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.createAccountForm)
        if (res.meta.status !== 201) {
          this.$message.error('Create account failed!')
        } else {
          this.$message.success('Create account success!')
          this.createAccountDialogVisible = false
          this.getUserList()
        }
      })
    },
    async editUser (index, row) {
      const { data: res } = await this.$http.get('users/' + row.id)
      if (res.meta.status !== 200) {
        this.$message.error('Fail to show account!')
        return
      }
      this.editAccountName = res.data.username
      this.editAccountForm.email = res.data.email
      this.editAccountForm.mobile = res.data.mobile
      this.editAccountId = res.data.id
      this.editAccountDialogVisible = true
    },
    submitEditUser () {
      this.$refs.editAccountForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('users/' + this.editAccountId, this.editAccountForm)
        console.log(res.data)
        if (res.meta.status !== 200) {
          this.$message.error('Edit account failed!')
          return
        }
        this.$message.success('Edit account success!')
        this.editAccountDialogVisible = false
      })
    },
    deleteUser (index, row) {
      this.$confirm('This action will permanently delete this account!', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete('users/' + row.id)
        if (res.meta.status !== 200) {
          this.$message.error('Delete user failed!')
          return
        }
        this.$message({
          type: 'success',
          message: 'Account successfully deleted.'
        })
        this.getUserList()
      }).catch(() => {
        this.$message.info('Delete cancelled.')
      })
    },
    editRole (index, row) {
      console.log('edit role clicked', index, row)
    }
  }
}
</script>

<style lang="less" scoped></style>
