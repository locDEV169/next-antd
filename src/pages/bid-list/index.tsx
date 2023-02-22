import { Button, notification } from 'antd';
import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import { authRequest } from 'api/axios';
import clsx from 'clsx';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';

interface DataType {
  id?: number;
  key: React.Key;
  name?: string;
  avatar?: string;
  corporationInformation?: string;
  area?: string;
  naturalResourceType?: string;
  status?: string;
  walletAddress?: string;
  emailAddress?: string;
  phoneNumber?: string;
  price?: number;
  royaltyFee?: number;
  limitPerWallet?: number;
  bidQuantity?: number;
}

const BIDList: NextPage = () => {
  const router = useRouter();
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  // const USER_API = process.env.USER_API;
  const BID_API = 'http://localhost:5000/bids';

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
  console.log('getData', dataSource);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Corporation Information',
      dataIndex: 'corporationInformation',
      //   width: '250px',
      render: (name) => <div className={styles.investor}>{name}</div>,
    },
    {
      title: 'Area',
      dataIndex: 'area',
      render: (name) => <div className={styles.nft}>{name}</div>,
    },
    {
      title: 'Natural Resource Type',
      dataIndex: 'naturalResourceType',
      render: (name) => <div className={styles.jCreditNo}>{`${name}`}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (name) => (
        <div className={styles.status}>
          <Button type="ghost" className={clsx(styles.borderStatus, styles.height40)} disabled>
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
      render: (_text, record) => (
        <div className={styles.buttonAction} style={{ cursor: 'pointer', display: 'flex' }}>
          <Button
            type="ghost"
            className={clsx(styles.buttonViewDetail, styles.height40, styles.borderRadius5)}
            onClick={() => onViewDetail(record)}
          >
            View Detail
          </Button>
          <Button
            type="ghost"
            className={clsx(styles.buttonReject, styles.height40, styles.borderRadius5)}
            onClick={() => onReject()}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  const onTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onViewDetail = (record: DataType) => {
    console.log('onViewDetail', record.id);
    router.push(`/bid-list/view-detail/${record.id}`);
  };

  const onReject = () => {
    console.log('reject');
  };

  return (
    <div>
      <div className={clsx(styles.title)}>Bid Management</div>
      <div className={styles.content}>
        <div className={styles.table}>
          <Table
            columns={columns}
            dataSource={dataSource}
            onChange={onTableChange}
            rowKey="id"
            // onRow={(record, _rowIndex) => {
            //   return {
            //     onClick: (_event) => {
            //       onRowClick(record);
            //     }, // click row
            //   };
            // }}
            scroll={{ y: `calc(100vh - 400px)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BIDList;
