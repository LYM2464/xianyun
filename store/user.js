export const state = {
  userInfo: {}
}

// - 给state内部属性赋值
export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  }
}
