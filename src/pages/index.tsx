import { Card, Space, Tag } from 'antd';
import clsx from 'clsx';
import { Button } from 'components/Button';
import { useAppDispatch, useAppSelector } from 'hooks';
import type { NextPage } from 'next';
import { getHelloMessage, setHelloMessage } from 'store/ducks/hello/slide';
import styles from './styles.module.less';

const { Meta } = Card;

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const helloMessage = useAppSelector(getHelloMessage);

  const listCard = ['a', 'b', 'c', 'a', 'b', 'c'];

  return (
    <div className={clsx(styles.main, 'container')}>
      <>
        <h3> Home page</h3>
        <Space direction="vertical">
          <Button onClick={() => dispatch(setHelloMessage('Hello world'))}>Say hello</Button>
          {helloMessage}
        </Space>
        <div className={styles.contentCard}>
          {listCard.map((index) => (
            <div className={styles.card}>
              <Card
                style={{ width: 420, margin: '20px' }}
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
      </>
    </div>
  );
};

export default Home;
