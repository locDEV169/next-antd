import { Card, notification, Tag } from 'antd';
import { authRequest } from 'api/axios';
import clsx from 'clsx';
import LayoutNaturalResouce from 'components/Layout-Natural-Resource';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from './styles.module.less';

const { Meta } = Card;

const tabList = [
  {
    key: 'tab1',
    tab: 'General',
  },
  {
    key: 'tab2',
    tab: 'Natural resources management',
  },
];

const Home: NextPage = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>('tab1');
  // const nftApi = 'https://63e9f445e0ac9368d6471f16.mockapi.io/api/v1/nft';
  // const NFT_API = process.env.NFT_API
  const NFT_API = "http://localhost:5000/tokens"
  const [dataSource, setDataSource] = useState([]);

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const getData = async () => {
    try {
      const response = await authRequest.get(`${NFT_API}`, {});
      const { data } = response;
      setDataSource(data);
    } catch (err) {
      notification.error({
        message: 'error.message',
        description: 'error.description',
      });
      setDataSource([]);
    }
  };

  useEffect(() => {
    getData();
  }, [dataSource]);
  console.log('getData', dataSource);

  const contentList: Record<string, React.ReactNode> = {
    tab1: (
      <div className={styles.contentCard}>
        {dataSource && dataSource.map((item: any, index) => (
          <div className={styles.card} key={index}>
            <Card
              style={{ width: 500, margin: 20 }}
              cover={<img alt="example" src={item.imageUrl} width={500} height={300} />}
              // actions={[
              //   <SettingOutlined key="setting" />,
              //   <EditOutlined key="edit" />,
              //   <EllipsisOutlined key="ellipsis" />,
              // ]}
              key={index}
            >
              <Meta
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item.name}
              />
              <div className={styles.description}>
                <Meta
                  // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={item.enviromentValue}
                  // description="This is the description"
                />
                <div style={{ display: 'flex' }}>
                  <Tag color="default" className={styles.tags} style={{ marginLeft: '0px' }}>
                    co2
                  </Tag>
                  <Tag color="default" className={styles.tags}>
                    water
                  </Tag>
                  <Tag color="default" className={styles.tags}>
                    microorgainsm
                  </Tag>
                </div>
              </div>
              <Meta
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item.enviromentValue}
                // description="This is the description"
              />
              <div className={styles.description}>
                <div className={styles.title}>XX Forest</div>
              </div>
              <Meta
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item.enviromentValue}
              />
              <div className={styles.description}>
                <div className={styles.title}>XX Forest</div>
                <div style={{ display: 'flex' }}>
                  <Tag color="default" className={styles.tags} style={{ marginLeft: '0px' }}>
                    co2
                  </Tag>
                  <Tag color="default" className={styles.tags}>
                    water
                  </Tag>
                  <Tag color="default" className={styles.tags}>
                    microorgainsm
                  </Tag>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}>View Detail</div>
            </Card>
          </div>
        ))}
      </div>
    ),
    tab2: (
      <div style={{ padding: '0px !important' }}>
        <LayoutNaturalResouce></LayoutNaturalResouce>
      </div>
    ),
  };

  return (
    <div className={clsx(styles.main, 'container')} style={{ marginTop: 20 }}>
      <>
        <Card
          style={{ width: '100%', marginTop: 20 }}
          title={false}
          tabList={tabList}
          activeTabKey={activeTabKey}
          onTabChange={onTabChange}
        >
          <div className={styles.card}>{contentList[activeTabKey]}</div>
        </Card>
      </>
    </div>
  );
};

export default Home;
