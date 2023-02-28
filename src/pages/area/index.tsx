import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import { authRequest } from 'api/axios';
import clsx from 'clsx';
import type { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';

interface DataType {
  key: React.Key;
  image?: string;
  area?: string;
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
    // try {
    //   const response = await authRequest.get(`${AREA_API}`, {});
    //   const { data } = response;
    //   setDataSource(data);
    // } catch (err) {
    //   notification.error({
    //     message: 'error message',
    //     description: 'error description',
    //   });
    //   setDataSource([]);
    // }
    const response = await authRequest.get(`${AREA_API}`, {});
    const { data } = response;
    setDataSource(data);
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(dataSource);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Area',
      dataIndex: 'name',
      render: (name) => <div className={styles.area}>{name}</div>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (description) => (
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }}></div>
      ),
    },
    {
      title: 'Custom Data',
      dataIndex: 'customData',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (name) => <div className={styles.status}>{name}</div>,
    },
    {
      title: '',
      dataIndex: 'popover',
      width: 120,
      render: (_text, _record) => (
        <div className={styles.tooltip} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
          <Button
            type="ghost"
            htmlType="submit"
            style={{ width: 85, height: 30 }}
            className={clsx(styles.buttonSubmit)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: 85, height: 30, margin: '10px 0px' }}
            className={clsx(styles.buttonSubmit)}
          >
            Remove
          </Button>
          <Button
            type="ghost"
            htmlType="submit"
            style={{ width: 85, height: 30 }}
            className={clsx(styles.buttonSubmit)}
          >
            Public
          </Button>
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
          <div className={clsx(styles.title)}>Area List</div>
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
