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
      </div>
    </div>
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
    };
  },
  mounted() {
    // getDiseaseMainSetting().then((res) => {
    //   if (res.code === 200) {
    //     res.data.forEach((item) => {
    //       this.diseaseList.push({
    //         id: item.icdMainId,
    //         value: item.icdMainName,
    //       });
    //     });
    //   }
    // });
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
    search() {
      if (!this.keyword) {
        this.$message.warning("请输入您要搜索疾病的名称");
        return;
      }
      this.$router.push({ path: "/report" });
      /* 跳转并传值 */
      // if (this.$route.path === "/clinicalAnalysis") {
      //   let diseaseMess = [];
      //   this.diseaseList.forEach((item, index) => {
      //     if (this.disease === item.value) {
      //       diseaseMess.push(item.value);
      //       this.$router.push({
      //         path: "/effectAnalysis",
      //         query: { keyword: this.disease, id: item.id },
      //       });
      //     }
      //   });
      //   // 判断一下，如果该长度为0的话，那就证明输入的内容和列表的内容不一样。
      //   if (diseaseMess.length === 0) {
      //     this.$message.warning("未配置“" + this.disease + "”该病种");
      //   }
      // } else {
      //   let keywords = [];
      //   let errorMess = [];
      //   this.diseaseList.forEach((item) => {
      //     if (this.disease === item.value) {
      //       errorMess.push(item.value);
      //       keywords.push({
      //         name: item.value,
      //         id: item.id,
      //       });
      //     }
      //   });
      //   if (errorMess.length === 0) {
      //     this.$message.warning("未配置“" + this.disease + "”该病种");
      //   }
      //   this.$emit("keywords", keywords);
      // }
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
    top: 400px;
    bottom: 0;
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .box {
        margin: 0 auto;
        padding-top: 80px;
        height: 50px;
        width: 100%;
        .searchBox {
          margin: 0 auto;
          width: 60%;
          position: relative;
          .el-select .el-input {
            width: 130px;
          }
          .input-with-select .el-input-group__prepend {
            background-color: #fff;
          }
        }
      }
    }
  }
}
</style>
