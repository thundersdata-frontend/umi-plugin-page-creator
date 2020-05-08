import { IUiApi } from '@umijs/ui-types';
import { DashboardFilled } from '@ant-design/icons';
import ManageConfigPanel from './pages/manage';
import ScreenConfigPanel from './pages/screen';
import AppConfigPanel from './pages/mobile';

export default (api: IUiApi) => {
  api.addPanel({
    title: '中后台',
    path: '/manageConfig',
    icon: <DashboardFilled />,
    component: () => <ManageConfigPanel api={api} />,
  });
  api.addPanel({
    title: '大屏',
    path: '/screenConfig',
    icon: <DashboardFilled />,
    component: () => <ScreenConfigPanel api={api} />,
  });
  api.addPanel({
    title: '移动端',
    path: '/appConfig',
    icon: <DashboardFilled />,
    component: () => <AppConfigPanel api={api} />,
  });
};
