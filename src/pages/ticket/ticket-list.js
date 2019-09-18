import React, {useEffect, useState, Fragment} from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import {sys,req,log} from '@/lib/sys';
import {router} from 'umi';
import { Row, Col, Button, Tag, Icon, Card, Form, Menu, Divider, Select, Input, Avatar, Dropdown, Cascader, Table, List } from 'antd';


export default props => {

  const [list, setList] = useState();
  const [pagin, setPagin] = useState({current:1,pageSize:10,showSizeChanger:true,showQuickJumper:true});
  const [query, setQuery] = useState({});
  const [init, setInit] = useState(true);

  const load = ()=>{
    const {current,pageSize} = pagin;
    req('/api/ticket/read',{current,pageSize,query}).then(r=>{
      setList(r.list);
      setPagin({...pagin,total:r.total});
    }).catch(log);
  }

  useEffect(()=>{    
    load();
  },[pagin.current]);

  useEffect(()=>{
    if(init){
      return setInit(false);
    }
    pagin.current === 1 ? load() : setPagin({...pagin,current:1});
  },[query]);

  return(
    <PageHeaderWrapper>
      <Card>
        <SearchForm {...{setQuery}} />
        <AddBtn/>

        <Table 
          columns={columns} 
          dataSource={list}
          rowKey='_id' 
          pagination={pagin}
          onChange={p=>setPagin(p)}
        />
      </Card>
    </PageHeaderWrapper>
  );
}

const columns = [
  {
    title: '门票',
    dataIndex: 'name',
    render: (_, item) => (
      <Fragment>
      <Avatar src={sys.img_srv+item.img[0]} shape="square" size="large" />
      &nbsp;&nbsp;&nbsp;{item.name}
      </Fragment>
    ),
  },
  {
    title: '城市',
    dataIndex: 'city',
    render: v => v.join(','),
  },
  {
    title: '备注',
    dataIndex: 'comment',
  },
  {
    title: '创建日期',
    dataIndex: 'create_at',
    render: v => v.split('T')[0],
  },

  {
    title: '操作',
    render: (text, item) => {
      const more = ()=>(
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit">编辑</Menu.Item>
              <Menu.Item key="delete">删除</Menu.Item>
            </Menu>
          }
        >
          <a>
            更多 <Icon type="down" />
          </a>
        </Dropdown>
      );
      if(sys.role.includes('代理商')){
        return (
          <Fragment>
            <a onClick={_=>router.push('/ag/booking/'+item._id)}>预定</a>
            <Divider type="vertical" />
            {more()}
          </Fragment>
        );
      }
      if(sys.role.includes('业务员')){
        return (
          <Fragment>
            <a onClick={_=>router.push('/op/ticket-edit/'+item._id)}>编辑</a>
            <Divider type="vertical" />
            {more()}
          </Fragment>
        );
      }
    },
  },
];

const AddBtn = () => {
  if(sys.role.includes('业务员')){
    return (
      <Button
          type="dashed"
          style={{
            width: '100%',
            marginBottom: 8,
          }}
          icon="plus"
          onClick={_=>router.push('/op/ticket-add')}
        >
          添加
      </Button>
  );
  }else{
    return null;
  }     
}


const Search = ({form, setQuery}) => {
  const {getFieldDecorator} = form;
  const handleReset = () => {
    form.resetFields();
    setQuery({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    form.validateFields( (err, values) => {
      if (!err) {
        setQuery(values);
      }
    });
  };

  return (
      <Form onSubmit={handleSubmit}>
        <Row type="flex" gutter={16}>
          <Col>
              <Form.Item>
                {getFieldDecorator('name')(<Input placeholder="产品名称" />)}
              </Form.Item>
          </Col>
          <Col style={{paddingTop:'5px'}}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button
                  style={{
                    marginLeft: 8,
                  }}
                  onClick={handleReset}
                >
                  重置
                </Button>
          </Col>
        </Row>
      </Form>
  );
}

const SearchForm = Form.create()(Search);