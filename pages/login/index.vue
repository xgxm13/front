<template>
  <view class="container">
    <van-image
      width="100%"
      height="10rem"
      fit="contain"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />
    <view>
      <van-form style="margin-top: 20px" @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="form.name"
            name="name"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          
          <van-field
            v-model="form.password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <view class="bottom-btn">
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </view> 
            
      </van-form>
    </view>
  </view>
</template>

<script setup>

import { ref } from 'vue';
import { loginApi } from "@/api/login"
const form = ref({
})

const onSubmit = (values) => {
  const params = {
    ...values
  }
  loginApi(params).then(res => {
    const { code, msg } = res
    if (code === 200) {
      form.value = {}
      uni.showToast({
        title: msg,
        icon: 'none',
      });
      const { token } = res
      uni.setStorageSync('admin-token', token)
      uni.reLaunch({
        url: '/pages/tabbar/index',
      });
    }
    
  })
}

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
.bottom-btn {
  width: 90%
  margin: 20px auto 0
}
</style>
