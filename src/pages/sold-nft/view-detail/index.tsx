import { CaretRightOutlined, LeftOutlined } from '@ant-design/icons';
import { Collapse, Image } from 'antd';
import Table, { ColumnsType, TableProps } from 'antd/lib/table';
import clsx from 'clsx';
import type { NextPage } from 'next';
import styles from './styles.module.less';

interface DataType {
  key: React.Key;
  image?: string;
  price?: string | number;
  ownedBy?: string;
  status?: string;
}

const { Panel } = Collapse;

const text = `
Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud.
`;

const ViewDetailSoldNFT: NextPage = () => {
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
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Owned by',
      dataIndex: 'ownedBy',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      image: '',
      price: '200ETH',
      ownedBy: 'a1dnsa....s3',
      status: 'Sold out',
    },
    {
      key: '2',
      image: '',
      price: '200ETH',
      ownedBy: 'a1dnsa....s3',
      status: 'Expired',
    },
    {
      key: '3',
      image: '',
      price: '200ETH',
      ownedBy: 'a1dnsa....s3',
      status: 'Sold out',
    },
    {
      key: '4',
      image: '',
      price: '200ETH',
      ownedBy: 'a1dnsa....s3',
      status: 'Sold out',
    },
    {
      key: '5',
      image: '',
      price: '200ETH',
      ownedBy: 'a1dnsa....s3',
      status: 'Sold out',
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className={styles.headerTitle}>
        <div className={styles.headerContent}>
          <div>
            <LeftOutlined style={{ fontSize: 20 }} />
          </div>
          <div className={styles.title}>Sold NFT Details</div>
        </div>
      </div>
      <div className={clsx(styles.firstLine)}>
        <div className={clsx(styles.left)}>
          <div className={styles.contentImage}>
            <div className={styles.headerImg}>
              <div className={styles.textImage}>Ba Den Forest of DaNang city</div>
              <div className={styles.description}>
                <div className={styles.titleDescription}>Environmental value:</div>
                <div className={clsx(styles.maginTop10)}>CO2</div>
                <div className={clsx(styles.maginTop10, styles.font)}>Period: 2024-2032</div>
                <div className={clsx(styles.maginTop10, styles.font)}>Estimated value: 4000t</div>
                <div className={clsx(styles.maginTop10, styles.font)}>Remaining value: 100t</div>
                <div className={clsx(styles.maginTop10, styles.font)}>Royalty Fee: 10%</div>
              </div>
            </div>
            <Image
              className={styles.image}
              src="https://img.freepik.com/free-vector/internet-network-warning-404-error-page-file-found-web-page-internet-error-page-issue-found-network-404-error-present-by-man-sleep-display_1150-55450.jpg?size=626&ext=jpg&ga=GA1.2.1004547509.1665458463&semt=ais"
              preview={false}
            />
          </div>
        </div>
        <div className={clsx(styles.right)}>
          <div className={clsx(styles.title)}>NFT Name: XXX</div>
          <div className={clsx(styles.firstLine, styles.font, styles.padding)}>Limit per wallet: 4000 Tons</div>
          <div className={clsx(styles.secondLine, styles.font, styles.padding)}>Royalty fee: 10%</div>
          <div className={clsx(styles.thirdLine, styles.font, styles.padding)}>Status: Expired</div>
          <div className={clsx(styles.fourLine, styles.font, styles.padding)}>Expiration: 05 years</div>
          <div className={clsx(styles.fiveLine, styles.fontItem)}>Current price: 20 ETH / Ton</div>
          <div className={clsx(styles.sixLine, styles.fontItem)}>Purchase: 100 Tons</div>
          <div className={clsx(styles.sevenLine, styles.fontItem)}>Total price: 2000 ETH</div>
        </div>
      </div>
      <div className={clsx(styles.secondLine)}>
        <div className={clsx(styles.left)}>
          <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            //   style={{ background: token.colorBgContainer }}
          >
            <Panel header="Description" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="Properties" key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="Detail" key="3">
              <div className={clsx(styles.maginTop10, styles.font)}>Period: 2024-2032</div>
              <div className={clsx(styles.maginTop10, styles.font)}>Estimated value: 4000t</div>
              <div className={clsx(styles.maginTop10, styles.font)}>Remaining value: 100t</div>
              <div className={clsx(styles.maginTop10, styles.font)}>Royalty Fee: 10%</div>
            </Panel>
          </Collapse>
        </div>
        <div className={clsx(styles.right)}>
          <div className={clsx(styles.title)}>List NFT</div>
          <div className={clsx(styles.table)}>
            <Table columns={columns} dataSource={data} onChange={onChange} scroll={{ y: `calc(100vh)` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailSoldNFT;
