import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, notification, Popover } from 'antd';
import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import type { NextPage } from 'next';
import Link from 'next/link';
import api from 'pages/api';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';

interface DataType {
  key: React.Key;
  projectId?: number;
  environmentalValueType?: string;
  naturalResource?: string;
  price?: number | string;
  year?: number;
  estimatedAmount?: string;
  actualAmount?: string;
  saleAmount?: number;
  furusatoAmount?: number;
  unit?: string;
  project?: Project;
}
interface Project {
  key: React.Key;
  areaId: 1;
  name: string;
  description?: string;
  fromYear?: number;
  toYear?: number;
  percent?: number;
  type?: string;
  area?: Area;
}
interface Area {
  key: React.Key;
  area?: string;
  discordLink?: string;
  description?: string;
  customData?: string;
  name?: string;
  origanization: Origanization;
}
interface Origanization {
  description?: string;
  discordUrl?: string;
  name?: string;
  royaltyReceiver?: string;
}

const EnvironmentalValues: NextPage = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  // const USER_API = process.env.USER_API;
  const BID_API = 'http://localhost:5000/enviromental-value';

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
  console.log('das', dataSource);

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <EditOutlined style={{ color: '#0A04F5', marginBottom: '10px' }} />
      <DeleteOutlined style={{ color: '#FC5640' }} />
    </div>
  );

  const columns: ColumnsType<DataType> = [
    {
      title: 'Environmental Value Type',
      dataIndex: 'project',
      // width: '120px',
      render: (_text, record) => {
        console.log(record);

        <div className={styles.environmentalValueType}>{record.environmentalValueType}</div>;
      },
    },
    {
      title: 'Estimated Value ',
      dataIndex: 'estimatedAmount',
    },
    {
      title: 'ActualValue',
      dataIndex: 'actualAmount',
    },
    {
      title: 'Furusato Amount',
      dataIndex: 'furusatoAmount',
    },
    {
      title: 'Sale Amount',
      dataIndex: 'saleAmount',
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
      // estimatedValue: '1000 (Hectare)',
      // actualValue: '900 (Hectare)',
      year: 2022,
    },
    {
      key: '2',
      naturalResource: 'Bach Ma Forest',
      environmentalValueType: 'CO2',
      price: '200 ETH',
      // estimatedValue: '1000 (Hectare)',
      // actualValue: '900 (Hectare)',
      year: 2022,
    },
    {
      key: '3',
      naturalResource: 'Bach Ma Forest',
      environmentalValueType: 'CO2',
      price: '200 ETH',
      // estimatedValue: '1000 (Hectare)',
      // actualValue: '900 (Hectare)',
      year: 2022,
    },
    {
      key: '4',
      naturalResource: 'Bach Ma Forest',
      environmentalValueType: 'CO2',
      price: '200 ETH',
      // estimatedValue: '1000 (Hectare)',
      // actualValue: '900 (Hectare)',
      year: 2022,
    },
    {
      key: '5',
      naturalResource: 'Bach Ma Forest',
      environmentalValueType: 'CO2',
      price: '200 ETH',
      // estimatedValue: '1000 (Hectare)',
      // actualValue: '900 (Hectare)',
      year: 2022,
    },
  ];

  const onTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.headerContent}>
          <Link href="/environmental-values/add-environmental-value">
            <Button type="primary" className={styles.buttonAdd}>
              <PlusOutlined />
              Add
            </Button>
          </Link>
        </div>
        <div className={styles.table}>
          <Table columns={columns} dataSource={dataSource} onChange={onTableChange} rowKey="id"/>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalValues;
