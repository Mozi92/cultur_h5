<template>
  <div class="verBox flex">
    <div class="verBox-item" v-for="(v,i) in arr" :key="i">
      <div class="verBox-item-top">{{ v.value }}</div>
      <div class="verBox-item-bottom">{{ v.text }}</div>
    </div>
  </div>
</template>

<script>
import js from "./verBox";

export default js
</script>
