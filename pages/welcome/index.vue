<template>
  <view class="container">
    
    <van-image
      width="100%"
      height="10rem"
      fit="contain"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />
    <view class="flex-btns">
      <van-button type="primary" plain @click="register">注册</van-button>
      <van-button type="success" plain @click="login">登录</van-button>
    </view>

    <view class="welcome">
      <text>欢迎访问~~</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
/**
 * @description: 跳转注册页面
 * @return {*}
 */
const register = () => {
  uni.navigateTo({
    url: '/pages/register/index',
  });
};
/**
 * @description: 跳转登录页面
 * @return {*}
 */
const login = () => {
  uni.navigateTo({
    url: '/pages/login/index',
  });
};
</script>

<style lang="stylus" scope>
.welcome {
  text-align: center
  margin-top: 10px
}
.flex-btns{
  display: flex;
  justify-content: center;
  align-items: center;
  .van-button {
    margin-right: 10px
  }
}
</style>
