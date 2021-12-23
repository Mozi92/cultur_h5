<template>
  <div class="myPicker">
    <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        placeholder="点击选择"
        @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import js from "./myPicker";

export default js
</script>
