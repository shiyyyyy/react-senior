import {sys} from '@/lib/sys';
import { parse, stringify } from 'qs';
import router from 'umi/router';

function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export default (state, action) => {
  switch (action.type) {
    case '图片预览':
      return {
        ...state,
        showImgPreview: action.payload.showImgPreview,
        imgPreviewSrc: action.payload.imgPreviewSrc,
      };
    case '取消图片预览':
      return {
        ...state,
        showImgPreview: false,
        imgPreviewSrc: '',
      };
    case '加载中':
      return {
        ...state,
        loading: true
      };
    case '加载完毕':
      return {
        ...state,
        loading: false
      };
    case '用户退出':
      const { redirect } = getPageQuery(); // redirect
      const site = sys.site;

      delete localStorage[site+'_role'];
      delete localStorage[site+'_sid'];

      if (window.location.pathname !== '/ag-home' && window.location.pathname !== '/'+site+'-user/login' && !redirect) {
        setTimeout(
          _=>router.replace(
            '/'+site+'-user/login?'+
            ''
            // stringify({redirect: window.location.href})
          )
        );
      }

      return {
        ...state,
        user:{}
      };
    case '用户初始化':
      sys.dict = action.payload.dict;
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      throw new Error("Unexpected action");
  }
};

export async function prepare(type,payload) {
  switch(type){

    case 'XXXXX':
      //异步操作在此
      //await do();
      return payload;
    default:
      return payload;
  }
}