import { IUiApi } from '@umijs/ui-types';
import ManageConfigPanel from './pages/manage';
import ScreenConfigPanel from './pages/screen';
import AppConfigPanel from './pages/mobile';

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
};
