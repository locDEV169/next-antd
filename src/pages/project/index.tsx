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
  areaId: 1;
  name: string;
  description?: string;
  fromYear?: number;
  toYear?: number;
  percent?: number;
  type?: string;
  area?: Area
}
interface Area {
  key: React.Key;
  area?: string;
  discordLink?: string;
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

const Project: NextPage = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  // const USER_API = process.env.USER_API;
  const BID_API = 'http://localhost:5000/projects';

  const getData = async () => {
    try {
      const response = await authRequest.get(`${BID_API}`, {});
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
  console.log('das', dataSource);

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <EditOutlined style={{ color: '#0A04F5', marginBottom: '10px' }} />
      <DeleteOutlined style={{ color: '#FC5640' }} />
    </div>
  );

  const columns: ColumnsType<DataType> = [
    {
      title: 'Project',
      dataIndex: 'name',
      // width: '120px',
      render: (name) => <div className={styles.projectName}>{name}</div>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (name) => <div className={styles.naturalResource}>{name}</div>,
    },
    {
      title: 'Period (year)',
      dataIndex: ['fromYear', 'toYear'],
      render: (_text, record: any) => (
        <div className={styles.naturalResource}>
          {record.fromYear} - {record.toYear}
        </div>
      ),
    },
    {
      title: 'Progress (%)',
      dataIndex: 'percent',
    },
    {
      title: 'Status',
      dataIndex: 'type',
    },
    {
      title: '',
      dataIndex: 'popover',
      // key: 'x',
      render: (text, _record) => (
        <div className={styles.tooltip} style={{ cursor: 'pointer' }}>
          <Popover placement="leftBottom" title={text} content={content} trigger="hover">
            ...
          </Popover>
        </div>
      ),
    },
  ];

  const onTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.headerContent}>
          <Link href="/project/add-project">
            <Button type="primary" className={styles.buttonAdd}>
              <PlusOutlined />
              Add
            </Button>
          </Link>
        </div>
        <div className={styles.table}>
          <Table columns={columns} dataSource={dataSource} onChange={onTableChange} rowKey="id" />
        </div>
      </div>
    </div>
  );
};

export default Project;
