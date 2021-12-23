<template>
  <div class="linePro">
    <div class="linePro__item flex" v-for="(v,i) in arr" :key="i">
      <div class="linePro__text">{{ v.text }}</div>
      <div class="linePro__progress">
        <van-progress color="#0279F0" pivot-color="transparent" :percentage="v.value"/>
      </div>
    </div>
  </div>
</template>

<script>
import js from "./linePro";

export default js
</script>
