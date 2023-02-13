import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import styles from './styles.module.less';

interface DataType {
  key: React.Key;
  environmentalValueType?: string;
  naturalResource?: string;
  price?: number | string;
  estimatedValue?: string;
  actualValue?: string;
  year?: number
}

const EnvironmentalValues: NextPage = () => {
  const content = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <EditOutlined style={{ color: '#0A04F5', marginBottom: '10px' }} />
      <DeleteOutlined style={{ color: '#FC5640' }} />
    </div>
  );

  const columns: ColumnsType<DataType> = [
    {
      title: 'Environmental Value Type',
      dataIndex: 'environmentalValueType',
      // width: '120px',
      render: (name) => <div className={styles.environmentalValueType}>{name}</div>,
    },
    {
      title: 'Natural Resource',
      dataIndex: 'naturalResource',
      render: (name) => <div className={styles.naturalResource}>{name}</div>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (name) => <div className={styles.period}>{`${name}`}</div>,
    },
    {
      title: 'Estimated Value ',
      dataIndex: 'estimatedValue',
    },
    {
      title: 'ActualValue',
      dataIndex: 'actualValue',
    },
    {
      title: 'Year',
      dataIndex: 'year',
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
      naturalResource: 'Bach Ma Forest',
      environmentalValueType: 'CO2',
      price: '200 ETH',
      estimatedValue: '1000 (Hectare)',
      actualValue: '900 (Hectare)',
      year: 2022
    },
    {
      key: '2',
      naturalResource: 'Bach Ma Forest',
      environmentalValueType: 'CO2',
      price: '200 ETH',
      estimatedValue: '1000 (Hectare)',
      actualValue: '900 (Hectare)',
      year: 2022
    },
    {
      key: '3',
      naturalResource: 'Bach Ma Forest',
      environmentalValueType: 'CO2',
      price: '200 ETH',
      estimatedValue: '1000 (Hectare)',
      actualValue: '900 (Hectare)',
      year: 2022
    },
    {
      key: '4',
      naturalResource: 'Bach Ma Forest',
      environmentalValueType: 'CO2',
      price: '200 ETH',
      estimatedValue: '1000 (Hectare)',
      actualValue: '900 (Hectare)',
      year: 2022
    },
    {
      key: '5',
      naturalResource: 'Bach Ma Forest',
      environmentalValueType: 'CO2',
      price: '200 ETH',
      estimatedValue: '1000 (Hectare)',
      actualValue: '900 (Hectare)',
      year: 2022
    },
  ];

  const onTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return <div><div className={styles.content}>
    <div className={styles.headerContent}>
      <Link href="/environmental-values/add-environmental-value">
        <Button type="primary" className={styles.buttonAdd}>
          <PlusOutlined />
          Add
        </Button>
      </Link>
    </div>
    <div className={styles.table}>
      <Table columns={columns} dataSource={data} onChange={onTableChange} />
    </div>
  </div></div>;
};

export default EnvironmentalValues;
