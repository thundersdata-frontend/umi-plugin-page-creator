import { IUiApi } from 'umi-types';
import ManageConfigPanel from './manageConfig';
import ScreenConfigPanel from './screenConfig';
import AppConfigPanel from './appConfig';

export default (api: IUiApi) => {
  api.addPanel({
    title: '中后台系统配置',
    path: '/manageConfig',
    icon: 'home',
    component: () => <ManageConfigPanel api={api} />,
  });
  api.addPanel({
    title: '大屏配置',
    path: '/screenConfig',
    icon: 'home',
    component: () => <ScreenConfigPanel api={api} />,
  });
  api.addPanel({
    title: '移动端配置',
    path: '/appConfig',
    icon: 'home',
    component: () => <AppConfigPanel api={api} />,
  });
}
