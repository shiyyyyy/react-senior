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
  Spin
} from 'antd';
import React, { useState, Fragment, forwardRef } from 'react';

import {sys} from '@/lib/sys';
import {rootAction,useRootState} from '@/rootState';

import BraftEditor from 'braft-editor';

import 'braft-editor/dist/index.css'

export function valRichText(value){
  return value.toHTML();
}

export function valFile(value){
  return value.map(i=>i.response && i.response.url);
}

export function casFilter(inputValue, path) {
  return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export const UploadImg = forwardRef(({value, onChange}, ref) => {

  const handlePreview = async (file) =>{
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    rootAction('图片预览',{showImgPreview:true, imgPreviewSrc:file.url || file.preview});
  };


  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Fragment>
      <Upload
        action={sys.img_action}
        data={{sid:sys.sid}}
        listType="picture-card"
        fileList={value}
        onPreview={handlePreview}
        onChange={ ({ fileList }) => onChange(fileList) }
      >
        {value.length >= 4 ? null : uploadButton}
      </Upload>
    </Fragment>
  );

});

export const RichText = forwardRef((props, ref) => {
  return (
      <BraftEditor {...props}/>
  )
});

export const ImgPreview = () => {
  const {showImgPreview,imgPreviewSrc} = useRootState(); 
  return showImgPreview ? (
      <Modal visible={true} footer={null} onCancel={_=>rootAction('取消图片预览')}>
        <img style={{ width: '100%' }} src={imgPreviewSrc} />
      </Modal>
  ) : null;
};

export const Mask = props => {
  const {loading} = useRootState();
  return loading ?(
    <div className="pos-abs fx -o- w100 h100 z-1 bg-mask"><Spin /></div>
  ) : null;
};
