import React, { useState, useEffect, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { req,log,sys } from '@/lib/sys';
import moment from 'moment';
import {router} from 'umi';
import { Row, Col, Button, Tag, Icon, Card, Form, Menu, Divider, Select, Input, Avatar, Dropdown, Cascader, Table, List } from 'antd';


const { Option } = Select;



export default props => {

  const [selectedRows, setSelectedRows] = useState([]);
  const [list, setList] = useState();
  const [pagin, setPagin] = useState({current:1,pageSize:10,showSizeChanger:true,showQuickJumper:true});
  const [query, setQuery] = useState({});
  const [init, setInit] = useState(true);

  const edit = async (data)=>{
    await req('/api/agent/edit',data);
    message.success('操作成功');
    setEditorVis(false);
    load();
  }

  const load = ()=>{
    const {current,pageSize} = pagin;
    req('/api/order/read',{current,pageSize,query}).then(r=>{
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

  const menu = (
    <Menu selectedKeys={[]}>
      <Menu.Item key="remove">删除</Menu.Item>
      <Menu.Item key="approval">批量审批</Menu.Item>
    </Menu>
  );

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
          <SearchForm {...{setQuery}} />
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
    dataIndex: 'ticket_name',
    render: (_, row) => (
      <Fragment>
        <div>{row.ticket_name}</div>
        <div className="grey">订单号：{row._id}</div>
      </Fragment>
    ),
  },
  {
    title: '客户',
    dataIndex: 'client_name',
    render: (_, row) => (
      <Fragment>
        <div>{row.client_name}</div>
        <div className="grey">{row.client_mobile}</div>
      </Fragment>
    ),
  },
  {
    title: '状态',
    dataIndex: 'state',
    render: (state, row) => (
      <Fragment>
        <Tag color={stateColorMap[state]}>{stateTxtMap[state]}</Tag>
        <div className="grey">{row.update_at.split('T')[0]}</div>
      </Fragment>
    ),
  },
  {
    title: '金额',
    dataIndex: 'total',
    render: (total, row) => (
      <Fragment>
        <span>￥{row.price}&nbsp;&nbsp;x&nbsp;&nbsp;{row.quantity}&nbsp;&nbsp;=&nbsp;&nbsp;￥{total}</span>
      </Fragment>
    ),
  },

  {
    title: '操作',
    render: (text, record) => (
      <Fragment>
        <a onClick={_=>router.push('/'+sys.site+'/order-preview/'+record._id)}>详情</a>
      </Fragment>
    ),
  },
];

const stateTxtMap = {
  pending:'待支付',
  paid:'已支付',
  finished:'已验票'
};

const stateColorMap = {
  pending:'red',
  paid:'green',
  finished:'grey'
};


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
                {getFieldDecorator('name')(<Input placeholder="姓名" />)}
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
