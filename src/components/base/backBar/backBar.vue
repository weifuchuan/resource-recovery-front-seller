<template>
  <mu-appbar :title="title">
    <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="back"></mu-icon-button>
  </mu-appbar>
</template>

<script>
  export default {
    name: "back-bar",
    props: {
      title: {
        type: String,
        required: true
      }
    },
    methods: {
      back() {
        this.$router.back();
      },
    }
  }
</script>

<style scoped>

</style>
