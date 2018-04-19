<template>
  <mu-paper class="clazz" @click.native="click">
    <mu-card-header :title="name" :subTitle="subName">
      <mu-avatar :src="img" slot="avatar"/>
    </mu-card-header>
  </mu-paper>
</template>

<script>
  export default {
    name: "clazz",
    props: {
      name: {
        type: String,
        required: true,
      },
      subClazzes: {
        type: Array,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      }
    },
    data() {
      let subName = this.subClazzes.map(c => c.name).join(',');
      if (subName.length > 5) {
        subName = subName.slice(0, 5) + "..."
      }
      return {
        subName
      }
    },
    methods:{
      click(e){
        e.preventDefault();
        this.$router.push(this.to);
      }
    }
  }
</script>

<style scoped>
  .clazz {
    width: 48%;
    margin: 1%;
  }
</style>
