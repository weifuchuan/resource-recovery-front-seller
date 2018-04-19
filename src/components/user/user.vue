<template>
  <div class="user">
    <div
      style="height:30%; width: 100%;display: flex;display: -webkit-flex;justify-content: center;align-items: center;flex-direction: column; background-color: #7e57c2"
    >
      <mu-avatar :src="me.headimgurl" size="80"/>
      <span style="color: white">{{me.nickname}}</span>
    </div>
    <mu-row class="full-width">
      <mu-col width="50">
        <div
          style="width: 100%; height:36px; display: flex;display: -webkit-flex;justify-content: center; align-items: center;background-color: #F8F8F8;"
        >
          <mu-icon value="local_mall" color="orange"></mu-icon>
          <span>余额:</span>
          <span style="color: orange;">￥{{me.money}}</span>
        </div>
        <!--<span><mu-icon value="local_mall" color="orange"></mu-icon>余额:<span style="color: orange;">￥{{me.money}}</span></span>-->
      </mu-col>
      <mu-col width="50">
        <div
          style="width: 100%;display: flex;display: -webkit-flex;justify-content: center; align-items: center;background-color: #F8F8F8;"
        >
          <mu-flat-button label="提现" primary @click="withdraw"></mu-flat-button>
        </div>
      </mu-col>
    </mu-row>

    <mu-list>
      <mu-list-item title="账单" to="/bill">
        <mu-avatar icon="edit" slot="leftAvatar"/>
      </mu-list-item>
      <mu-list-item title="编辑联系人" to="/select-contact/-1">
        <mu-avatar icon="edit" slot="leftAvatar"/>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
  export default {
    name: "user",
    computed: {
      me() {
        return this.$store.state.me;
      }
    },
    methods:{
      withdraw(){
        
      }
    }
  }
</script>

<style scoped>
  .user {
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .full-width {
    width: 100%;
  }
</style>
