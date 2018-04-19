<template>
  <div class="select-city">
    <mu-select-field v-model="province" :labelFocusClass="['label-foucs']" label="省份" :maxHeight="200">
      <mu-menu-item v-for="item,index in provinces" :key="index" :value="item.name" :title="item.name"/>
    </mu-select-field>
    <mu-select-field v-model="city" :labelFocusClass="['label-foucs']" label="城市" :maxHeight="200">
      <mu-menu-item v-for="item,index in cities" :key="index" :value="item.name" :title="item.name"/>
    </mu-select-field>
  </div>
</template>

<script>
  import cityData from './city'

  export default {
    name: "select-city",
    props: {
      initProvince: {
        type: String,
        default: cityData[0]
      },
      initCity: {
        type: String,
        default: cityData[0].city[0].name
      }
    },
    data() {
      return {
        provinces: cityData,
        province: this.initProvince,
        city: this.initCity,
      }
    },
    computed:{
      cities(){
        return cityData.filter(p=>p.name === this.province)[0].city;
      },
    },
    watch:{
      city(city){
        this.$emit('select', {province:this.province, city});
      },
      province(){
        this.city = this.cities[0].name;
      },
      initProvince(v){
        this.province = v;
      },
      initCity(v){
        this.city = v;
      }
    }
  }
</script>

<style scoped>
  .select-city {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
  }
</style>
