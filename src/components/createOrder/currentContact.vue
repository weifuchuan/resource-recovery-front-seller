<template>
  <div style="height: 100%; width: 100%; ">
    <mu-row>
      <mu-col width="90">
        <div
          style="height: 100%; width:100%; display: flex; display: -webkit-flex; flex-direction: column; justify-content: center; align-items: flex-start; "
        >
          <div
            style="height: 100%; width:100%; display: flex; display: -webkit-flex; justify-content: space-between;"
          >
            <span>{{contact.name}}</span>
            <small>{{contact.phone}}</small>
          </div>
          <small>{{contact.address.address + " " + contact.address.detail}}</small>
        </div>
      </mu-col>
      <mu-col width="10" class="full">
        <div
          style="height: 100%; width:100%; display: flex;display: -webkit-flex; justify-content: center; align-items: center; "
        >
          <mu-icon value="keyboard_arrow_right" @click.native="click"/>
        </div>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
  export default {
    name: "current-contact",
    props: {
      contact: {
        type: Object,
        required: true,
      },
    },
    methods: {
      click(e) {
        e.preventDefault();
        this.$emit("click", this.contact.id);
      }
    }
  }
</script>

<style scoped>
  .full {
    height: 39px;
  }
</style>
