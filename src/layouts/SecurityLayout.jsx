import React, {useEffect} from 'react';
import { connect } from 'dva';
import { Redirect } from 'umi';
import PageLoading from '@/components/PageLoading';
import {useRootState,rootAction} from '@/rootState';
import {req,log,sys} from '@/lib/sys';
import pathToRegexp from 'path-to-regexp';



export default ({children,location,route}) => {
  const {user} = useRootState();

  useEffect(()=>{
    init().catch(log);
  },[]);
  if(!user._id){
    return <PageLoading />;
  }
  const { routes = [] } = route;
  const authReq = getRouteAuthority(location.pathname, routes);

  if(!authReq){
    return children;
  }
  const match = sys.role.some(i=>authReq.includes(i));
  if(match){
    return children;
  }
  return (<Redirect to={'/'+sys.site+'/403'} />);
}

async function init() {
  const {user,dict} = await req('/api/com/init');
  rootAction('用户初始化', {user,dict});
}

const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};