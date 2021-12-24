<template>
  <div class="app-container home">
    <div class="header">
      <div class="header_tit">德阳旅游全域可视化决策平台</div>
      <div class="header_icon" @click="show=true">
        <van-icon name="ellipsis"/>
      </div>
    </div>
    <div id="main-body" class="main-body">
      <van-popup v-model="show" position="right" get-container="main-body" overlay-class="main-overlay">
        <div class="nav__list">
          <div class="nav__item" v-for="(v,i) in navs" :key="i" @click="goPosition(v)">
            <a :href="v.tar">{{ v.text }}</a>
          </div>
        </div>
      </van-popup>
      <comm-box id="first" :title="titles.first">
        <template v-slot:main>
          <line-up :arr="arr"></line-up>
        </template>
      </comm-box>
      <comm-box id="second" :title="titles.second">
        <template v-slot:other>
          <my-picker :columns="columns.first" @selected="selected"></my-picker>
        </template>
        <template v-slot:main>
          <v-chart class="barChart" :option="renderOption"/>
        </template>
      </comm-box>
      <comm-box :title="titles.third">
        <template v-slot:main>
          <desc-box :arr="desc.first"></desc-box>
          <my-tab :title="tabs.first.title" :arr="tabs.first.tabs"></my-tab>
          <v-chart class="lineChart" :option="renderOptionA"/>
        </template>
      </comm-box>
      <comm-box :title="titles.fourth">
        <template v-slot:main>
          <desc-box :arr="desc.second"></desc-box>
          <my-tab :title="tabs.second.title" :arr="tabs.second.tabs"></my-tab>
          <v-chart class="lineChart" :option="renderOptionB"/>
        </template>
      </comm-box>
      <comm-box id="third" :title="titles.fifth">
        <template v-slot:other>
          <my-picker :columns="columns.second" @selected="selected"></my-picker>
        </template>
        <template v-slot:main>
          <ver-box :arr="arr2"></ver-box>
          <v-chart class="lineChart" :option="renderOptionC"/>
        </template>
      </comm-box>
      <comm-box :title="titles.sixth">
        <template v-slot:other>
          <my-picker :columns="columns.second" @selected="selected"></my-picker>
        </template>
        <template v-slot:main>
          <ver-box :arr="arr3"></ver-box>
          <v-chart class="lineChart" :option="renderOptionC"/>
        </template>
      </comm-box>
      <comm-box :title="titles.seventh">
        <template v-slot:main>
          <desc-box :arr="desc.third"></desc-box>
          <v-chart class="pieChart" :option="renderOptionD"/>
        </template>
      </comm-box>
      <comm-box id="fourth" :title="titles.gth">
        <template v-slot:other>
          <my-picker :columns="columns.third" @selected="selected"></my-picker>
        </template>
        <template v-slot:main>
          <line-pro :arr="arr4"></line-pro>
        </template>
      </comm-box>
      <comm-box :title="titles.ten">
        <template v-slot:other>
          <my-picker :columns="columns.fourth" @selected="selected"></my-picker>
        </template>
        <template v-slot:main>
          <line-pro :arr="arr5"></line-pro>
        </template>
      </comm-box>
      <comm-box id="fifth" :title="titles.eve">
        <template v-slot:other>
          <my-picker :columns="columns.fifth" @selected="selected"></my-picker>
        </template>
        <template v-slot:main>
          <desc-box :arr="desc.fourth"></desc-box>
          <n-billie :arr="arr6"></n-billie>
          <v-chart class="pieChart" :option="renderOptionE"/>
        </template>
      </comm-box>
      <comm-box id="sixth" :title="titles.twl">
        <template v-slot:main>
          <v-chart class="lineChart" :option="renderOptionF"/>
        </template>
      </comm-box>
    </div>
  </div>
</template>

<script>
import js from "./home";

export default js;
</script>
