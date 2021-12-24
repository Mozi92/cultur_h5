<template>
  <div class="billie">
    <div class="billie-txt flex">
      <div class="billie-txt-item" v-for="(v,i) in arr" :key="i">{{ v.text }}</div>
    </div>
    <div class="billie-progress">
      <div class="billie-billie" :style="styleObj"></div>
    </div>
  </div>
</template>

<script>
import js from "./billie";

export default js
</script>
