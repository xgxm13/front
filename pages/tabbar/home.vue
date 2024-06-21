<template>
	<view class="container">
		<van-image
			width="10rem"
			height="10rem"
			fit="contain"
			src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
		/>
		Home
		<!-- <van-button type="primary" plain @click="signUp">注册</van-button> -->
		<!-- <van-button type="success" plain @click="signIn">登录</van-button> -->
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
	</view>
</template>

<script setup>
  const active = ref('home');
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
