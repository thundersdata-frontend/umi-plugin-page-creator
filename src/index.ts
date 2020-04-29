// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from 'umi-types';

export default function (api: IApi, options) {

  // Example: output the webpack config
  api.chainWebpackConfig(config => {
    // console.log(config.toString());
  });

  api.addUIPlugin(require.resolve('../dist/index.umd'));

  api.onUISocket(({ action, failure, success }) => {
    if (action.type === 'org.umi-ui-plugin-demo.test') {
      success({
        data: 'umi-ui-plugin-demo.test',
      });
    }
  });

}
