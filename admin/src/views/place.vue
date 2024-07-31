<template>
  <div>
    <div class="module">
      <div class="tittle">新建场所码</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <div class="form">
          <el-form-item label="" prop="identity_card">
            <el-input
            @
              size="small"
              v-model.number="value"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              v-model="ruleForm.identity_card"
              placeholder="请输入负责人身份证号"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="district_index">
            <el-select
              v-model="ruleForm.district_index"
              placeholder="请选择行政区"
              size="small"
              @change="changedistrict"
            >
              <el-option
                v-for="(item, i) in district"
                :key="item.code"
                :label="item.name"
                :value="i"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="community_index">
            <el-select
              v-model="ruleForm.community_index"
              placeholder="请选择社区"
              size="small"
            >
              <el-option
                v-for="(item, i) in community"
                :key="item.code"
                :label="item.name"
                :value="i"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="name">
            <el-input
              size="small"
              v-model="ruleForm.name"
              placeholder="请输入场所名"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="street_index">
            <el-select
              v-model="ruleForm.street_index"
              placeholder="请选择街道"
              size="small"
              @change="changestreet"
            >
              <el-option
                v-for="(item, i) in street"
                :key="item.code"
                :label="item.name"
                :value="i"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="address">
            <el-input
              size="small"
              v-model="ruleForm.address"
              placeholder="请输入地址"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <el-button type="primary" size="small" @click="submit('ruleForm')"
        >添加</el-button
      >
    </div>
    <div class="module">
      <div class="tittle">场所码列表</div>
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
          v-loading="reverseloading"
        >
          <el-table-column prop="pid" label="场所ID" width="200">
          </el-table-column>
          <el-table-column prop="name" label="场所名" width="120">
          </el-table-column>
          <el-table-column prop="identity_card" label="身份证号" width="200">
            
          </el-table-column>
          <el-table-column prop="district" label="行政区" width="120">
            <template slot-scope="scope">
              {{scope.row.district || scope.row.district_id}}
            </template>
          </el-table-column>
          <el-table-column prop="street" label="街道" width="120">
            <template slot-scope="scope">
              {{scope.row.street || scope.row.street_id}}
            </template>
          </el-table-column>
          <el-table-column prop="community" label="社区">
            <template slot-scope="scope">
              {{scope.row.community || scope.row.community_id}}
            </template> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column prop="address" label="关停/开启" width="120">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#47C93A"
                inactive-color="#FF4957"
                @click.native.prevent="changeData(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import * as villages from "@/utils/villages";
export default {
  data() {
    return {
      reverseloading: "",
      value: "",
      rules: {
        identity_card: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { min: 18, max: 18, message: "请输入正确身份证号", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入场所名", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        district_index: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        street_index: [{ required: true, message: "请选择", trigger: "blur" }],
        community_index: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
      },
      district: [],
      street: [],
      community: [],
      ruleForm: {
        identity_card: "",
        name: "",
        district_id: "",
        street_id: "",
        community_id: "",
        district_index: "",
        street_index: "",
        community_index: "",
        address: "",
      },
      tableData: [],
    };
  },
  methods: {
    setSelect(district_index, street_index, community_index) {
      console.log(district_index, street_index, community_index);
      this.ruleForm.district_index = district_index;
      this.ruleForm.street_index = street_index;
      this.ruleForm.community_index = community_index;
      this.district = villages.children;
      this.street = this.district[district_index].children;
      this.community = this.street[street_index].children;
      this.ruleForm.district_id = Number(this.district[district_index].code);
      this.ruleForm.street_id = Number(this.street[street_index].code);
      this.ruleForm.community_id = Number(this.community[community_index].code);
    },
    changedistrict() {
      this.setSelect(this.ruleForm.district_index, 0, 0);
    },
    changestreet() {
      this.setSelect(
        this.ruleForm.district_index,
        this.ruleForm.street_index,
        0
      );
    },
    submit(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request({
            url: "/place-code/placeCode",
            method: "post",
            data: {
              identity_card: this.ruleForm.identity_card,
              name: this.ruleForm.name,
              address: this.ruleForm.address,
              district_id: this.ruleForm.district_id,
              street_id: this.ruleForm.street_id,
              community_id: this.ruleForm.community_id,
            },
          })
            .then((res) => {
              if (res.code == 200) this.getData();
            })
            .catch((res) => {
              console.log(res);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getData() {
      this.reverseloading = true;
      request({
        url: "/place-code/placeCode",
        method: "get",
      })
        .then((res) => {
          this.reverseloading = false;
          this.tableData = res.data;
          res.data.forEach(item=>this.mapName(item))
          
          console.log(res.data);
        })
        .catch((res) => {
          this.reverseloading = false;
        });
    },
    mapName(item){
      this.district.forEach(district=>{
        if(district.code == item.district_id)
        {
          item.district = district.name
          district.children.forEach(street=>{
            if(street.code == item.street_id)
              item.street = street.name
              street.children.forEach(community=>{
                if(community.code == item.community_id)
                  item.community = community.name
              })
              
          })
        }
      })
    },
    changeData(row) {
      this.reverseloading = true;
      request({
        url: "/place-code/place_code_opposite",
        method: "patch",
        data: {
          pid: row.pid,
          // status:Number(row.status)
        },
      })
        .then((res) => {
          this.reverseloading = false;
          this.getData();
        })
        .catch((res) => {
          this.reverseloading = false;
          this.getData();
        });
    },
  },
  created() {
    this.setSelect(0, 0, 0);
    this.getData();
  },
};
</script>

<style scoped>
.table {
  margin: 20px 0;
}
.form {
  display: flex;
  justify-content: left;
  width: 900px;
  flex-wrap: wrap;

  /* float: left; */
}
.form >>> .el-input {
  width: 200px;
  margin-right: 50px;
  margin-top: 20px;
}
* >>> .el-button {
  position: absolute;
  bottom: 20px;
  left: 780px;
}
</style>