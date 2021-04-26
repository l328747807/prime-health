<template>
  <div class="main">
    <!-- header -->
    <div class="top">
      <div class="wrap">
        <div class="logo">演示科研平台</div>
        <div class="settingWrap">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">我的项目</el-menu-item>
            <el-submenu index="2">
              <template slot="title"
                ><el-avatar :size="22" :src="circleUrl"></el-avatar
                >&nbsp;&nbsp;测试账号</template
              >
              <el-menu-item index="2-1">登出</el-menu-item>
              <el-menu-item index="2-2">修改密码</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">消息中心</el-menu-item>
            <el-menu-item index="4">新科研</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <!-- end header -->

    <div class="bottom">
      <div class="content">
        <div class="box">
          <div class="searchBox">
            <el-input
              placeholder="请输入内容"
              v-model="keyword"
              class="input-with-select"
            >
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="病案号" value="onlyId"></el-option>
                <el-option label="患者姓名" value="patientName"></el-option>
                <el-option label="性别" value="sexName"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="search"
                >搜索</el-button
              >
            </el-input>
          </div>
        </div>
        <div class="table_wrap">
          <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人">
              <el-input
                v-model="formInline.user"
                placeholder="审批人"
              ></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form> -->
          <el-table :data="tableData" border style="width: 100%" height="700px">
            <el-table-column prop="patientName" label="患者姓名" width="120">
            </el-table-column>
            <el-table-column fixed prop="birthday" label="出生日期" width="150">
            </el-table-column>
            <el-table-column prop="sexName" label="性别" width="70">
            </el-table-column>
            <el-table-column
              prop="documentTypeName"
              label="证件类型"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="idNumber" label="证件号码" width="200">
            </el-table-column>
            <el-table-column prop="mrId" label="病案号" width="120">
            </el-table-column>
            <el-table-column prop="visitNumber" label="住院次数" width="100">
            </el-table-column>
            <el-table-column
              prop="inHospitalDateTime"
              label="入院日期"
              width="150"
            >
            </el-table-column>
            <el-table-column prop="inDeptName" label="入院科室" width="120">
            </el-table-column>
            <el-table-column
              prop="outHospitalDateTime"
              label="出院日期"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="outDeptName" label="出院科室" width="120">
            </el-table-column>
            <el-table-column
              prop="outHospitalTypeName"
              label="离院方式"
              width="100"
            >
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalItems"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title="详细信息"
      :visible.sync="showDialog"
      width="600px"
      custom-class="medicalRecordInfo"
      lock-scroll
      center
    >
      <el-form
        ref="form"
        :model="medicalRecordInfo"
        label-width="200px"
        size="mini"
      >
        <el-form-item label="姓名：">
          <span>{{ medicalRecordInfo.patientName }}</span>
        </el-form-item>
        <el-form-item label="性别：">
          <span>{{ medicalRecordInfo.sexCode === 1 ? "男" : "女" }}</span>
        </el-form-item>
        <el-form-item label="出生日期：">
          <span>{{ medicalRecordInfo.birthday }}</span>
        </el-form-item>
        <el-form-item label="年龄（岁）：">
          <span>{{ medicalRecordInfo.yearOfAge }}</span>
        </el-form-item>
        <el-form-item label="病案号：">
          <span>{{ medicalRecordInfo.mrId }}</span>
        </el-form-item>
        <el-form-item label="住院次数：">
          <span>{{ medicalRecordInfo.visitNumber }}</span>
        </el-form-item>
        <el-form-item label="医疗保险手册（卡）号:">
          <span>{{ medicalRecordInfo.medicalInsuranceNumber }}</span>
        </el-form-item>
        <el-form-item label="健康卡号:">
          <span>{{ medicalRecordInfo.medicalHealthNumber }}</span>
        </el-form-item>
        <el-form-item label="医疗付费方式:">
          <span>{{ medicalRecordInfo.medicalPayTypeCode }}</span>
        </el-form-item>
        <el-form-item label="医疗机构代码:">
          <span>{{ medicalRecordInfo.orgCode }}</span>
        </el-form-item>
        <el-form-item label="机构名称:">
          <span>{{ medicalRecordInfo.orgName }}</span>
        </el-form-item>
        <el-form-item label="出生省份:">
          <span>{{ medicalRecordInfo.provinceNameOfBirthAddress }}</span>
        </el-form-item>
        <el-form-item label="出生地市:">
          <span>{{ medicalRecordInfo.cityNameOfBirthAddress }}</span>
        </el-form-item>
        <el-form-item label="出生地县:">
          <span>{{ medicalRecordInfo.countyNameOfBirthAddress }}</span>
        </el-form-item>
        <el-form-item label="民族:">
          <span>{{ medicalRecordInfo.nationCode }}</span>
        </el-form-item>
        <el-form-item label="国籍:">
          <span>{{ medicalRecordInfo.nationalityCode }}</span>
        </el-form-item>
        <el-form-item label="身份证号:">
          <span>{{ medicalRecordInfo.idNumber }}</span>
        </el-form-item>
        <el-form-item label="现住址:">
          <span>{{ medicalRecordInfo.permanentAddress }}</span>
        </el-form-item>
        <el-form-item label="现住址电话:">
          <span>{{ medicalRecordInfo.permanentAddressPhone }}</span>
        </el-form-item>
        <el-form-item label="现住址邮政编码">
          <span>{{ medicalRecordInfo.permanentAddressPostCode }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      keyword: "",
      select: "",
      diseaseList: [], //这个值是需要匹配的值
      disease: "", //这个值是用户正在输入的值
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      totalItems: 0,
      showDialog: false,
      medicalRecordInfo: [], //病案列表
    };
  },
  async mounted() {
    let params = {
      pageNo: this.pageNo,
      pageSize: this.pageSize,
    };
    let res = await this.$get("/medicalRecordInfo/infoList", params);
    if (res.code === 0) {
      this.tableData = res.data.list;
      this.totalItems = res.data.rowCount;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    onSubmit() {
      console.log("submit!");
    },
    async handleClick(row) {
      let res = await this.$get("/medicalRecordInfo/pageIndex", {
        onlyId: row.onlyId,
      });
      if (res.code === 0) {
        this.medicalRecordInfo = res.data;
        this.showDialog = true;
      }
    },

    /* fetch-suggestions 是一个返回输入建议的方法属性，在该方法中你可以在输入建议数据准备好时通过 cb(data) 返回到 autocomplete 组件中. */
    querySearch(queryString, cb) {
      const diseaseList = this.diseaseList;
      const results = queryString
        ? diseaseList.filter(this.createFilter(queryString))
        : diseaseList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (disease) => {
        return (
          disease.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1 // 改为===0 就是筛选的数据只是首字匹配的列表项，需要包含输入字的所有列表项改为！==-1
        );
      };
    },
    /* 跳转并传值 */
    handleSelect(item) {
      if (this.$route.path === "/clinicalAnalysis") {
        this.$router.push({
          path: "/effectAnalysis",
          query: { keyword: this.disease, id: item.id },
        });
      }
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    async search() {
      // if (!this.keyword) {
      //   this.$message.warning("请输入您要搜索疾病的信息");
      //   return;
      // }
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sexName: "男性",
      };
      let res = await this.$get("/medicalRecordInfo/infoList", params);
      if (res.code === 0) {
        this.tableData = res.data.list;
        this.totalItems = res.data.rowCount;
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.search();
    },
  },
};
</script>

<style scoped lang="less">
.main {
  width: 100vw;
  height: 100%;
  position: relative;
  .top {
    width: 100vw;
    height: 60px;
    background: #00a0e9;
    .wrap {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .logo {
        text-align: center;
        color: #fff;
        height: 60px;
        line-height: 60px;
      }
      .settingWrap {
        .el-menu {
          background-color: transparent;
          .el-menu-item {
            color: #fff;
            &:active {
              background-color: transparent;
            }
            &:hover {
              background-color: transparent;
            }
          }
          .is-active {
            background-color: transparent;
          }
          .el-submenu {
            color: #fff;
            /deep/.el-submenu__title {
              background-color: transparent;
              color: #fff;
              i {
                color: #fff;
              }
            }
            &:active {
              background-color: transparent;
              color: #fff;
            }
            &:hover {
              background-color: transparent;
              color: #fff;
            }
            span {
              color: #fff !important;
            }
          }
        }
      }
    }
  }
  .bottom {
    position: absolute;
    width: 100%;
    top: 100px;
    bottom: 0;
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .box {
        margin: 0 auto;
        padding-top: 10px;
        height: 50px;
        width: 100%;
        .searchBox {
          margin: 0 auto;
          width: 60%;
          position: relative;
        }
      }
      .table_wrap {
        margin: 0 auto;
        padding: 10px;
      }
    }
  }
  // /deep/.el-dialog-div {
  //   height: 60vh;
  //   overflow: auto;
  // }
}
</style>
