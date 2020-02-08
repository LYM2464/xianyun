// - 存放数据对象
export const state = function() {
  return {
    userInfo: {
      user: {}
    }
  };
};

// - 给state内部属性赋值的方法对象
export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  }
};

// - 接口
export const actions = {
  // _登录
  login({ commit }, data) {
    return this.$axios({
      url: "/accounts/login",
      method: "post",
      data
    }).then(res => {
      const { data } = res;
      // 调用mutations的方法，将数据存储到store/user.js
      commit("setUserInfo", data);
    });
  },

  // _注册
  register(store, data) {
    return this.$axios({
      method: "post",
      url: "/accounts/register",
      data
    }).then(res => {
      console.log(res);
    });
  }
};
