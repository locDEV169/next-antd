import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import styles from './styles.module.less';

interface DataType {
  key: React.Key;
  project?: string;
  naturalResource?: string;
  progress?: string;
  period?: string;
  status?: string;
}

const Project: NextPage = () => {
  const content = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <EditOutlined style={{ color: '#0A04F5', marginBottom: '10px' }} />
      <DeleteOutlined style={{ color: '#FC5640' }} />
    </div>
  );


  const columns: ColumnsType<DataType> = [
    {
      title: 'Project',
      dataIndex: 'project',
      // width: '120px',
      render: (name) => <div className={styles.projectName}>{name}</div>,
    },
    {
      title: 'Natural Resource',
      dataIndex: 'naturalResource',
      render: (name) => <div className={styles.naturalResource}>{name}</div>,
    },
    {
      title: 'Period (year)',
      dataIndex: 'period',
    },
    {
      title: 'Progress (%)',
      dataIndex: 'progress',
    },
    {
      title: 'Status',
      dataIndex: 'status',
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

  const data: DataType[] = [
    {
      key: '1',
      project: 'XXXX',
      naturalResource: 'Bach Ma Forest',
      period: '2024 - 2032',
      progress: '80%',
      status: 'In progress',
    },
    {
      key: '2',
      project: 'XXXX',
      naturalResource: 'Bach Ma Forest',
      period: '2024 - 2032',
      progress: '80%',
      status: 'In progress',
    },
    {
      key: '3',
      project: 'XXXX',
      naturalResource: 'Bach Ma Forest',
      period: '2024 - 2032',
      progress: '80%',
      status: 'In progress',
    },
    {
      key: '4',
      project: 'XXXX',
      naturalResource: 'Bach Ma Forest',
      period: '2024 - 2032',
      progress: '80%',
      status: 'In progress',
    },
    {
      key: '5',
      project: 'XXXX',
      naturalResource: 'Bach Ma Forest',
      period: '2024 - 2032',
      progress: '80%',
      status: 'In progress',
    },
  ];

  const onTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return <div>
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
        <Table columns={columns} dataSource={data} onChange={onTableChange} />
      </div>
    </div>
  </div>;
};

export default Project;
