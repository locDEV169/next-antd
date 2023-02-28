import { PlusOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import { authRequest } from 'api/axios';
import clsx from 'clsx';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './styles.module.less';

interface DataType {
  id?: number;
  areaId?: number;
  name?: string;
  description?: string;
  fromYear?: number;
  toYear?: number;
  percent?: number;
  type?: string;
  area?: Area;
}
interface Area {
  id: number;
  area?: string;
  discordLink?: string;
  description?: string;
  customData?: string;
  name?: string;
  origanization: Origanization;
}
interface Origanization {
  id?: number;
  description?: string;
  discordUrl?: string;
  name?: string;
  royaltyReceiver?: string;
}

const Project: NextPage = () => {
  const [dataSource, setDataSource] = useState<any | DataType>([]);
  // const USER_API = process.env.USER_API;
  const PROJECT_API = 'http://localhost:5000/projects';

  const getData = async () => {
    try {
      const response = await authRequest.get(`${PROJECT_API}`);
      const { data } = response;
      console.log(data);

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

  const columns: ColumnsType<any> = [
    {
      title: 'Project',
      dataIndex: 'name',
      // width: '120px',
      render: (name) => <div className={styles.projectName}>{name}</div>,
    },
    {
      title: 'Area',
      dataIndex: 'area',
      render: (_text, record: any) => <div className={styles.projectName}>{record.area?.name}</div>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (name) => <div className={styles.type}>{name}</div>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (name) => <div className={styles.price}>{name}</div>,
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
      title: 'Status',
      dataIndex: 'status',
      render: (name) => <div className={styles.status}>{name}</div>,
    },
    {
      title: '',
      dataIndex: 'popover',
      // key: 'x',
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

  const onTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.headerContent}>
          <div className={clsx(styles.title)}>Project List</div>
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
