<template>
  <div class="bill">
    <back-bar title="账单"></back-bar>
    <div
      style="width: 100%; height:36px; display: flex;display: -webkit-flex;justify-content: center; align-items: center;background-color: #F8F8F8;"
    >
      <mu-icon value="local_mall" color="orange"></mu-icon>
      <span>余额:</span>
      <span style="color: orange;">￥{{me.money}}</span>
    </div>
    <mu-list>
      <mu-list-item
        v-for="item, index in bill"
        :key="index"
        :title="moneyStr(item)"
        :titleClass="{'red':(item.money>0)}"
        :afterText="item.confirmAt"
      >
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
  import BackBar from "../base/backBar/backBar";

  export default {
    components: {BackBar},
    name: "bill",
    computed: {
      bill() {
        return this.$store.state.bill;
      },
      me(){
        return this.$store.state.me;
      }
    },
    methods:{
      moneyStr(item){
        if(item.money>0){
          return '+'+item.money;
        }else{
          return item.money.toString();
        }
      }
    }
  }
</script>

<style scoped>
  .bill {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #ffffff;
  }

</style>
