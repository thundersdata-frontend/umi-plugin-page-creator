// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from "umi-types";

export default function(api: IApi, options) {
  api.addUIPlugin(require.resolve("../dist/index.umd"));

  api.onUISocket(({ action, failure, success }) => {
    const { type, payload } = action;
    switch (type) {
      case "org.umi-plugin-page-creator.shortForm":
      default:
        persistShortFormConfig(payload, failure, success);
    }
  });

  /**
   * 将前端传来的数据组装成一个大的字符串，并输出成文件到指定的目录。
   * 文件生成好之后，需要同步更新路由，并重启服务
   * @param payload
   * @param failure
   * @param success
   */
  function persistShortFormConfig(payload, failure, success) {
    const { formConfig, formItems } = payload;

    console.log(formConfig, formItems);
  }
}
