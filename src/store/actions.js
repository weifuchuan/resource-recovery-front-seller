import axios from 'axios';

export default {
  getContact({state, commit}) {
    if (!(state.contacts.length === 1 && state.contacts[0].id === -1) && state.contacts.length > 0) {
      return
    }
    axios.post("/seller/contact/get", {sellerId: state.me.id})
      .then(({data}) => {
        commit("addContacts", data);
      })
      .catch(err => {
        alert(err);
        console.error(err);
      })
  },
  addContact({commit}, contact) {
    axios.post("/seller/contact/add", contact)
      .then(({data}) => {
        if (data.ok) {
          contact.id = data.id;
          commit('addContact', contact);
        } else {
          alert("添加联系人失败");
        }
      })
      .catch(err => {
        alert(err);
        console.error(err);
      });
  },
  modifyContact({commit}, contact) {
    commit("modifyContact", contact);
    axios.post("/seller/contact/modify", contact)
      .then(({data}) => {

      })
      .catch(err => {
        alert(err);
        console.error(err);
      });
  },
  updateOrders({state, commit}, count) {
    let lastId = -1;
    if (state.orders.length > 0) {
      lastId = state.orders[state.orders.length - 1].id;
    }
    axios.post("/seller/order/get", {lastId, count})
      .then(resp => {
        if (resp.data.ok) {
          commit("addOrders", resp.data.orders);
        } else {
          console.log("没有更多订单");
          commit("hasNotMoreOrder");
        }
      })
      .catch(err => {
        console.error(err);
        commit("hasNotMoreOrder");
      });
  },
  createOrder({commit}, order) {
    let callback = order.callback;
    delete order["callback"];
    axios.post("/seller/order/create", order)
      .then(({data}) => {
        if (data.ok) {
          commit("unshiftOrder", data.order);
        } else {
          console.error(data.error);
        }
        callback();
      })
      .catch(err => {
        alert(err);
        console.error(err);
      })
  },
  cancelOrder({commit}, orderId) {
    axios.post("/seller/order/cancel", {orderId})
      .then(({data}) => {
        if (data.ok) {
          commit("cancelOrder", orderId);
        }
      })
  },

  confirmOrder({commit}, orderId) {
    axios.post("/seller/order/confirm", {orderId})
      .then(({data}) => {
        if (data.ok) {
          commit("completeOrder", orderId);
        }
      })
      .catch(err => {
        alert(err);
        console.error(err);
      })
  }
}
