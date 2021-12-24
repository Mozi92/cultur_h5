<template>
  <div class="app-container camera">
    <div class="header">
      <div class="header_icon" @click="back">
        <van-icon name="arrow-left"/>
      </div>
      <div class="header_tit">德阳智慧文旅平台驾驶舱</div>
    </div>
    <my-picker :columns="columns.first" @selected="selected"></my-picker>
    <div class="video-list">
      <div class="video-box" v-for="(v,i) in videos" :key="i">
        <video class="video-cont" controls muted>
          <source src="../../assets/videos/movie.mp4" type="video/mp4">
          您的浏览器不支持 video 标签。
        </video>
        <div class="video-desc">{{ v.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import js from "./camera";

export default js
</script>
