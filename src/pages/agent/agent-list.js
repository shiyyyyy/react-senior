import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Menu,
  Row,
  Select,
  message,
  Table,
  Modal,
  Checkbox
} from 'antd';
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { req,log } from '@/lib/sys';
import moment from 'moment';


const { Option } = Select;



export default props => {

  const [editorVal, setEditorVal] = useState({});
  const [editorVis, setEditorVis] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [list, setList] = useState();
  const [pagin, setPagin] = useState({current:1,pageSize:10,showSizeChanger:true,showQuickJumper:true});
  const [query, setQuery] = useState({});
  const init = useRef(true);

  const edit = async (data)=>{
    await req('/api/agent/edit',data);
    message.success('操作成功');
    setEditorVis(false);
    load();
  }

  const load = ()=>{
    const {current,pageSize} = pagin;
    req('/api/agent/read',{current,pageSize,query}).then(r=>{
      setList(r.list);
      setPagin({...pagin,total:r.total});
    }).catch(log);
  }

  useEffect(()=>{    
    load();
  },[pagin.current]);

  useEffect(()=>{
    !init.current && ( pagin.current === 1 ? load() : setPagin({...pagin,current:1}) );
  },[query]);

  useEffect(()=>{
    init.current = false;
  },[]);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '角色',
      dataIndex: 'role',
      render: val => val.join(','),
    },

    {
      title: '创建时间',
      dataIndex: 'create_at',
      render: val => val && val.split('T')[0],
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={_=>{
            setEditorVal(record);
            setEditorVis(true);
          }}>修改</a>
          <Divider type="vertical" />
          <a href="">停用</a>
        </Fragment>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
          <SearchForm {...{setQuery}} />
          <div>
            <Button icon="plus" type="primary" onClick={_=>{
              setEditorVal({role:['代理商']});
              setEditorVis(true);
            }}>
              新建
            </Button>
          </div>
          <Table 
            columns={columns} 
            dataSource={list}
            rowKey='_id' 
            pagination={pagin}
            onChange={p=>setPagin(p)}
          />
      </Card>
      <EditorForm {...{editorVis,editorVal,setEditorVis,edit}} />
    </PageHeaderWrapper>
  );

}

const Editor = ({form,editorVis,editorVal,setEditorVis,edit}) => {
  const {getFieldDecorator} = form;
  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (err) return;
      // form.resetFields();
      edit({...editorVal, ...values}).catch(log);
    });
  }
  return (
    <Modal
      destroyOnClose
      title="编辑员工"
      visible={editorVis}
      onOk={handleSubmit}
      onCancel={() => setEditorVis(false)}
    >
      <Form.Item labelCol={{span: 5,}} wrapperCol={{span: 15,}} label="姓名">
        {getFieldDecorator('name', {
          initialValue: editorVal.name,
          rules: [
            {
              required: true,
              message: '请输入至少两个字符！',
              min: 2,
            },
          ],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
      <Form.Item labelCol={{span: 5,}} wrapperCol={{span: 15,}} label="手机号">
        {getFieldDecorator('mobile', {
          initialValue: editorVal.mobile,
          rules: [
            {
              required: true,
              message: '请输入正确的手机号！',
              pattern: /^1[3456789]\d{9}$/
            },
          ],
        })(<Input placeholder="请输入" />)}
      </Form.Item>

    </Modal>
  );
}

const EditorForm = Form.create()(Editor);

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
