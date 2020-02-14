import { Message } from "element-ui";
export default function({ $axios }) {
  $axios.onError(err => {
    const { statusCode, message } = err.response.data;
    // _状态码为400时，输出错误信息
    if (statusCode === 400) {
      Message.warning({ message });
    }
  });
}
