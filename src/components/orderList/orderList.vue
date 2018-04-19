<template>
  <div style="width: 100%;height: 100%" v-bar>
    <div style="width: 100%;height: 100%">
      <div class="order-list">
        <order
          v-for="item, index in orders"
          :key="index"
          :order="item"
          @confirm="confirm(item)"
          @cancel="cancel(item)"
        ></order>
      </div>
      <mu-raised-button v-if="$store.state.hasMoreOrder" label="加载更多" fullWidth
                        @click="loadMoreFunc"></mu-raised-button>
      <div
        style="width: 100%; text-align: center; "
        v-else
      >
        <span>没有了>_<</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Order from "./order";
  import * as _ from "lodash";

  export default {
    components: {Order},
    name: "order-list",
    data() {
      return {
        loadMoreFunc: _.debounce(() => {
          this.$store.dispatch("updateOrders", 10);
        }, 300),
      }
    },
    computed: {
      orders() {
        return this.$store.state.orders;
      }
    },
    methods: {
      confirm(order) {
        this.$store.dispatch("confirmOrder", order.id);
      },
      cancel(order) {
        this.$store.dispatch("cancelOrder", order.id);
      },
    },
    created() {
      this.$store.dispatch("updateOrders", 10);
    }
  }
</script>

<style scoped>
  .order-list {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
</style>
