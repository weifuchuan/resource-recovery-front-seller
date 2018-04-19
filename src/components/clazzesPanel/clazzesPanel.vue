<template>
  <div class="clazzes-panel">
    <back-bar :title="currentClazzName"></back-bar>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab v-for="item in clazzes" :key="item.name" :value="item.name" :title="item.name"></mu-tab>
    </mu-tabs>
    <div v-bar><div>
      <mu-list>
        <mu-list-item
          v-for="item in currentClazz.subClazzes"
          :key="item.name"
          :title="item.name"
        >
          <span slot="after">参考价: ￥{{item.price}}元/公斤</span>
        </mu-list-item>
      </mu-list>
    </div></div>
    <div style="position: fixed; bottom: 0; width: 100%; ">
      <router-link to="/create-order" tag="button" class="weui-btn weui-btn_primary">预约下单</router-link>
    </div>
  </div>
</template>

<script>
  import BackBar from "../base/backBar/backBar";

  export default {
    components: {BackBar},
    name: "clazzes-panel",
    props: {},
    data() {
      return {
        currentClazzName: this.$route.params.name,
        activeTab: this.$route.params.name
      }
    },
    computed: {
      clazzes() {
        return this.$store.state.clazzes;
      },
      currentClazz() {
        const cs = this.$store.state.clazzes;
        for (var i = 0; i < cs.length; i++) {
          if (cs[i].name === this.currentClazzName) {
            return cs[i];
          }
        }
      }
    },
    methods: {
      handleTabChange(val) {
        this.activeTab = val;
        this.currentClazzName = val;
      },
    }
  }
</script>

<style scoped>
  .clazzes-panel {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #ffffff;
  }
</style>
