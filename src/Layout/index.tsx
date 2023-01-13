import React, { FC } from 'react';
import styles from './styles.module.less';
import { Layout } from 'antd';
import Link from 'next/link';

const { Header, Content, Footer } = Layout;

const MainLayout: FC = ({ children }) => {
  return (
    <Layout className={styles.root}>
      <Header className={styles.header}>
        <div>The LOGO</div>
        <Link href="/profile">Profile</Link>
      </Header>
      <Content style={{ padding: '0 50px', minHeight: '85vh' }}>
        <div>{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>NEXTJS ©2021 Created by DEVTEAM</Footer>
    </Layout>
  );
};

export default MainLayout;
