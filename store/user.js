// - 存放数据对象
export const state = function() {
  return {
    // _登录用户信息
    userInfo: {
      user: {}
    }
  };
};

// - 给state内部属性赋值的方法对象
export const mutations = {
  // _userInfo赋值
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
    const { checkPassword, ...props } = data;
    return this.$axios({
      method: "post",
      url: "/accounts/register",
      data: props
    }).then(res => {
      const { data } = res;
      // 调用mutations的方法，将数据存储到store/user.js
      store.commit("setUserInfo", data);
    });
  },

  // _发送验证码
  sendCaptcha(store, data) {
    return this.$axios({
      url: `/captchas`,
      method: "POST",
      data
    });
  }
};
