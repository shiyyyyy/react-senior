import React from 'react';
import { findDOMNode } from 'react-dom';
import TweenOne from 'rc-tween-one';
import { Menu, Icon } from 'antd';

import router from 'umi/router';
import {sys} from '@/lib/sys';
import {useRootState} from '@/rootState';

const { Item, SubMenu } = Menu;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
      menuHeight: 0,
    };
  }

  phoneClick = () => {
    const menu = findDOMNode(this.menu);
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
      menuHeight: phoneOpen ? menu.scrollHeight : 0,
    });
  };

  render() {
    const { dataSource, isMobile, ...props } = this.props;
    const { menuHeight, phoneOpen } = this.state;
    const navData = dataSource.Menu.children;
    const navChildren = Object.keys(navData).map((key, i) => {
      const { a, navProps } = navData[key];
      return (
        <Item {...navProps} key={i.toString()}>
          <a {...a} href={a.link} target={a.blank && '_blank'}>
            {a.children}
          </a>
        </Item>
      );
    });

    navChildren.push(
      <Item {...dataSource.help} key="help">
        <Icon type="question-circle-o" />
        <span>{dataSource.help.children}</span>
      </Item>,
      <UserMenu key="user" ds={dataSource} />

    );
    const menuProps = {
      mode: isMobile ? 'inline' : 'horizontal',
      defaultSelectedKeys: ['0'],
      theme: isMobile ? 'dark' : 'default',
    };
    if (isMobile) {
      menuProps.openKeys = ['user'];
    }
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        {...dataSource.wrapper}
        {...props}
      >
        <div
          {...dataSource.page}
          className={`${dataSource.page.className}${phoneOpen ? ' open' : ''}`}
        >
          <TweenOne
            animation={{
              x: -30,
              delay: 100,
              type: 'from',
              ease: 'easeOutQuad',
            }}
            {...dataSource.logo}
          >
            <img width="100%" src={dataSource.logo.children} alt="img" />
          </TweenOne>
          {isMobile && (
            <div
              {...dataSource.mobileMenu}
              onClick={() => {
                this.phoneClick();
              }}
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <TweenOne
            {...dataSource.Menu}
            animation={{ x: 30, type: 'from', ease: 'easeOutQuad' }}
            ref={(c) => {
              this.menu = c;
            }}
            style={isMobile ? { height: menuHeight } : null}
          >
            <Menu {...menuProps}>{navChildren}</Menu>
          </TweenOne>
        </div>
      </TweenOne>
    );
  }
}

export default Header;

const UserMenu = (props) => {
  const {ds:dataSource} = props;
  const {user} = useRootState();
  const userTitle = (
    <div {...dataSource.user}>
      <span className="img" {...dataSource.user.img}>
        <img
          src="https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png"
          width="100%"
          height="100%"
          alt="img"
        />
      </span>
      <span>{user.name || "用户登录"}</span>
    </div>
  );
  const handleClick = () => {
    if(!user.name){
      router.push('/ag')
    }
  }
  return user.name ? (
    <SubMenu className="user" title={userTitle} {...props} onTitleClick={handleClick}>
      <Item key="a" onClick={_=>router.push('/ag')}>用户中心</Item>
      <Item key="b">修改密码</Item>
      <Item key="c">登出</Item>
    </SubMenu>
  ) : (
    <SubMenu className="user" title={userTitle} {...props} onTitleClick={handleClick}>
    </SubMenu>
  );
}
