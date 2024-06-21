<template>
  <view class="container">
    <van-image
      width="100%"
      height="10rem"
      fit="contain"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />
    <view>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="form.name"
            name="name"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名, 2-12位数字字母', namePattern }]"
          />
          
          <van-field
            v-model="form.password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码,6-12位数字字母组合', passwordPattern }]"
          />

          <van-field
            v-model="form.password1"
            type="password"
            name="password1"
            label="确认密码"
            placeholder="确认密码"
            :rules="[{ validator: passwordValidate }]"
          />
          <van-field name="sex" label="性别" :rules="[{ required: true, message: '请填写性别' }]">
            <template #input>
              <van-radio-group v-model="form.sex" direction="horizontal">
                <van-radio name="0">女</van-radio>
                <van-radio name="1">男</van-radio>
                <van-radio name="2">钝角</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="avatar" label="头像">
            <template #input>
              <van-uploader v-model="form.avatar" />
            </template>
          </van-field>

          <van-field
            v-model="form.area"
            is-link
            readonly
            name="area"
            label="地区选择"
            placeholder="点击选择省市区"
            @click="showArea = true"
          />
          <van-popup v-model:show="showArea" position="bottom">
            <van-area
              :area-list="areaList"
              @confirm="onConfirm"
              @cancel="showArea = false"
            />
          </van-popup>
        </van-cell-group>
        <view class="bottom-btn">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </view> 
            
      </van-form>
    </view>
  </view>
</template>

<script setup>

import { ref } from 'vue';
import { areaList } from '@vant/area-data';
import { registerApi } from "@/api/register.js"

const namePattern = /^[a-zA-Z0-9]{2,12}$/
const passwordPattern = /^[a-zA-Z0-9]{6,12}$/
const form = ref({
  sex: '2',
})
const showArea = ref(false)
/**
 * @description: 密码二次校验
 * @param {*} value
 * @return {*}
 */
const passwordValidate = (val) => {
  if (!val) {
    return '请填写密码'
  } else {
    if (val !== form.value.password) {
      return '两次填写的密码不一致！'
    }
  }
}
/**
 * @description: 地区选择
 * @param {*} selectedOptions
 * @return {*}
 */
const onConfirm = ({ selectedOptions }) => {
  showArea.value = false;
  form.value.area = selectedOptions.map((item) => item.text).join('/');
};

const onSubmit = (values) => {
  const params = {
    ...values
  }
  delete params.password1
  registerApi(params).then(res => {
    const { code, msg } = res
    if (code === 200) {
      form.value = {
        sex: '2'
      }
      uni.showToast({
        title: msg,
        icon: 'none',
      });
      uni.navigateTo({
        url: '/pages/login/index',
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
