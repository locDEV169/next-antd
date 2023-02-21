import React from 'react';
import type { NextPage } from 'next';
import styles from './styles.module.less';
import clsx from 'clsx';
import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import { Button } from 'antd';
import { useRouter } from 'next/router';

interface DataType {
  key: React.Key;
  corporationInformation?: string;
  area?: string;
  naturalResourceType?: string;
  status?: string;
}

const BIDList: NextPage = () => {
  const router = useRouter()

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
      status: 'open',
      corporationInformation: 'Cameron Williamson',
      area: 'Toledo City',
      naturalResourceType: 'Forest',
    },
    {
      key: '2',
      status: 'open',
      corporationInformation: 'Cameron Williamson',
      area: 'Fairfield City',
      naturalResourceType: 'Forest',
    },
    {
      key: '3',
      status: 'open',
      corporationInformation: 'Jenny Wilson',
      area: 'Naperville City',
      naturalResourceType: 'Forest',
    },
    {
      key: '4',
      status: 'open',
      corporationInformation: 'Savannah Nguyen',
      area: 'Toledo City',
      naturalResourceType: 'Forest',
    },
    {
      key: '5',
      status: 'open',
      corporationInformation: 'Esther Howard',
      area: 'Fairfield City',
      naturalResourceType: 'Forest',
    },
    {
      key: '6',
      status: 'open',
      corporationInformation: 'Dianne Russell',
      area: 'Naperville City',
      naturalResourceType: 'Forest',
    },
    {
      key: '7',
      status: 'open',
      corporationInformation: 'Marvin McKinney',
      area: 'Austin City',
      naturalResourceType: 'Forest',
    },
    {
      key: '8',
      status: 'open',
      corporationInformation: 'Annette Black',
      area: 'Toledo City',
      naturalResourceType: 'Forest',
    },
    {
      key: '9',
      status: 'open',
      corporationInformation: 'Marvin McKinney',
      area: 'Toledo City',
      naturalResourceType: 'Forest',
    },
    {
      key: '10',
      status: 'open',
      corporationInformation: 'Annette Black',
      area: 'Ha Noi City ',
      naturalResourceType: 'Forest',
    },
    {
      key: '11',
      status: 'open',
      corporationInformation: 'Ronald Richards',
      area: 'Da Nang City',
      naturalResourceType: 'Forest',
    },
  ];

  const onTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onRowClick = () => {
    console.log('asd');
    router.push('/bid-list/view-detail')
  }

  return (
    <div>
      <div className={clsx(styles.title)}>Bid Management</div>
      <div className={styles.content}>
        <div className={styles.table}>
          <Table
            columns={columns}
            dataSource={data}
            onChange={onTableChange}
            onRow={(_record, _rowIndex) => {
              return {
                onClick: (_event) => {onRowClick()}, // click row
              };
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BIDList;
