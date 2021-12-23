<template>
  <div class="myTab flex">
    <div class="myTab__title">{{ title }}</div>
    <div class="myTab__cont flex">
      <div class="myTab__item" v-for="(v,i) in arr" :key="i" :class="current===v.id?'active':''" @click="clickTab(v)">
        <div class="myTab__item_txt">{{ v.text }}</div>
        <div class="myTab__item_status"></div>
      </div>
    </div>
  </div>
</template>

<script>
import js from "./myTab";

export default js
</script>
