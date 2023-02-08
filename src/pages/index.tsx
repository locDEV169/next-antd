import { Card, Tag } from 'antd';
import clsx from 'clsx';
import LayoutNaturalResouce from 'components/Layout-Natural-Resource';
import { useAppDispatch, useAppSelector } from 'hooks';
import type { NextPage } from 'next';
import { Fragment, useState } from 'react';
import { getHelloMessage } from 'store/ducks/hello/slide';
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
  const dispatch = useAppDispatch();
  const helloMessage = useAppSelector(getHelloMessage);
  const [activeTabKey, setActiveTabKey] = useState<string>('tab1');

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const listCard = ['a', 'b', 'c', 'a', 'b', 'c'];

  const contentList: Record<string, React.ReactNode> = {
    tab1: (
      <div className={styles.contentCard}>
        {listCard.map((item: any, index) => (
          <div className={styles.card} key={index}>
            <Card
              style={{ width: 500, margin: 20 }}
              cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
              // actions={[
              //   <SettingOutlined key="setting" />,
              //   <EditOutlined key="edit" />,
              //   <EllipsisOutlined key="ellipsis" />,
              // ]}
              key={index}
            >
              <Meta
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="City XXX"
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
              <Meta
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="City XXX"
                // description="This is the description"
              />
              <div className={styles.description}>
                <div className={styles.title}>XX Forest</div>
              </div>
              <Meta
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="City XXX"
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
        <LayoutNaturalResouce>
        </LayoutNaturalResouce>
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
