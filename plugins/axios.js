import { Message } from "element-ui";
export default function(data) {
  data.$axios.onError(err => {
    const { statusCode, message } = err.response.data;
    // _状态码为400时，输出错误信息
    if (statusCode === 400) {
      Message.warning({ message });
    }

    // _状态码为401或403跳转到登录
    if (statusCode === 401 || statusCode === 403) {
      Message.warning({ message: "请先登录" });
      console.log(data);
      data.redirect("/user/login", {
        returnURL: data.route.fullPath
      });
    }
  });
}
