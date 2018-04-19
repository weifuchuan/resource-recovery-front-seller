<template>
  <div class="edit-contact">
    <back-bar title="编辑联系人"></back-bar>
    <div v-bar>
      <div>
        <mu-list>
          <mu-list-item>
            <mu-text-field label="姓名" v-model="contact.name"></mu-text-field>
          </mu-list-item>
          <mu-list-item>
            <mu-text-field label="电话" v-model="contact.phone"></mu-text-field>
          </mu-list-item>
          <mu-sub-header>地址</mu-sub-header>
          <mu-list-item :title="contact.address.address + ' ' + contact.address.detail">

            <mu-icon-button slot="right" icon="edit" @click="openAddressDialog"/>

            <!--选择地址-->
            <modal
              name="map"
              :adaptive="true"
              width="100%"
              height="100%"
              @opened="boundCloseToMapModal"
              @before-close="disposeMapAutocomplete"
            >
              <div slot="top-right" id="edit-content-address-modal-close-button-tr">
                <mu-icon-button icon="close" @click="$modal.hide('map')"/>
              </div>

              <baidu-map
                :center="markerPoint"
                :zoom="20"
                class="map"
                @ready="mapReady"
                @click="clickMapView"
              >
                <bm-geolocation
                  anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                  :showAddressBar="true"
                ></bm-geolocation>
                <bm-marker
                  :position="markerPoint"
                  :dragging="true"
                  animation="BMAP_ANIMATION_BOUNCE"
                  @dragend="dragend"
                ></bm-marker>
              </baidu-map>

              <select-city :init-province="province" :init-city="city" @select="selectCity"></select-city>
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label">搜索本市中地址</label>
                </div>
                <div class="weui-cell__bd">
                  <input id="search-address-input" class="weui-input" type="text" placeholder="输入关键词...">
                </div>
              </div>

              <mu-divider/>

              <div style="width: 100%;display: -webkit-flex;display: flex;justify-content:center;">
                <small>将使用以下两项作为您的地址</small>
              </div>

              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label">标记到的地址</label>
                </div>
                <div class="weui-cell__bd">
                  <span>{{address}}</span>
                </div>
              </div>

              <div class="weui-cell">
                <mu-text-field label="地址补充说明" v-model="detail" multiLine :rows="1" :rowsMax="3"/>
              </div>

              <div style="display: -webkit-flex;display: flex;justify-content:flex-end;">
                <mu-raised-button label="取消" @click="cancelAddress"></mu-raised-button>
                <mu-raised-button label="确定" :disabled="address === ''" @click="submitAddress"></mu-raised-button>
              </div>
            </modal>
          </mu-list-item>

        </mu-list>
      </div>
    </div>
    <div style="position: fixed; bottom: 0; width: 100%; ">
      <button class="weui-btn weui-btn_primary" @click="open">确认</button>
      <mu-dialog :open="dialog" title="确认编辑无误" @close="close">
        <p style="color: red" v-html="error"></p>
        姓名: {{contact.name}}<br/>
        联系电话: {{contact.phone}}<br/>
        地址: {{address}} {{detail}}<br/>
        <mu-flat-button slot="actions" primary @click="close" label="取消"/>
        <mu-flat-button :disabled="submitBtnDisabled" primary slot="actions" primary @click="submit" label="确定"/>
      </mu-dialog>
    </div>
  </div>
</template>

<script>
  import BackBar from "../base/backBar/backBar";
  import vmodal from 'vue-js-modal';
  import Vue from 'vue';
  import BaiduMap from 'vue-baidu-map';
  import BaiduMapApi from "../../api/BaiduMapApi";
  import SelectCity from "../base/selectCity/selectCity";

  Vue.use(vmodal);

  Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'icT60nFvl0hXE5voFspkQrhBNiXLCNzM'
  });

  export default {
    components: {
      SelectCity,
      BackBar
    },
    name: "edit-contact",
    data() {
      const id = this.$route.params.id;
      let isNew = true;
      let contact = {
        id: "",
        name: '',
        phone: '',
        address: {
          point: {
            lng: 0,
            lat: 0
          },
          address: '',
          addressComponents: {
            streetNumber: '',
            street: '',
            district: '',
            city: '',
            province: ''
          },
          detail: ""
        }
      };
      if (id !== '-1') {
        contact = {... this.$store.state.contacts.filter(c => c.id === id)[0]};
        isNew = false;
      }
      let markerPoint = contact.address.point;
      const address = contact.address.address;
      const addressComponents = contact.address.addressComponents;
      const detail = contact.address.detail;
      const province = isNew ? this.$store.state.me.province : contact.address.addressComponents.province;
      const city = isNew ? this.$store.state.me.city : contact.address.addressComponents.city;
      return {
        contact,
        isNew,
        markerPoint,
        address,
        addressComponents,
        detail,
        province,
        city,
        dialog: false,
        mapApi: new BaiduMapApi(undefined, undefined),
        submitBtnDisabled: true,
        error: '',
      }
    },
    methods: {
      open() {
        this.error = '';
        this.submitBtnDisabled = false;
        if (this.contact.name.length < 1) {
          this.error += '未填写姓名<br/>';
          this.submitBtnDisabled = true;
        }
        if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.contact.phone)) {
          this.error += '手机号码无效<br/>';
          this.submitBtnDisabled = true;
        }
        this.dialog = true
      },
      close() {
        this.dialog = false
      },
      submit() {
        this.contact.address.address = this.address;
        this.contact.address.addressComponents = this.addressComponents;
        this.contact.address.detail = this.detail;
        if (this.isNew) {
          this.$store.dispatch('addContact', this.contact);
        } else {
          this.$store.dispatch('modifyContact', this.contact);
        }
        this.dialog = false;
        this.$router.back();
      },
      openAddressDialog() {
        this.$modal.show('map');
      },
      closeAddressDialog() {
        this.$modal.hide('map');
      },
      submitAddressDialog() {

        this.$modal.hide('map');
      },
      boundCloseToMapModal() {
        let el = document.getElementById("edit-content-address-modal-close-button-tr");
        el.parentElement.style.zIndex = '1';
      },
      mapReady({BMap, map}) {
        this.mapApi = new BaiduMapApi(BMap, map);
        //window.map = this.mapApi;
        setTimeout(() => {
          this.mapApi.buildAutocomplete('search-address-input', {
            /*
            回车选中某条记录后触发 item : { index : 1 /高亮的记录，所属返回结果的index/ ,value : {}/结果数据，见AutocompleteResultPoi/ }
            AutocompleteResultPoi:
              province	    String	省名
              City	        String	城市名
              district	    String	区县名称
              street	      String	街道名称
              streetNumber	String	门牌号码
              business	    String	商户名
            */
            onConfirm: ({type, target, item}) => {
              const _value = item.value;
              const myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
              this.mapApi.setPlace(myValue, point => {
                this.mapApi.getLocation(point.lng, point.lat, (point, address, addressComponents) => {
                  this.markerPoint = point;
                  this.address = address;
                  this.addressComponents = addressComponents;
                  this.detail = document.getElementById('search-address-input').value;
                });
              });
            },
            onHighlight: ({type, target, fromitem, toitem}) => {
            },
          });
          if (!this.isNew) {
            const city = this.city;
            this.mapApi.updateAutocomplete(city);
            this.mapApi.getPoint(this.address, p => {
              this.mapApi.panTo(p.lng, p.lat);
              this.markerPoint = p;
            }, city)
          }
          if (this.isNew) {
            window.wx.getLocation({
              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: (res) => {
                const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                this.markerPoint = {
                  lng: longitude,
                  lat: latitude,
                };
                this.mapApi
                  .getLocation(longitude, latitude, (point, address, addressComponents) => {
                    this.province = addressComponents.province;
                    this.city = addressComponents.city;
                    this.mapApi.panTo(longitude, latitude);
                  })
              }
            });
          }
        }, 500);
      },
      dragend({point}) {
        this.mapApi.getLocation(point.lng, point.lat, (point, address, addressComponents) => {
          this.markerPoint = point;
          this.address = address;
          this.addressComponents = addressComponents;
        })
      },
      clickMapView({point}) {
        this.mapApi.getLocation(point.lng, point.lat, (point, address, addressComponents) => {
          this.markerPoint = point;
          this.address = address;
          this.addressComponents = addressComponents;
          this.mapApi.ac.setInputValue('');
        })
      },
      selectCity({province, city}) {
        console.log(city);
        this.mapApi.panToCity(city);
        this.mapApi.updateAutocomplete(city);
        this.mapApi.ac.setInputValue('');
      },
      disposeMapAutocomplete() {
        this.mapApi.ac.dispose();
      },
      submitAddress() {
        this.contact.address.address = this.address;
        this.contact.address.addressComponents = this.addressComponents;
        this.contact.address.detail = this.detail;
        this.contact.address.point = this.markerPoint;
        this.$modal.hide('map');
      },
      cancelAddress() {
        this.$modal.hide('map');
      },
    },
  }
</script>

<style scoped>
  .edit-contact {
    position: fixed;
    z-index: 4000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #ffffff;
  }

  .chip {
    margin: 4px;
  }

  .map {
    width: 100%;
    height: 40%;
  }
</style>
