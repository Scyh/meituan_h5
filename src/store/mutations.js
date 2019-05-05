const mutations = {
    set_last_route: (state, route) => {
        state.last_route = route || null;
    },

    set_user_info: (state, info) => {
        state.user_info = { name: info }
    },

    set_city: (state, city) => {
        state.city = city
    },

    set_addr: (state, addr) => {
        state.location = addr
    }
};

export default mutations