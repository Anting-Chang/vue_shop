<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Menu</el-breadcrumb-item>
      <el-breadcrumb-item>Role Management</el-breadcrumb-item>
      <el-breadcrumb-item>Role List</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">Add Role</el-button>
        </el-col>
      </el-row>
      <!-- role list area -->
      <el-table :data="roleList" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="Role Name" prop="roleName"> </el-table-column>
        <el-table-column label="Description" prop="roleDesc"> </el-table-column>
        <el-table-column label="Action">
          <template >
<!--            slot-scope="scope"-->
            <el-button type="primary" icon="el-icon-edit">Edit</el-button>
            <el-button type="danger" icon="el-icon-delete">Delete</el-button>
            <el-button type="warning" icon="el-icon-setting">Settings</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Roles',
  data () {
    return {
      roleList: []
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('Get role list failed!')
      }
      this.roleList = res.data
      console.log(this.roleList)
    }
  }
}
</script>

<style scoped></style>
