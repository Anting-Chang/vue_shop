<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Menu</el-breadcrumb-item>
      <el-breadcrumb-item>Authority Management</el-breadcrumb-item>
      <el-breadcrumb-item>Rights List</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
        :data="rightsList"
        stripe
        style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="authName"
          label="Name">
        </el-table-column>
        <el-table-column
          prop="path"
          label="Path">
        </el-table-column>
        <el-table-column prop="level" label="Level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'" type="success">First</el-tag>
            <el-tag v-if="scope.row.level === '1'">Second</el-tag>
            <el-tag v-if="scope.row.level === '2'" type="warning">Third</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Rights',
  data () {
    return {
      rightsList: []
    }
  },
  created () {
    this.getRights()
  },
  methods: {
    async getRights () {
      const { data: res } = await this.$http.get('rights/list')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('Access to right list failed!')
      }
      this.rightsList = res.data
    }
  }
}
</script>

<style scoped>

</style>
