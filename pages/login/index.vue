<template>
	<view class="container">
		<van-image
			width="10rem"
			height="10rem"
			fit="contain"
			src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
		/>
		登录
		<!-- <van-button type="primary" plain @click="signUp">注册</van-button> -->
		<!-- <van-button type="success" plain @click="signIn">登录</van-button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
