// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path:'/user',
      layout: false,
      routes:[
        {path:'/user',redirect:'/user/login'},
        {
          path:'/user/login',
          name:'登录',
          component:'./User/Login'
        },
        {
          path:'/user/design',
          name:'注册',
          component:'./User/Design'
        },
        {
          path:'/user/forget',
          name:'忘记密码',
          component:'./User/Forget'
        },
        {
          component:'./Empty'
        }
      ]
    },
    {
      path:'/',
      component:'../layouts/UserLayout',
      routes:[
        {path:'/',redirect:'/equipment/mall'},
        {
          path:'/equipment',
          name:'设备管理',
          icon:'videoCamera',
          routes:[
            {path:'equipment/mall',name:'设备商城',component:'./Equipment/Mall'},
            {path:'/equipment/cpe',name:'CPE设备列表',component: './Equipment/Cpe'},
            {path:'/equipment/camera',name:'摄像头列表',component:'./Equipment/Camera'}
          ]
        },
        {path:'/repair',name:'设备报修',icon:'tool',component:'./Repair'}
      ]
    },
   
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
