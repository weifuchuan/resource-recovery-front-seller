<template>
  <mu-paper class="paper">
    <div class="flex-div">
      <small>创建于: {{order.createAt}}</small>
      <p>联系人: {{order.contact.name}}(<a :href="'tel:'+order.contact.phone">{{order.contact.phone}}</a>)</p>
      <p>地址: {{order.contact.address.address}} {{order.contact.address.detail}}</p>
      <p>可能有: <span v-for="item, index in order.plan.subClazzes" :key="index">{{item.name}}(参考价: ￥{{item.price}}元/公斤; 大约有{{item.weight}}公斤) </span>
      </p>
      <p>预约时间：{{order.appointAt.date}} {{order.appointAt.time}}点</p>
      <mu-divider/>
      <div v-if="order.recycler !== undefined && !order.canceled">
        <p>您的回收员: {{order.recycler.name}}(<a :href="'tel:'+order.recycler.phone">{{order.recycler.phone}}</a>)</p>
        <p>成交额: <span v-if="!order.recyclerConfirm" style="color: red">回收员尚未确认</span><span
          v-else>￥{{order.money}}元</span>
        </p>
      </div>
      <mu-divider/>
      <div
        style="width: 100%; display: flex; display: -webkit-flex; justify-content: flex-end"
        v-if="!order.completed && !order.canceled"
      >
        <mu-raised-button label="确认订单" :disabled="!order.recyclerConfirm"
                          @click="confirmShow = true"></mu-raised-button>
        <mu-raised-button label="取消订单" @click="cancelShow = true"></mu-raised-button>
      </div>
      <div style="width: 100%; display: flex; display: -webkit-flex; justify-content: flex-end" v-if="order.completed">
        <span>已完成</span>
      </div>
      <div style="width: 100%; display: flex; display: -webkit-flex; justify-content: flex-end" v-if="order.canceled">
        <span>已取消</span>
      </div>
      <div v-if="order.canceled" v-html="order.extraInfo" style="color: #121b4b">
      </div>
      <mu-dialog :open="confirmShow" title="确认订单" @close="confirmShow = false">
        确认订单？
        <mu-flat-button slot="actions" @click="confirmShow = false" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="confirm" label="确定"/>
      </mu-dialog>
      <mu-dialog :open="cancelShow" title="取消订单" @close="cancelShow = false">
        确认要取消订单么？
        <mu-flat-button slot="actions" @click="cancelShow = false" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="cancel" label="确定"/>
      </mu-dialog>
    </div>
  </mu-paper>
</template>

<script>
  export default {
    name: "order",
    props: {
      order: {
        type: Object,
        require: true,
      }
    },
    data() {
      return {
        cancelShow: false,
        confirmShow: false,
      }
    },
    methods: {
      confirm() {
        this.$emit("confirm", this.order);
        this.confirmShow = false;
      },
      cancel() {
        this.$emit('cancel', this.order);
        this.cancelShow = false;
      }
    }
  }
</script>

<style scoped>
  .paper {
    width: 96%;
    margin: 4px;
  }

  .flex-div {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    background-color: #fff8eb;
  }
</style>
