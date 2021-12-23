<template>
  <div class="commBox">
    <div class="commBox_header flex">
      <div class="commBox_header_tit">{{ title }}</div>
      <slot name="other"></slot>
    </div>
    <div class="commBox_content">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script>
import js from "./commBox";

export default js
</script>
