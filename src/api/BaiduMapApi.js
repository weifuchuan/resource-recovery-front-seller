export default class BaiduMapApi {
  constructor(BMap, map) {
    if((typeof BMap) !== "undefined" && (typeof map) !== "undefined"){
      this.BMap = BMap;
      this.map = map;
      this.geocoder = new BMap.Geocoder();
      this.geolocation = new BMap.Geolocation();

      this.geolocate = this.geolocate.bind(this);
      this.panTo = this.panTo.bind(this);
      this.getPoint = this.getPoint.bind(this);
      this.panToCity = this.panToCity.bind(this);
      this.buildAutocomplete = this.buildAutocomplete.bind(this);
      this.setPlace = this.setPlace.bind(this);
      this.updateAutocomplete = this.updateAutocomplete.bind(this);
    }
  }

  panTo(lng, lat) {
    this.map.panTo(new BMap.Point(lng, lat));
  }

  // callback: (p: Point) => none
  geolocate(callback) {
    const map = this.map;
    const BMap = this.BMap;
    const geolocation = this.geolocation;
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        const mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        callback(r.point);
      }
      else {
        console.error('failed' + this.getStatus());
      }
    });
  }

  panToCity(city) {
    this.getPoint(city, p => {
      this.panTo(p.lng, p.lat);
    }, city);
  }

  // callback: (p: Point) => none
  getPoint(address, callback, city) {
    this.geocoder.getPoint(address, callback, city);
  }

  // callback: (point: Point, address: String, addressComponents: AddressComponent) => none
  /*
    AddressComponent:
      streetNumber	  String	门牌号码
      street	        String	街道名称
      district      	String	区县名称
      city	          String	城市名称
      province	      String	省份名称
  */
  getLocation(lng, lat, callback) {
    this.geocoder.getLocation(
      new this.BMap.Point(lng, lat),
      ({point, address, addressComponents}) => {
        if (/^.+区$/.test(addressComponents.province)) {
          if (0 === addressComponents.province.indexOf('内蒙古')) {
            addressComponents.province = '内蒙古';
          } else {
            addressComponents.province = addressComponents.province.substring(0, 2);
          }
        }
        callback(point, address, addressComponents);
      });
  }

  // inputElementId: String,
  buildAutocomplete(inputElementId, {onConfirm, onHighlight}) {
    this.ac = new this.BMap.Autocomplete(    //建立一个自动完成的对象
      {
        input: inputElementId,
        location: this.map,
      });
    window.ac = this.ac;
    this.ac.addEventListener("onconfirm", onConfirm);
    this.ac.addEventListener("onhighlight", onHighlight);
    setTimeout(()=>{
      const list = document.getElementsByClassName("tangram-suggestion-main");
      for (let i = 0; i < list.length; i++){
        const e = list.item(i);
        e.style.zIndex = 50000;
      }
    }, 500);
  }

  updateAutocomplete(city){
    this.ac.setLocation(city);
  }

  // key: String, markerPointToFunc: (p: Point)=>none
  setPlace(key, markerPointToFunc) {
    const local = new BMap.LocalSearch(this.map, { //智能搜索
      onSearchComplete: ()=>{
        const pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
        this.map.centerAndZoom(pp, 18);
        markerPointToFunc(pp);
      }
    });
    local.search(key);
  }


}
