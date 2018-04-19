<template>
  <div>
    <mu-select-field v-model="clazz" label="分类" :maxHeight="200">
      <mu-menu-item v-for="(item, index) in clazzes" :key="index" :title="item.name" :value="item.name"/>
    </mu-select-field>
    <mu-select-field v-model="subClazz" label="子类" :maxHeight="200" @change="change">
      <mu-menu-item
        v-for="(item, index) in subClazzes"
        :key="index"
        :title="item.name"
        :afterText="'￥'+item.price+'元/公斤'"
        :value="item.name"/>
    </mu-select-field>
  </div>
</template>

<script>
  export default {
    name: "select-clazz",
    data() {
      return {
        clazz: '',
        subClazz: "",
      }
    },
    computed: {
      clazzes() {
        return this.$store.state.clazzes;
      },
      subClazzes() {
        const cl = this.$store.state.clazzes.filter(c => c.name === this.clazz);
        if (cl.length === 0) {
          return [];
        } else {
          return cl[0].subClazzes;
        }
      }
    },
    methods: {
      change(subClazz) {
        this.$emit("select", {
          clazz: this.clazzes.filter(c => c.name === this.clazz)[0],
          subClazz: this.subClazzes.filter(c => c.name === subClazz)[0]
        });
      }
    }
  }
</script>

<style scoped>
</style>
