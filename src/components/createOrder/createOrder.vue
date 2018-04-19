<template>
  <div class="create-order-panel">
    <div v-bar style="width: 100%;height: 100%;">
      <div>
        <back-bar title="创建订单"></back-bar>
        <mu-list>
          <mu-list-item>
            <mu-paper class="current-contact">
              <current-contact :contact="currentContact" @click="toSelectContent"></current-contact>
            </mu-paper>
          </mu-list-item>
          <mu-divider/>
          <mu-sub-header>可能有</mu-sub-header>
          <mu-list-item>
            <div style="display: -webkit-flex;display: flex; flex-wrap: wrap;">
              <mu-chip
                v-for="(val, index) in selectedClazzes"
                :key="index"
                showDelete
                @delete="deleteSelectedClazzes(index)"
                class="chip"
              >
                {{val.subClazz.name}}({{val.clazz.name}})
              </mu-chip>
            </div>
            <select-clazz @select="selectClazz"></select-clazz>
            <mu-sub-header>大约</mu-sub-header>
            <div class="weui-cells weui-cells_form">
              <div
                v-for="(item, index) in selectedClazzes"
                :key="index"
                class="weui-cell weui-cell_vcode"
              >
                <div class="weui-cell__hd">
                  <label class="weui-label">{{item.subClazz.name}}</label>
                </div>
                <div class="weui-cell__bd">
                  <input class="weui-input" style="text-align: right;" type="number" v-model="item.weight">
                </div>
                <div class="weui-cell__ft">
                  <button class="weui-vcode-btn">公斤</button>
                </div>
              </div>
            </div>
          </mu-list-item>
          <mu-divider/>
          <mu-sub-header>选择预约时间</mu-sub-header>
          <mu-list-item>
            <div style="display: -webkit-flex;display: flex; flex-direction:column; align-items: flex-start;">
              <mu-date-picker
                hintText="选择日期"
                :autoOk="true"
                cancelLabel="取消"
                :firstDayOfWeek="0"
                :minDate="new Date()"
                :maxDate="(()=>{let d = new Date(); d.setDate(d.getDate()+30); return d; })()"
                v-model="date"
              />
              <mu-select-field label="选择时间" :maxHeight="200" v-model="time">
                <mu-menu-item v-for="item, index in clocks" :key="index" :title="item + '点'" :value="item"/>
              </mu-select-field>
            </div>
          </mu-list-item>
        </mu-list>
        <mu-raised-button label="提交订单" primary fullWidth @click="open"/>
        <mu-dialog :open="dialog" title="确认订单" @close="close">
          <p style="color: red" v-html="error"></p>
          <p>联系人: {{currentContact.name}}({{currentContact.phone}})</p>
          <p>地址: {{currentContact.address.address}} {{currentContact.address.detail}}</p>
          <p>可能有: <span
            v-for="item, index in selectedClazzes"
            :key="index">
            {{item.subClazz.name}}({{item.weight}}公斤)
          </span></p>
          <p v-if="time !== 0">时间: {{date}} {{time}}:00-{{time+1}}:00</p>
          <mu-flat-button slot="actions" primary @click="close" label="取消"/>
          <mu-flat-button slot="actions" primary @click="submit" label="确定" :disabled="error !== ''"/>
        </mu-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import BackBar from "../base/backBar/backBar";
  import SelectContact from "../selectContact/selectContact";
  import SelectClazz from "../base/selectClazz/selectClazz";

  import bus from 'src/bus';
  import CurrentContact from "./currentContact";

  import * as _ from "lodash";

  export default {
    components: {
      CurrentContact,
      SelectContact,
      BackBar,
      SelectClazz
    },
    name: "create-order",
    data() {
      return {
        currentContactId: this.$store.state.contacts[0].id,
        selectedClazzes: [],
        clocks: [
          7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
        ],
        date: '',
        time: 0,
        dialog: false,
        error: '',
        submit: _.debounce(
          () => {
            let loader = this.$loading.show();
            this.$store.dispatch("createOrder", {
              contact: this.currentContact,
              appointAt: {
                date: this.date,
                time: this.time,
              },
              plan: {
                subClazzes: this.selectedClazzes.map(item => {
                  return {
                    name: item.subClazz.name,
                    weight: Number.parseFloat(item.weight),
                    price: item.subClazz.price,
                  }
                })
              },
              callback: () => {
                this.selectedClazzes = [];
                this.date = '';
                this.time = 0;
                this.error = '';
                loader.hide();
                this.$router.push("/order-list")
              }
            });
            this.dialog = false;
          },
          300),
      }
    },
    computed: {
      contacts() {
        console.log("contacts: ", JSON.stringify(this.$store.state.contacts));
        return this.$store.state.contacts;
      },
      today() {
        const date = new Date();
        return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' 星期' + (date.getDay() === 0 ? '日' : date.getDay());
      },
      currentContact() {
        return this.$store.state.contacts.filter(c => c.id === this.currentContactId)[0];
      }
    },
    mounted() {
      bus.$on("selectContact/select", id => {
        this.currentContactId = id;
      });
    },
    methods: {
      toSelectContent(id) {
        this.$router.push("/select-contact/" + id);
      },

      selectClazz({clazz, subClazz}) {
        const weight = 0.0;
        this.selectedClazzes.push({clazz, subClazz, weight});
        this.selectedClazzes.sort((a, b) => a.subClazz.name < b.subClazz.name);
        for (let i = 0, len = this.selectedClazzes.length; i < len; i++) {
          for (let j = i + 1; j < len;) {
            if (this.selectedClazzes[i].subClazz.name === this.selectedClazzes[j].subClazz.name) {
              this.selectedClazzes.splice(j, 1);
              len--;
            } else {
              break;
            }
          }
        }
      },

      deleteSelectedClazzes(i) {
        this.selectedClazzes.splice(i, 1);
      },

      open() {
        this.error = '';
        if (this.selectedClazzes.length === 0) {
          this.error += '未选择可能有的废品种类<br/>';
        }
        for (let i = 0; i < this.selectedClazzes.length; i++) {
          if (this.selectedClazzes[i].weight <= 0) {
            this.error += '大约重量必须大于0<br/>';
            break;
          }
        }
        if (this.date === '') {
          this.error += '未选择日期<br/>';
        }
        if (this.time === 0) {
          this.error += '未选择时间<br/>';
        }
        if (this.currentContactId == -1) {
          this.error += '未选择联系人<br/>';
        }
        this.dialog = true
      },
      close() {
        this.dialog = false
      }
    },
    created() {
      this.$store.dispatch("getContact");
    }
  }
</script>

<style scoped>
  .create-order-panel {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #ffffff;
  }

  .current-contact {
    margin: 1%;
  }
</style>
