import { defineConfig } from 'umi';

export default defineConfig({
  presets: [require.resolve('@umijs/preset-ui')],
  plugins: [require.resolve('../lib')],
  routes: [
    {
      path: '/',
      component: './index',
    },
  ],
});
