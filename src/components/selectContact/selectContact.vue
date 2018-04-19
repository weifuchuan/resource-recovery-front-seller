<template>
  <div class="select-contact">
    <back-bar title="选择联系人"></back-bar>
    <div v-bar>
      <div>
        <mu-list>
          <mu-list-item
            v-for="item in contacts"
            :key="item.id"
            @click.native="selectItem(item.id)"
          >
            <span slot="title">{{item.name}}</span>
            <span slot="after">{{item.phone}}</span>
            <span slot="describe">{{item.address.address + " " + item.address.detail}}</span>
            <mu-icon v-if="selectedId !== '-1' && item.id.toString() === selectedId.toString()" slot="left"
                     value="done"></mu-icon>
            <mu-icon slot="right" value="edit" @click.native="toEditContact(item.id, $event)"></mu-icon>
          </mu-list-item>
          <mu-divider/>
        </mu-list>
      </div>
    </div>
    <div style="position: fixed; bottom: 0; width: 100%; ">
      <router-link to="/edit-contact/-1" tag="button" class="weui-btn weui-btn_primary">新建联系人</router-link>
    </div>
  </div>
</template>

<script>

  import BackBar from "../base/backBar/backBar";
  import bus from 'src/bus';

  export default {
    components: {
      BackBar
    },
    name: "select-contact",
    data() {
      return {
        selectedId: this.$route.params.id,
        toEdit: false,
      }
    },
    computed: {
      contacts() {
        if (this.$store.state.contacts.length === 1 && this.$store.state.contacts[0].id === -1) {
          return [];
        }
        return this.$store.state.contacts;
      }
    },
    methods: {
      selectItem(id) {
        if (!this.toEdit) {
          bus.$emit("selectContact/select", id);
          this.$router.back();
        }
        this.toEdit = false;
      },
      toEditContact(id, e) {
        this.toEdit = true;
        e.preventDefault();
        this.$router.push(`/edit-contact/${id}`);
      }
    },
    created() {
      this.$store.dispatch("getContact");
    }
  }
</script>

<style scoped>
  .select-contact {
    position: fixed;
    z-index: 3000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #ffffff;
  }
</style>
