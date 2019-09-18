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
  Result
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

  const [base, setBase] = useState({});


  useEffect(()=>{

    if(id){
      req('/api/ticket/read_edit',{id}).then(r=>{
        setBase(r);
        const {name, price, city, comment, img=[], detail=''} = r;

        const rich = BraftEditor.createEditorState(detail);
        
        const fileList = img.map((v,k)=>({
          uid: k+1,
          name: 'image.png',
          status: 'done',
          url: sys.img_srv+v,
          response: {url: v}
        }));

        form.setFieldsValue({name, price, city, comment, detail:rich, img:fileList});

      }).catch(log);
    }
  },[]);



  const handleSubmit = (e) => {
    e.preventDefault();

    form.validateFields( async (err, values) => {
      // console.log(values)
      if (!err) {
        await req('/api/ticket/edit',{
            ...base,
            ...values,
            img:valFile(values.img),
            detail:valRichText(values.detail)
        });
        router.replace('/'+sys.site+'/success')
      }
    });
  };


  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };


  return (
    <PageHeaderWrapper>
    <Card bordered={false}>
    <Form {...formItemLayout} onSubmit={handleSubmit} >
      <Form.Item label="产品名称">
        {getFieldDecorator('name',{
          rules: [{ required: true, message: '请输入产品名称!' }],
        })(<Input />)}
      </Form.Item>

      <Form.Item label="城市">
        {getFieldDecorator('city', {
          rules: [{ required: true, message: '请选择城市!' }],
        })(
          <Cascader
              fieldNames={{ value: 'label'}}
              options={sys.dict.city}
              placeholder=""
              showSearch={{ casFilter }}
            />,
        )}
      </Form.Item>

      <Form.Item label="价格">
        {getFieldDecorator('price', { 
            rules: [{ required: true, message: '请输入价格!' }],
         })(<InputNumber />)}
        <span className="ant-form-text"> RMB</span>
      </Form.Item>

      <Form.Item label="订单备注">
        {getFieldDecorator('comment',{
          rules: [{ required: true, message: '请输入订单备注!' }],
        })(<Input placeholder="将显示在客户订单上"/>)}
      </Form.Item>

      <Form.Item label="轮播图">
        {getFieldDecorator('img', {
          initialValue: [],
          rules: [{ required: true, message: '请上传图片!' }],
        })(<UploadImg />)}
      </Form.Item>

      <Form.Item label="详情">
        {getFieldDecorator('detail', { 
            initialValue: BraftEditor.createEditorState(null),
         })(<RichText />)}
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
