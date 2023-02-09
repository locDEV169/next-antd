import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popover, TableProps } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import styles from './styles.module.less';

interface DataType {
  key: React.Key;
  naturalResource?: string;
  image?: string;
  area?: string;
  title?: string;
  type?: string;
  description?: string;
  acreage?: number | string;
}

const NaturalResource: NextPage = () => {
  const content = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <EditOutlined style={{ color: '#0A04F5', marginBottom: '10px' }} />
      <DeleteOutlined style={{ color: '#FC5640' }} />
    </div>
  );

  const columns: ColumnsType<DataType> = [
    {
      title: 'Natural resource',
      dataIndex: 'naturalResource',
      render: (name) => <div className={styles.area}>{name}</div>,
    },
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
      dataIndex: 'area',
      render: (name) => <div className={styles.area}>{name}</div>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (name) => <div className={styles.title}>{name}</div>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (name) => <div className={styles.type}>{name}</div>,
    },
    {
      title: 'Acreage',
      dataIndex: 'acreage',
      render: (name) => <div className={styles.acreage}>{name}</div>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
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

  const data: DataType[] = [
    {
      key: '1',
      naturalResource: 'Bach Ma Forest',
      area: 'Da Nang City',
      title: 'Forest',
      type: 'Forest',
      acreage: '1000 (Hectare)',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.... ',
    },
    {
      key: '2',
      naturalResource: 'Bach Ma Forest',
      area: 'Da Nang City',
      title: 'Forest',
      type: 'Forest',
      acreage: '1000 (Hectare)',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.... ',
    },
    {
      key: '3',
      naturalResource: 'Bach Ma Forest',
      area: 'Da Nang City',
      title: 'Forest',
      type: 'Forest',
      acreage: '1000 (Hectare)',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.... ',
    },
    {
      key: '4',
      naturalResource: 'Bach Ma Forest',
      area: 'Da Nang City',
      title: 'Forest',
      type: 'Forest',
      acreage: '1000 (Hectare)',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.... ',
    },
    {
      key: '5',
      naturalResource: 'Bach Ma Forest',
      area: 'Da Nang City',
      title: 'Forest',
      type: 'Forest',
      acreage: '1000 (Hectare)',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.... ',
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.headerContent}>
          <Link href="/natural-resources/add-natural-resource">
            <Button type="primary" className={styles.buttonAdd}>
              <PlusOutlined />
              Add
            </Button>
          </Link>
        </div>
        <div className={styles.table}>
          <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default NaturalResource;
