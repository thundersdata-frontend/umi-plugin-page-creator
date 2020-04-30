import { Button } from 'antd';
import { IUiApi } from 'umi-types'

export default ({api}: {api: IUiApi}) => {
  const { callRemote } = api;
  return (
    <Button
      type="primary"
      onClick={async () => {
        const { data } = await callRemote({
          type: 'org.umi-plugin-page-creator.test',
        });
        alert(data);
      }}
    >Test</Button>
  );
}