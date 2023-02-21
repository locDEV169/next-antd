import { Button, notification } from 'antd';
import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import clsx from 'clsx';
import moment from "moment";
import type { NextPage } from 'next';
import api from 'pages/api';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';

interface DataType {
  key: React.Key;
  investor?: string;
  nft?: string;
  jCreditNo?: string;
  date?: DataType;
  status?: string;
}

const JCreditRegistration: NextPage = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  // const USER_API = process.env.USER_API;
  const BID_API = 'http://localhost:5000/credit_register';

  const getData = async () => {
    try {
      const response = await api.get(`${BID_API}`, {});
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

  const columns: ColumnsType<DataType> = [
    {
      title: 'Investor',
      dataIndex: 'investorName',
      width: '250px',
      render: (name) => <div className={styles.investor}>{name}</div>,
    },
    {
      title: 'NFT',
      dataIndex: 'nft',
      render: (name) => <div className={styles.nft}>{name}</div>,
    },
    {
      title: 'JCredit.No',
      dataIndex: 'corporationInfo',
      render: (name) => <div className={styles.jCreditNo}>{`${name}`}</div>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (time) => <div className={styles.date}>{formatDate(time)}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (name) => (
        <div className={styles.status}>
          <Button className={clsx(styles.borderStatus, styles.height40)} disabled>{`${name}`}</Button>
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'popover',
      // key: 'x',
      width: '300px',
      render: (_text, _record) => (
        <div className={styles.buttonAction} style={{ cursor: 'pointer', display: 'flex' }}>
          <Button type="ghost" className={clsx(styles.buttonViewDetail, styles.height40, styles.borderRadius5)}>
            View Detail
          </Button>
          <Button type="ghost" className={clsx(styles.buttonReject, styles.height40, styles.borderRadius5)}>
            Reject
          </Button>
        </div>
      ),
    },
  ];

  const onTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const formatDate = (value: string) => {
    const date = moment(value).format("DD/MM/YYYY");
    return date
  };

  return (
    <div>
      <div className={clsx(styles.title)}>Tokyo City</div>
      <div className={styles.content}>
        <div className={styles.table}>
          <Table columns={columns} dataSource={dataSource} onChange={onTableChange} rowKey="id" />
        </div>
      </div>
    </div>
  );
};

export default JCreditRegistration;
