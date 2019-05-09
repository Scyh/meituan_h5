const mutations = {
    set_last_route: (state, route) => {
        state.last_route = route || null;
    },

    set_user_info: (state, info) => {
        state.user_info = info
    },

    set_city: (state, city) => {
        state.city = city
    },

    set_addr: (state, addr) => {
        state.location = addr
    },

    set_addr_edit_route: (state, {route, address}) => {
        state.last_addr_edit_route = { route, address }
    },

    set_goods_to_cart: (state, {shop_id, data_obj}) => {
        data_obj ? (state.cart[shop_id] = data_obj) : delete state.cart[shop_id];
    }

};

export default mutations