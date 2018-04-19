export default {
  modifyContact(state, contact) {
    let i = 0;
    for (; i < state.contacts.length; i++) {
      if (state.contacts[i].id === contact.id) {
        break;
      }
    }
    if (i === state.contacts.length) {
      return;
    }
    state.contacts[i] = {...contact};
  },

  addContact(state, contact) {
    state.contacts.push({...contact});
  },

  addContacts(state, contacts) {
    state.contacts = contacts;
  },

  addOrders(state, orders) {
    state.orders.push(...orders);
  },

  unshiftOrder(state, order) {
    state.orders.unshift(order);
  },

  hasNotMoreOrder(state) {
    state.hasMoreOrder = false;
  },

  cancelOrder(state, orderId) {
    for (let i = 0; i < state.orders.length; i++) {
      if (state.orders[i].id === orderId) {
        state.orders[i].canceled = true;
        return;
      }
    }
  },

  completeOrder(state, orderId){
    for (let i = 0; i < state.orders.length; i++) {
      if (state.orders[i].id === orderId) {
        state.orders[i].completed = true;
        state.orders[i].sellerConfirm = true;
        state.me.money += state.orders[i].money;
        return;
      }
    }
  }
}
