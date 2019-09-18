import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BlankLayout" */ '../../layouts/BlankLayout'),
          LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BlankLayout').default,
    routes: [
      {
        path: '/e-ticket/:id',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__order__e-ticket" */ '../order/e-ticket'),
              LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                .default,
            })
          : require('../order/e-ticket').default,
        exact: true,
      },
      {
        path: '/ag-user',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
              LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/UserLayout').default,
        routes: [
          {
            name: 'login',
            path: '/ag-user/login',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__user__login" */ '../user/login'),
                  LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                    .default,
                })
              : require('../user/login').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/node_modules/_umi-build-dev@1.11.5@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/op-user',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
              LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/UserLayout').default,
        routes: [
          {
            name: 'login',
            path: '/op-user/login',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__user__login" */ '../user/login'),
                  LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                    .default,
                })
              : require('../user/login').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/node_modules/_umi-build-dev@1.11.5@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/ag',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__SecurityLayout" */ '../../layouts/SecurityLayout'),
              LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/SecurityLayout').default,
        routes: [
          {
            path: '/ag',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
                  LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                    .default,
                })
              : require('../../layouts/BasicLayout').default,
            routes: [
              {
                path: '/ag/welcome',
                name: 'user-center',
                icon: 'home',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../Welcome'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Welcome').default,
                authority: ['代理商'],
                exact: true,
              },
              {
                path: '/ag/ticket-list',
                name: 'ticket-list',
                icon: 'tag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../ticket/ticket-list'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../ticket/ticket-list').default,
                authority: ['代理商'],
                exact: true,
              },
              {
                name: 'booking',
                path: '/ag/booking/:id',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../ticket/booking'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../ticket/booking').default,
                hideInMenu: true,
                authority: ['代理商'],
                exact: true,
              },
              {
                name: 'order-preview',
                path: '/ag/order-preview/:id',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../order/order-preview'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../order/order-preview').default,
                hideInMenu: true,
                authority: ['代理商'],
                exact: true,
              },
              {
                name: 'order-list',
                path: '/ag/order-list',
                icon: 'shopping-cart',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../order/order-list'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../order/order-list').default,
                authority: ['代理商'],
                exact: true,
              },
              {
                path: '/ag/403',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../exception/403'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../exception/403').default,
                exact: true,
              },
              {
                path: '/ag',
                redirect: '/ag/welcome',
                exact: true,
              },
              {
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../exception/404'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../exception/404').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/node_modules/_umi-build-dev@1.11.5@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__404" */ '../404'),
                  LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                    .default,
                })
              : require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/node_modules/_umi-build-dev@1.11.5@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/op',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__SecurityLayout" */ '../../layouts/SecurityLayout'),
              LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/SecurityLayout').default,
        routes: [
          {
            path: '/op',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
                  LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                    .default,
                })
              : require('../../layouts/BasicLayout').default,
            routes: [
              {
                path: '/op/welcome',
                name: 'user-center',
                icon: 'home',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../Welcome'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Welcome').default,
                authority: ['管理员', '业务员'],
                exact: true,
              },
              {
                path: '/op/ticket-list',
                name: 'ticket-list',
                icon: 'tag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../ticket/ticket-list'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../ticket/ticket-list').default,
                authority: ['管理员', '业务员'],
                exact: true,
              },
              {
                path: '/op/ticket-add',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../ticket/ticket-edit'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../ticket/ticket-edit').default,
                name: 'ticket-add',
                hideInMenu: true,
                authority: ['业务员'],
                exact: true,
              },
              {
                path: '/op/ticket-edit/:id',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../ticket/ticket-edit'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../ticket/ticket-edit').default,
                name: 'ticket-edit',
                hideInMenu: true,
                authority: ['业务员'],
                exact: true,
              },
              {
                name: 'agent-list',
                path: '/op/agent-list',
                icon: 'share-alt',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../agent/agent-list'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../agent/agent-list').default,
                authority: ['业务员'],
                exact: true,
              },
              {
                name: 'operator-list',
                path: '/op/operator-list',
                icon: 'team',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../operator/operator-list'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../operator/operator-list').default,
                authority: ['管理员'],
                exact: true,
              },
              {
                name: 'order-list',
                path: '/op/order-list',
                icon: 'shopping-cart',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../order/order-list'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../order/order-list').default,
                authority: ['管理员', '业务员'],
                exact: true,
              },
              {
                path: '/op/success',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../com/success'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../com/success').default,
                hideInMenu: true,
                exact: true,
              },
              {
                path: '/op/403',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../exception/403'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../exception/403').default,
                exact: true,
              },
              {
                path: '/op',
                redirect: '/op/welcome',
                exact: true,
              },
              {
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "layouts__BasicLayout" */ '../exception/404'),
                      LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../exception/404').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/node_modules/_umi-build-dev@1.11.5@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__404" */ '../404'),
                  LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                    .default,
                })
              : require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/node_modules/_umi-build-dev@1.11.5@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/ag-home',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__InitLayout" */ '../../layouts/InitLayout'),
              LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/InitLayout').default,
        routes: [
          {
            path: '/ag-home',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__landing" */ '../landing'),
                  LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                    .default,
                })
              : require('../landing').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/node_modules/_umi-build-dev@1.11.5@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/',
        redirect: '/ag-home',
        exact: true,
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/node_modules/_umi-build-dev@1.11.5@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/lgkj/Desktop/未命名文件夹 2/web-ticket/node_modules/_umi-build-dev@1.11.5@umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
