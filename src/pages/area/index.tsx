import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, notification, Popover } from 'antd';
import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import { authRequest } from 'api/axios';
import type { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';

interface DataType {
  key: React.Key;
  image?: string;
  area?: string;
  discordUrl?: string;
  description?: string;
  customData?: string;
  name?: string;
  origanization: Origanization;
}
interface Origanization {
  description?: string;
  discordUrl?: string;
  name?: string;
  royaltyReceiver?: string;
}

const Area: NextPage = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const AREA_API = 'http://localhost:5000/area';

  const getData = async () => {
    try {
      const response = await authRequest.get(`${AREA_API}`, {});
      const { data } = response;
      setDataSource(data);
    } catch (err) {
      notification.error({
        message: 'error message',
        description: 'error description',
      });
      setDataSource([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(dataSource);

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <EditOutlined style={{ color: '#0A04F5', marginBottom: '10px' }} />
      <DeleteOutlined style={{ color: '#FC5640' }} />
    </div>
  );

  const columns: ColumnsType<DataType> = [
    {
      title: 'Image',
      dataIndex: 'image',
      width: '200px',
      render: (_nameImg) => (
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          className={styles.img}
        />
      ),
    },
    {
      title: 'Area',
      dataIndex: 'name',
      // width: '120px',
      render: (name) => <div className={styles.area}>{name}</div>,
    },
    {
      title: 'Discord Link',
      dataIndex: 'origanization',
      render: (item: Origanization) => <div className={styles.discordLink}>{item?.discordUrl}</div>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Custom Data',
      dataIndex: 'customData',
    },
    {
      title: '',
      dataIndex: 'popover',
      // key: 'x',
      render: (text, _record) => (
        <div className={styles.tooltip} style={{ cursor: 'pointer' }}>
          <Popover placement="leftBottom" title={text} content={content} trigger="click">
            ...
          </Popover>
        </div>
      ),
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.headerContent}>
          <div className={styles.contentTotal}>{dataSource.length} Areas in total</div>
          <Link href="/area/add-area">
            <Button type="primary" className={styles.buttonAdd}>
              <PlusOutlined />
              Add
            </Button>
          </Link>
        </div>
        <div className={styles.table}>
          <Table columns={columns} dataSource={dataSource} onChange={onChange} rowKey="id" />
        </div>
      </div>
    </div>
  );
};

export default Area;
