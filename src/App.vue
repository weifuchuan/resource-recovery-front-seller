<template>
  <div id="app">
    <div style="height: 90%;">
      <keep-alive exclude="select-contact,edit-contact,clazzes-panel">
        <router-view></router-view>
      </keep-alive>
    </div>
    <mu-paper>
      <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item to="/appoint" value="appoint" title="预约回收" icon="restore"/>
        <mu-bottom-nav-item to="/order-list" value="order" title="订单管理" icon="favorite"/>
        <mu-bottom-nav-item to="/user" value="user" title="我" icon="location_on"/>
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>

  export default {
    name: 'App',
    data() {
      return {
        bottomNav: 'appoint'
      }
    },
    methods: {
      handleChange(val) {
        this.bottomNav = val
      }
    },
  }
</script>

<style>
  html, body {
    height: 100%;
  }

  .red {
    color: red;
  }



  #app {
    height: 100%;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .vb > .vb-dragger {
    z-index: 5;
    width: 12px;
    right: 0;
  }

  .vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0, 0, 0, 0);
    transform: rotate3d(0, 0, 0, 0);
    -webkit-transition: background-color 100ms ease-out,
    margin 100ms ease-out,
    height 100ms ease-out;
    transition: background-color 100ms ease-out,
    margin 100ms ease-out,
    height 100ms ease-out;
    background-color: rgba(48, 121, 244, .1);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
  }

  .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, .3);
  }

  .vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, .5);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, .5);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, .5);
  }
</style>
