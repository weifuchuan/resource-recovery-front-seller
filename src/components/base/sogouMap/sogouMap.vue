<template>
  <div style="height: 100%;width: 100%; " id="map_canvas">
  </div>
</template>

<script>
  export default {
    name: "sogou-map",
    data() {
      return {
        map: Object
      }
    },
    methods: {
      initialize() {
        this.map = new sogou.maps.Map(document.getElementById("map_canvas"), {});

      },
      loadScript() {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.onGo2mapApiLoad = this.initialize;
        script.src = "http://api.go2map.com/maps/js/api_v2.5.1.js";
        document.body.appendChild(script);
      }
    },
    mounted() {
      this.loadScript();
    }
  }
</script>

<style scoped>

</style>
