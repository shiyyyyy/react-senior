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
  Statistic,
  Badge,
  Tag,
} from 'antd';
import React, { useState, useEffect, Fragment, forwardRef, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UploadImg,valFile,casFilter,RichText,valRichText } from '@/ui/comUi';
import {sys,log,req} from '@/lib/sys';
import router from 'umi/router';

import BraftEditor from 'braft-editor';
import QRCode from 'qrcode';

const { Countdown } = Statistic;


const Page = props => {
  const { form} = props;
  const { getFieldDecorator } = form;
  const { id } = props.match.params;

  const canvasRef = useRef(null);

  const [ticket, setTicket] = useState({img:[],city:[],price:0});
  const [order, setOrder] = useState({});
  const [payType, setPayType] = useState();

  useEffect(()=>{

    if(id){
      req('/api/order/read_preview',{id}).then(r=>{
        setTicket(r.ticket);
        setOrder(r.order);
        r.order.state === 'paid' && QRCode.toCanvas(canvasRef.current, window.origin+'/e-ticket/'+r.order._id, e=>e&&console.log(e));
      }).catch(log);
    }
  },[]);

  useEffect(()=>{
    form.setFieldsValue({pay_type:payType});
  },[payType])



  const handleSubmit = (e) => {
    e.preventDefault();

    form.validateFields( async (err, values) => {
      // console.log(values)
      if (!err) {
        if(payType === 'alipay'){
          let r = await req('/api/order/alipay',{
              order_id:order._id
          });
          window.location.href = r.url;
        }

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
    <Form {...formItemLayout} onSubmit={e=>handleSubmit(e).catch(log)} >
      <Form.Item label="客户姓名">
        {order.client_name}
      </Form.Item>

      <Form.Item label="客户手机号">
        {order.client_mobile}
      </Form.Item>

      <Form.Item label="数量">
        {order.quantity}
        <span className="ant-form-text"> 张</span>
      </Form.Item>

      <Form.Item label="合计">
        <Statistic  value={order.total} precision={2} />
      </Form.Item>

      <Form.Item label="电子票" >
        {
          order.state === 'paid' &&
          <div>
          <canvas ref={canvasRef}></canvas>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;请扫码后转发给客户</div>
          </div>
        }
        {
          order.state === 'pending' &&
          <Countdown title="待支付，剩余时限" value={Date.now() + 1000 * 60 * 30} format="HH:mm:ss:SSS" />
        }
        {
          order.state === 'finished' &&
          <Tag color="green">已验票</Tag>
        }
      </Form.Item>

      {
        order.state === 'pending' &&
        <Form.Item label="支付方式" >
          {getFieldDecorator('pay_type', { 
              rules: [{ required: true, message: '请选择支付方式' }],
          })(<PayTypeField {...{payType,setPayType}}/>)}

        </Form.Item>
      }

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        {
          order.state === 'pending' &&
          <Button type="primary" htmlType="submit">
            去支付
          </Button>
        }

        <Button onClick={_=>router.goBack()}
          style={{
            marginLeft: 8,
          }}
        >
          返回
        </Button>
      </Form.Item>
    </Form>

    </Card>
    </PageHeaderWrapper>
  );
}

export default Form.create()(Page);

const PayTypeField = forwardRef(({payType,setPayType}, ref) =>(
  <div>
  <Badge onClick={_=>setPayType('alipay')} count={payType=='alipay'?(<Icon type="check-circle" style={{ color: '#f5222d' }} />):null}>
    <div className="fx-col -o-">
    <div style={{padding:'5px', backgroundColor:'#eee'}}><Icon type="alipay"  style={{fontSize:'30px',color:payType=='alipay'?'#36f':''}}/></div>
    <div style={{fontSize:'12px',paddingTop:'5px'}}>支付宝</div>
    </div>
  </Badge>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <Badge onClick={_=>setPayType('wechat')} count={payType=='wechat'?(<Icon type="check-circle" style={{ color: '#f5222d' }} />):null}>
    <div className="fx-col -o-">
    <div style={{padding:'5px', backgroundColor:'#eee'}}><Icon type="wechat"  style={{fontSize:'30px',color:payType=='wechat'?'#52c41a':''}} /></div>
    <div style={{fontSize:'12px',paddingTop:'5px'}}>微信</div>
    </div>
  </Badge>  
  </div>
));

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
