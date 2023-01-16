import { Layout } from 'antd';
import { Button } from 'components/Button';
import Link from 'next/link';
import { FC } from 'react';
import styles from './styles.module.less';

const { Header, Content, Footer } = Layout;

const MainLayout: FC = ({ children }) => {
  return (
    <Layout className={styles.root}>
      <Header className={styles.header}>
        <div className={styles.headerLeft}>
          <div style={{ marginRight: '15px' }}>The LOGO</div>
          <Link href="/profile">Profile</Link>
        </div>
        <div className={styles.headerRight}>
          <Button type="primary">
            Connect Wallet
          </Button>
        </div>
      </Header>
      <Content style={{ padding: '0 50px', minHeight: '85vh' }}>
        <div>{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>NEXTJS ©2021 Created by DEVTEAM</Footer>
    </Layout>
  );
};

export default MainLayout;
