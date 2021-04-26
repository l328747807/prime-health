<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
 *{
   margin:0;
   padding: 0;
   list-style: none;
   outline: none;
   text-decoration: none;
 }
 .flex{
   display: flex;
 }
 .j-c{
   justify-content: center;
 }
 .j-s{
   justify-content: space-between;
 }
 .a-c{
   align-content: center;
 }
 #app{
   width: 100%;
   height:100%;
 }
 /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
	width: 8px;
	height: 8px;
	background-color: #F5F5F5;
}
 
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
	border-radius: 5px;
	background-color: #F5F5F5;
}
 
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
	border-radius: 5px;
	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,.3);
	background-color: #ccc;
}
</style>
