<template>
  <div class="descBox flex">
    <div class="descBox-item" v-for="(v,i) in arr" :key="i">{{ v.text }}</div>
  </div>
</template>

<script>
import js from "./descBox";

export default js
</script>
