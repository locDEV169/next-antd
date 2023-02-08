import React from 'react';
import type { NextPage } from 'next';
import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import styles from './styles.module.less';

interface DataType {
  key: React.Key;
  name: string;
  walletAddress: string;
  email?: string;
  phoneNumber: number | string | any;
}

const Area: NextPage = () => {
  const columns: ColumnsType<DataType> = [
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
      <div className={styles.content}>
        <div className={styles.contentTotal}>{data.length} Admins in total</div>
        <div className={styles.table}>
          <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default Area;
