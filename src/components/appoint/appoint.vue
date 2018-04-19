<template>
  <div style="height: 100%; ">
    <div class="appoint-div">
      <div style="height: 100%" v-bar>
        <div class="appoint-panel">
          <div class="weui-panel">
            <div class="weui-panel__hd"><small>分类</small></div>
            <div class="weui-panel__bd ">
              <div class="appoint-clazz-panel">
                <clazz
                  v-for="item in clazzes"
                  :key="item.name"
                  :name="item.name"
                  :sub-clazzes="item.subClazzes"
                  :img="item.img"
                  :to="'clazzes/'+item.name"
                ></clazz>
              </div>
            </div>
          </div>
          <div class="weui-panel">
            <div class="weui-panel__hd"><small>通知</small></div>
            <div class="weui-panel__bd " v-bar>
              <div>
                <!--待定-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <router-link to="/create-order" tag="button" class="weui-btn weui-btn_primary">快速预约</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Clazz from "../clazz/clazz";

  export default {
    components: {Clazz},
    name: "appoint",
    computed:{
      clazzes(){
        return this.$store.state.clazzes;
      }
    }
  }
</script>

<style scoped>
  .appoint-div {
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .appoint-panel {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .appoint-clazz-panel{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
</style>
