import { FilterOutlined } from '@ant-design/icons';
import { Card, Image } from 'antd';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import styles from './styles.module.less';

const tabList = [
  {
    key: 'tab1',
    tab: 'My Wallet',
  },
  {
    key: 'tab2',
    tab: 'Transaction',
  },
];
const listCard = ['a', 'b', 'c', 'a', 'b', 'c'];

const contentList: Record<string, React.ReactNode> = {
  tab1: listCard.map((index) => (
    <div className={styles.contentImage} key={index}>
      <div className={styles.headerImg}>
        <div>
          <div className={styles.textImage}>Ba Den Forest of DaNang city</div>
          <div className={styles.description}>
            <div className={styles.titleDescription}>Environmental value:</div>
            <div style={{ margin: '10px 0 10px' }}>CO2</div>
            <div style={{ margin: '5px 0 0' }}>Purchased value: 100t</div>
            <div style={{ margin: '5px 0 0' }}>Purchased value: 100t</div>
            <div style={{ margin: '5px 0 0' }}>Purchased value: 100t</div>
          </div>
        </div>
      </div>
      <Image
        className={styles.image}
        src="https://media.gettyimages.com/id/544182028/photo/saint-remy-june-1889-oil-on-canvas-29-x-36-1-4-inches-located-in-the-museum-of-modern-art-new.jpg?s=612x612&w=gi&k=20&c=MYpUlJaAmAektVF22LDZLOeclgA9sDpjqtLy__j4sH8="
        preview={false}
      />
    </div>
  )),
  tab2: <p>Transaction</p>,
};

const MyWallet: NextPage = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>('tab1');

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <div>
      <div className={styles.headerTitle}>
        <div className={styles.title}>My Wallet</div>
      </div>
      <Card
        style={{ width: '100%' }}
        title={false}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
        tabBarExtraContent={<FilterOutlined style={{ fontSize: '20px', color: '#ffba00' }} />}
      >
        <div className={styles.card}>{contentList[activeTabKey]}</div>
      </Card>
    </div>
  );
};

export default MyWallet;
