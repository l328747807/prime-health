<template>
  <div class="main">
    <!-- header -->
    <div class="top">
      <div class="wrap">
        <div class="logo"></div>
        <div class="settingWrap"></div>
      </div>
    </div>
    <!-- end header -->

    <div class="bottom">
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped lang="less">
.main {
  width: 100vw;
  height: 100vh;
  .top {
    width: 100vw;
    height: 60px;
    .wrap {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .logo {
        width: 70px;
        height: 60px;
        text-align: center;
        background: #ccc;
        padding: 10px 0;
        margin: 0 auto;
      }
    }
  }
}
</style>
