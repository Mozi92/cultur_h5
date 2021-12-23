<template>
  <div class="lineUp flex">
    <div class="line-item" v-for="(v,i) in arr" :key="i" :style="styleObj">
      <div class="line-item-num">{{ v.value }}</div>
      <div class="line-item-txt">{{ v.text }}</div>
    </div>
  </div>
</template>

<script>
import js from "./lineUp";

export default js
</script>
