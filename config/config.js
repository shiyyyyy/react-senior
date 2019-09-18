import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
}

export default {
  plugins,
  block: {
    // 国内用户可以使用码云
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/e-ticket/:id',
          component: './order/e-ticket',
        },
        {
          path: '/ag-user',
          component: '../layouts/UserLayout',
          routes: [
            {
              name: 'login',
              path: '/ag-user/login',
              component: './user/login',
            },
          ],
        },
        {
          path: '/op-user',
          component: '../layouts/UserLayout',
          routes: [
            {
              name: 'login',
              path: '/op-user/login',
              component: './user/login',
            },
          ],
        },
        {
          path: '/ag',
          component: '../layouts/SecurityLayout',
          routes: [
            {
              path: '/ag',
              component: '../layouts/BasicLayout',
              routes: [
                {
                  path: '/ag/welcome',
                  name: 'user-center',
                  icon: 'home',
                  component: './Welcome',
                  authority: ['代理商'],
                },
                {
                  path: '/ag/ticket-list',
                  name: 'ticket-list',
                  icon: 'tag',
                  component: './ticket/ticket-list',
                  authority: ['代理商'],
                },
                {
                  name: 'booking',
                  path: '/ag/booking/:id',
                  component: './ticket/booking',
                  hideInMenu: true,
                  authority: ['代理商'],
                },
                {
                  name: 'order-preview',
                  path: '/ag/order-preview/:id',
                  component: './order/order-preview',
                  hideInMenu: true,
                  authority: ['代理商'],
                },
                {
                  name: 'order-list',
                  path: '/ag/order-list',
                  icon: 'shopping-cart',
                  component: './order/order-list',
                  authority: ['代理商'],
                },
                {
                  path: '/ag/403',
                  component: './exception/403',
                },
                {
                  path: '/ag',
                  redirect: '/ag/welcome',
                },
                {
                  component: './exception/404',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          path: '/op',
          component: '../layouts/SecurityLayout',
          routes: [
            {
              path: '/op',
              component: '../layouts/BasicLayout',
              routes: [
                {
                  path: '/op/welcome',
                  name: 'user-center',
                  icon: 'home',
                  component: './Welcome',
                  authority: ['管理员','业务员'],
                },
                {
                  path: '/op/ticket-list',
                  name: 'ticket-list',
                  icon: 'tag',
                  component: './ticket/ticket-list',
                  authority: ['管理员','业务员'],
                },
                {
                  path: '/op/ticket-add',
                  component: './ticket/ticket-edit',
                  name: 'ticket-add',
                  hideInMenu: true,
                  authority: ['业务员'],
                },
                {
                  path: '/op/ticket-edit/:id',
                  component: './ticket/ticket-edit',
                  name: 'ticket-edit',
                  hideInMenu: true,
                  authority: ['业务员'],
                },

                {
                  name: 'agent-list',
                  path: '/op/agent-list',
                  icon: 'share-alt',
                  component: './agent/agent-list',
                  authority: ['业务员'],
                },
                {
                  name: 'operator-list',
                  path: '/op/operator-list',
                  icon: 'team',
                  component: './operator/operator-list',
                  authority: ['管理员'],
                },
                {
                  name: 'order-list',
                  path: '/op/order-list',
                  icon: 'shopping-cart',
                  component: './order/order-list',
                  authority: ['管理员','业务员'],
                },
                {
                  path: '/op/success',
                  component: './com/success',
                  hideInMenu: true,
                },
                {
                  path: '/op/403',
                  component: './exception/403',
                },
                {
                  path: '/op',
                  redirect: '/op/welcome',
                },
                {
                  component: './exception/404',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          path: '/ag-home',
          component: '../layouts/InitLayout',
          routes: [
            {
              path: '/ag-home',
              component: './landing',
            }
          ]
        }, 
        {
          path: '/',
          redirect: '/ag-home',
        }, 
        {
          component: './404',
        },
      ],
    }
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
  proxy: {
    '/api/': {
      target: 'http://localhost:8002/',
      changeOrigin: true,
    },
  },
};
