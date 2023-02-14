import { Button } from 'antd';
import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import clsx from 'clsx';
import type { NextPage } from 'next';
import React from 'react';
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
  const dateNow = new Date().toISOString().slice(0, 10);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Investor',
      dataIndex: 'investor',
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
      dataIndex: 'jCreditNo',
      render: (name) => <div className={styles.jCreditNo}>{`${name}`}</div>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (_name) => <div className={styles.date}>{`${dateNow}`}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (name) => (
        <div className={styles.status}>
          <Button className={clsx(styles.borderStatus, styles.height40)} disabled>
          {`${name}`}
          </Button>
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

  const data: DataType[] = [
    {
      key: '1',
      investor: 'Cameron Williamson',
      nft: 'ABC',
      jCreditNo: '123...765 - 324',
      status: 'open',
    },
    {
      key: '2',
      investor: 'Jenny Wilson',
      nft: 'nft 2',
      jCreditNo: '123...765 - 324',
      status: 'open',
    },
    {
      key: '3',
      investor: 'Savannah Nguyen',
      nft: 'nft 3',
      jCreditNo: '123...765 - 324',
      status: 'open',
    },
    {
      key: '4',
      investor: 'Esther Howard',
      nft: 'nft 4',
      jCreditNo: '123...765 - 324',
      status: 'open',
    },
    {
      key: '5',
      investor: 'Dianne Russell',
      nft: 'nft 5',
      jCreditNo: '123...765 - 324',
      status: 'open',
    },
    {
      key: '6',
      investor: 'Esther Howard',
      nft: 'nft 6',
      jCreditNo: '123...765 - 324',
      status: 'open',
    },
    {
      key: '7',
      investor: 'Dianne Russell',
      nft: 'nft 7',
      jCreditNo: '123...765 - 324',
      status: 'open',
    },
    {
      key: '8',
      investor: 'Marvin McKinney',
      nft: 'nft 8',
      jCreditNo: '123...765 - 324',
      status: 'open',
    },
    {
      key: '9',
      investor: 'Marvin McKinney',
      nft: 'nft 9',
      jCreditNo: '123...765 - 324',
      status: 'open',
    },
    {
      key: '10',
      investor: 'Marvin McKinney',
      nft: 'nft 10',
      jCreditNo: '123...765 - 324',
      status: 'open',
    },
    {
      key: '11',
      investor: 'Dianne Russell',
      nft: 'nft 11',
      jCreditNo: '123...765 - 324',
      status: 'open',
    },
  ];

  const onTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className={clsx(styles.title)}>Tokyo City</div>
      <div className={styles.content}>
        <div className={styles.table}>
          <Table columns={columns} dataSource={data} onChange={onTableChange} />
        </div>
      </div>
    </div>
  );
};

export default JCreditRegistration;
