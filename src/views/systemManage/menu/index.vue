<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 16:45:49
-->
<template>
  <div class="app-container">
    <el-form :inline="true" :model="queryForm" ref="searchFormRef" size="small">
      <el-form-item prop="userName" label="用户名">
        <el-input v-model="queryForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input placeholder="请输入手机号" v-model="queryForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
        <el-button :icon="Refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="tableData"
      size="small"
      :header-cell-class-name="headerStyle"
    >
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="roles" label="角色" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.roles === 'admin'" effect="plain">admin</el-tag>
          <el-tag v-else type="warning" effect="plain">{{ scope.row.roles }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.status" type="success" effect="plain">启用</el-tag>
          <el-tag v-else type="danger" effect="plain">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template #default="scope">
          <el-button type="primary" text size="small" @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button type="danger" text size="small" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <template #empty>
        <img src="@/assets/imgs/notData.png" alt="notData" class="empty-data" />
        <p class="data-desc">暂无数据</p>
      </template>
    </el-table>
    <div class="pager-wrapper">
      <el-pagination
        small
        background
        :layout="paginationData.layout"
        :page-sizes="paginationData.pageSizes"
        :total="paginationData.total"
        :page-size="paginationData.pageSize"
        :currentPage="paginationData.currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from "@/hooks/usePaginations"
import { ElMessage, ElMessageBox, FormInstance } from "element-plus"
import { Search, Refresh } from "@element-plus/icons-vue"

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const searchFormRef = ref<FormInstance | null>(null)
const queryForm = reactive({
  username: "",
  phone: ""
})
const loading = ref<boolean>(false)
const tableData = ref<any[]>([])

const handleSearch = () => {
  if (paginationData.currentPage == 1) {
    getTableData()
  }
  paginationData.currentPage = 1
}
const handleReset = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}
const getTableData = () => {
  // loading.value = true
  // getTable().then((res:any) => {
  //     paginationData.total = res.data.total
  //     tableData.value = res.data.list
  // }).catch(() => {
  //     tableData.value = []
  // }).finally(() => {
  //     loading.value = false
  // })
  tableData.value = [
    {
      createTime: "2010-09-21 13:40:25",
      email: "xxx@163.com",
      id: "710000198710145575",
      phone: "13247447098",
      roles: "admin",
      status: true,
      username: "Susan Thomas"
    },
    {
      createTime: "2010-09-21 13:40:25",
      email: "15615656@qq.com",
      id: "620000197610134768",
      phone: "13117301414",
      roles: "editor",
      status: true,
      username: "Brian Jones"
    }
  ]
}

const handleUpdate = () => {}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`正在删除用户:${row.username},确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    ElMessage.success("删除成功")
  })
}

const headerStyle = () => {
  return "headerStyle"
}
onMounted(() => {
  handleSearch()
})
</script>

