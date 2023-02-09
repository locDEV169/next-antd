import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import styles from './styles.module.less';

interface DataType {
  key: React.Key;
  image?: string;
  area?: string;
  discordLink?: string;
  description?: string;
  contribution?: string;
}

const Area: NextPage = () => {
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
      dataIndex: 'area',
      // width: '120px',
      render: (name) => <div className={styles.area}>{name}</div>,
    },
    {
      title: 'Discord Link',
      dataIndex: 'discordLink',
      render: (name) => <div className={styles.discordLink}>{name}</div>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Contribution',
      dataIndex: 'contribution',
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
      area: 'Da Nang City',
      discordLink: 'https://chrome.google.com/webstore/detail/authenticator',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.... ',
      contribution:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.... ',
    },
    {
      key: '2',
      area: 'Da Nang City',
      discordLink: 'https://chrome.google.com/webstore/detail/authenticator',
      contribution:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.... ',
    },
    {
      key: '3',
      area: 'Da Nang City',
      discordLink: 'https://chrome.google.com/webstore/detail/authenticator',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.... ',
      contribution:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.... ',
    },
    {
      key: '4',
      area: 'Da Nang City',
      discordLink: 'https://chrome.google.com/webstore/detail/authenticator',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.... ',
      contribution:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.... ',
    },
    {
      key: '5',
      area: 'Da Nang City',
      discordLink: 'https://chrome.google.com/webstore/detail/authenticator',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.... ',
      contribution:
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
          <div className={styles.contentTotal}>{data.length} Admins in total</div>
          <Link href="/area/add-area">
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

export default Area;
