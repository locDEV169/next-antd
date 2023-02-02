import { DeleteOutlined, DownloadOutlined, EditTwoTone, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';
import type { NextPage } from 'next';
import React from 'react';
import styles from './styles.module.less';

interface DataType {
  key: React.Key;
  name: string;
  walletAddress: string;
  email?: string;
  phoneNumber: number | string | any;
}

const AdminManagement: NextPage = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Esther Howard',
          value: 'Esther Howard',
        },
        {
          text: 'Category 2',
          value: 'Category 2',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: string | number | boolean, record: any) => record.name.startsWith(value),
      width: '25%',
      render: (name) => (
        <div>
          <Avatar size="large" icon={<UserOutlined />} style={{ marginRight: 15 }} />
          {name}
        </div>
      ),
    },
    {
      title: 'Wallet Address',
      dataIndex: 'walletAddress',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: '',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      // onFilter: (value: string | number | boolean, record: any) => record.address.startsWith(value),
      sorter: (a, b) => a.phoneNumber - b.phoneNumber,
      filterSearch: true,
      width: '40%',
    },
    {
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <div>
          <EditTwoTone style={{ marginRight: 15 }} /> <DeleteOutlined style={{ color: '#FC5640' }} />
        </div>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'Esther Howard',
      walletAddress: '0x8ce7g9kl6hsk9jsh66sa99sa',
      email: 'kenzi.lawson@example.com',
      phoneNumber: '(405) 555-0128',
    },
    {
      key: '2',
      name: 'Jim Green',
      walletAddress: '0x8ce7g9kl6hsk9jsh66sa99sa',
      email: 'kenzi.lawson@example.com',
      phoneNumber: '(405) 555-0128',
    },
    {
      key: '3',
      name: 'Joe Black',
      walletAddress: '0x8ce7g9kl6hsk9jsh66sa99sa',
      email: 'kenzi.lawson@example.com',
      phoneNumber: '(405) 555-0128',
    },
    {
      key: '4',
      name: 'Esther Howard',
      walletAddress: '0x8ce7g9kl6hsk9jsh66sa99sa',
      email: 'kenzi.lawson@example.com',
      phoneNumber: '(405) 555-0128',
    },
    {
      key: '5',
      name: 'Esther Howard',
      walletAddress: '0x8ce7g9kl6hsk9jsh66sa99sa',
      email: 'kenzi.lawson@example.com',
      phoneNumber: '(405) 555-0128',
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className={styles.headerTitle}>
        <div className={styles.title}>Admin Management</div>
        <div className={styles.titelLeft}>
          <div className={styles.buttonAdd}>
            <Button type="primary" className={styles.buttonConnect} style={{ height: 40 }}>
              <PlusOutlined />
              Add New Admin
            </Button>
          </div>
          <div className={styles.buttonImport}>
            <Button type="primary" className={styles.buttonConnect} style={{ height: 40 }}>
              <DownloadOutlined />
              Import
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>Admin List</div>
        <div className={styles.contentTotal}>{data.length} Admins in total</div>
        <div className={styles.table}>
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
