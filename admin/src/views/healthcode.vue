<template>
  <div>
    <div class="module">
      <div class="tittle">用户信息列表</div>
      <div class="checkbox">
        <el-input placeholder="请输入身份证号" size="small" v-model="input" />
        <el-button type="primary" size="small" @click="search"> 查询</el-button>
      </div>

      <div class="table" v-loading="loading">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="uid" label="人员ID" > </el-table-column>
          <el-table-column prop="name" label="姓名" > </el-table-column>
          <el-table-column prop="identity_card" label="身份证号" >
          </el-table-column>
          <el-table-column prop="name" label="状态" width="100px">
            <template slot-scope="scope">
              <el-tag type="danger" v-show="scope.row.status==2">红码</el-tag>
              <el-tag type="success" v-show="scope.row.status==0">绿码</el-tag>
              <el-tag type="warning" v-show="scope.row.status==1">黄码</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="管理" width="300px">
            <template>
              <el-button size="small" type="success"  plain @click="changeData(0)">转绿码</el-button>
              <el-button size="small" type="warning"  plain @click="changeData(1)">转黄码</el-button>
              <el-button size="small" type="danger" plain @click="changeData(2)">转红码</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      input: "",
      loading: false,
      tableData: [],
    };
  },
  methods: {
    search() {
      request({
            url: "/health-code/health_code",
            method: "get",
            params: {
              identity_card:this.input
            },
          }).then(res=>{
            console.log(res);
            this.tableData=[res.data]
          })
    },
    changeData(event) {

      request({
            url: "/health-code/transcodingEvents",
            method: "post",
            data: {
              uid: this.tableData[0].uid ,
              event:event
            },
          }).then(res=>{
            this.search()
          })
    },
  },
  
};
</script>

<style scoped>
.checkbox {
  margin: 20px 0;
  display: flex;
}

.checkbox >>> .el-input {
  width: 300px;
  margin-right: 50px;
}
</style>