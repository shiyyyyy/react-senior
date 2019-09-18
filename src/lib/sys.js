import {rootAction} from '@/rootState';
import { message } from 'antd';

export const sys = {
	img_action : '/api/upload/ticket/img',
	img_srv : '/api/file'
};

export function site_init() {

  const match = /^\/([^\/]+)/.exec(window.location.pathname);
  const site = (match && match[1]) || '';
  sys.site = site.split('-')[0];
  sys.sid = localStorage[sys.site+'_sid'] || '';
  sys.role = JSON.parse( localStorage[sys.site+'_role'] || '[]' );
}

export async function req(url, body) {
    body = body || {};
    body.sid = sys.sid;

    rootAction('加载中');

    let resp = await fetch(url, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body)
    }).catch(
    	e => message.error('无法连接网络')
    );

    rootAction('加载完毕');

    if(!resp){
        await Promise.reject('无法连接网络');
    }

    let txt = await resp.text();

    if(txt === '未登录'){
        rootAction('用户退出');
        await Promise.reject(txt);
    }

    let r;
    try{
        r = JSON.parse(txt);
    }catch(e){
        message.error(txt);
    }

    if( typeof r !== 'object' && !Array.isArray(r) ){
        await Promise.reject(txt);
    }
    
    return r;
}

export function log(...args) {
	console.log(...args);
}