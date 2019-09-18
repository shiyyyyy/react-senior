import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  Row,
  Col,
  Cascader,
  Input,
  Modal,
  Card,
  Result,
  List,
  Avatar,
  Statistic
} from 'antd';
import React, { useState, useEffect, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { UploadImg,valFile,casFilter,RichText,valRichText } from '@/ui/comUi';
import {sys,log,req} from '@/lib/sys';
import router from 'umi/router';

import BraftEditor from 'braft-editor';


const Page = props => {
  const { form} = props;
  const { getFieldDecorator } = form;
  const { id } = props.match.params;

  const [ticket, setTicket] = useState({img:[],city:[],price:0});


  useEffect(()=>{

    if(id){
      req('/api/ticket/read_edit',{id}).then(r=>{
        setTicket(r);
      }).catch(log);
    }
  },[]);



  const handleSubmit = (e) => {
    e.preventDefault();

    form.validateFields( async (err, values) => {
      
      if (!err) {
        let r = await req('/api/order/edit',{
            ...values,
            ticket_id:ticket._id,
            price:ticket.price,
            ticket_name:ticket.name
        });
        router.replace('/'+sys.site+'/order-preview/'+r._id)
      }
    });
  };


  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };


  return (
    <PageHeaderWrapper>
    <Card>
      <List.Item>
        <List.Item.Meta
          className="fix-list-meta"
          avatar={<Avatar src={sys.img_srv+ticket.img[0]} shape="square" size="large" />}
          title={<a href={ticket.href}>{ticket.name}</a>}
          description={ticket.subDescription}
        />
        <ListContent data={ticket} />
      </List.Item>
    </Card>
    <br/>
    <Card bordered={false}>
    <Form {...formItemLayout} onSubmit={handleSubmit} >
      <Form.Item label="客户姓名">
        {getFieldDecorator('client_name',{
          rules: [{ required: true, message: '请输入客户姓名!' }],
        })(<Input />)}
      </Form.Item>

      <Form.Item label="客户手机号">
        {getFieldDecorator('client_mobile',{
          rules: [{ required: true, message: '请输入客户手机号!' }],
        })(<Input />)}
      </Form.Item>

      <Form.Item label="数量">
        {getFieldDecorator('quantity', { 
            initialValue: 1,
            rules: [{ required: true, message: '请输入数量' }],
         })(<InputNumber />)}
        <span className="ant-form-text"> 张</span>
      </Form.Item>

      <Form.Item label="合计">
        <Statistic  value={form.getFieldValue('quantity')*ticket.price} precision={2} />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
            <Button onClick={_=>router.goBack()}
              style={{
                marginLeft: 8,
              }}
            >
              取消
            </Button>
      </Form.Item>
    </Form>

    </Card>
    </PageHeaderWrapper>
  );
}

export default Form.create()(Page);

const ListContent = ({ data: { price, city, comment } }) => (
  <Row type="flex" className="fi-grow"  gutter={32}>
    <Col span={6}>
      <p>{city.join(',')}</p>
    </Col>
    <Col span={6}>
      <p>¥{price}</p>
    </Col>
    <Col span={12}>
      <p>{comment}</p>
    </Col>
  </Row>
)
