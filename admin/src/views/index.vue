<template>
  <div>
    <div class="module">
      <div class="tittle">核酸检测统计</div>
      <div class="checkbox">
        <span>请选择开始时间</span>
        <el-date-picker
          v-model="detectTime.start"
          size="small"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <span>请选择截止时间</span>

        <el-date-picker
          v-model="detectTime.end"
          size="small"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-button type="primary" size="small" @click="getDetect()"
          >查询</el-button
        >
      </div>

      <div class="board">
        <el-container v-loading="detectloading">
          <div class="item">
            <div class="num">{{ detect.record }}</div>
            <div class="text">核酸检测参与记录数</div>
          </div>
          <div class="item">
            <div class="num">{{ detect.uncheck }}</div>
            <div class="text">未出结果记录数</div>
          </div>
          <div class="item">
            <div class="num">{{ detect.onePositive }}</div>
            <div class="text">单管阳性结果数</div>
          </div>
          <div class="item">
            <div class="num">{{ detect.positive }}</div>
            <div class="text">混管阳性结果数</div>
          </div>
        </el-container>
      </div>
    </div>

    <div class="module">
      <div class="tittle">阳性人员信息统计</div>
      <div class="checkbox">
        <span>请选择开始时间</span>
        <el-date-picker
          v-model="positiveTime.start"
          size="small"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
        <span>请选择截止时间</span>

        <el-date-picker
          v-model="positiveTime.end"
          size="small"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
        <el-button type="primary" size="small" @click="getPositive">查询</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" v-loading = positiveloading>
        <el-table-column prop="tubeid" label="试管ID" width="80">
        </el-table-column>
        <el-table-column prop="kind" label="试管种类" width="80">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="80"
          >
        </el-table-column>
        <el-table-column prop="phone_number" label="手机" width="120"
          >
        </el-table-column>
        <el-table-column prop="identity_card" label="身份证号" width="180">
          </el-table-column
        >
        <el-table-column prop="district_id" label="行政区" width="80"
          >
        </el-table-column>
        <el-table-column prop="street_id" label="街道" width="80"
          >
        </el-table-column>
        <el-table-column prop="community_id" label="社区" width="80">
          </el-table-column
        >
        <el-table-column prop="address" label="地址">
          </el-table-column
        >
        <el-table-column prop="test_address" label="检测地址" width="120"
          >
        </el-table-column>
        <el-table-column prop="testing_organization" label="检测机构" width="120">
          </el-table-column
        >
        <el-table-column prop="created_at" label="检测时间" width="120">
          </el-table-column
        >
        <el-table-column prop="result" label="检测结果" width="80">
          </el-table-column
        >
      </el-table>
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10000"
      >
      </el-pagination> -->
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      detectloading: false,
      positiveloading:false,
      detect: {},
      value1: "",
      detectTime: {
        start: "",
        end: "",
      },
      positiveTime: {
        start: "",
        end: "",
      },
      tableData: [],
    };
  },
  methods: {
    getDetect() {
      // console.log(this.detectTime);
      if(!this.detectTime.start || !this.detectTime.end) return
      this.detectloading = true;
      request({
        url: "/nucleic-acids/getNucleicAcidTestInfo",
        method: "get",
        params: {
          start_time: this.detectTime.start,
          end_time: this.detectTime.end,
        },
      }).then((res) => {
        this.detectloading = false;
        this.detect = res.data;
      }).catch(()=>{
        this.detectloading = false;
      })
    },
    getPositive() {
      // console.log(this.detectTime);
      if(!this.positiveTime.start || !this.positiveTime.end) return
      this.positiveloading = true;
      request({
        url: "/nucleic-acids/getPositiveInfo",
        method: "get",
        params: {
          start_time: this.positiveTime.start,
          end_time: this.positiveTime.end,
        },
      }).then((res) => {
        this.positiveloading = false;
        this.tableData = res.data;
      }).catch(()=>{
        this.positiveloading = false;
      })
    },
  },
};
</script>

<style scoped>
.checkbox {
  margin: 20px 0;
}
.board {
  background-color: #f7faff;
  padding: 24px 0px;
  margin-top: 16px;
  display: flex;
  justify-content: center;
}
.board .item {
  flex: 1;
  text-align: center;
}
.board .item .num {
  opacity: 1;

  /** 文本1 */
  font-size: 14px;
  font-weight: 700;
  line-height: 23.44px;
  color: rgba(32, 32, 32, 1);
}
.board .item .text {
  opacity: 0.6;
  /** 文本1 */
  font-size: 12px;
  font-weight: 400;
  line-height: 16.41px;
  color: rgba(32, 32, 32, 1);
}
.checkbox span {
  color: #202020;
  opacity: 0.6;
  font-size: 12px;
  font-weight: 400;
  margin-right: 21px;
}
* >>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  margin-right: 50px;
}
</style>