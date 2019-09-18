import { Button, Card, Icon, Steps, Result, Descriptions } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Fragment } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import {router} from 'umi';

export default () => (
  <GridContent>
    <Card bordered={false}>
      <Result
        status="success"
        title="执行成功"
        subTitle="请继续操作"
        extra={extra}
        style={{
          marginBottom: 16,
        }}
      >

      </Result>
    </Card>
  </GridContent>
);

const extra = (
  <Fragment>
    <Button type="primary" onClick={_=>router.goBack()}>
      返回
    </Button>
  </Fragment>
);