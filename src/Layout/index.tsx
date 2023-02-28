import { AppstoreOutlined, MailOutlined, SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';
import { InjectedConnector } from '@wagmi/core';
import { Button, Drawer, Form, Input, Layout, Menu, MenuProps, Modal, notification, Select } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { useTrezor } from 'components/Trezor';
import { useAppDispatch } from 'hooks';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC, useState } from 'react';
import { web3Actions } from 'store/web3-slice';
import { useAccount, useConnect, useDisconnect, useNetwork, useSignMessage } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import styles from './styles.module.less';

const { Header, Content, Footer } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

// const items: MenuProps['items'] = [
//   getItem('Organization', 'sub1', <MailOutlined />),
//   getItem('Area management', 'sub2', <AppstoreOutlined />),
//   getItem('Project management', 'sub3', <SettingOutlined />),
//   getItem('Sales management', 'sub4'),
//   getItem('NFT management', 'sub5'),
//   getItem('JCredit registration', 'sub6'),
//   getItem('Profile', 'sub7'),
// ];

const MainLayout: FC = ({ children }) => {
  const { data } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect({ connector: new InjectedConnector() });
  const { disconnectAsync } = useDisconnect();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { signMessageAsync } = useSignMessage();
  const { getAccounts, sendSignTx } = useTrezor();
  const dispatch = useAppDispatch();
  const { chains } = useNetwork();

  const showModal = () => {
    setOpenModal(true);
  };

  const hideModal = () => {
    setOpenModal(false);
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const connectMetaMark = async () => {
    console.log('connectMetaMark');
    try {
      if (isConnected) {
        await disconnectAsync();
      }

      const { account, chain } = await connectAsync({
        connector: new MetaMaskConnector(),
      });
      console.log('-------------- ', account, chain);

      const challenge = await requestChallengeAsync({ address: account, chainId: chain.id });

      if (!challenge) {
        throw new Error('No challenge received');
      }

      const signature = await signMessageAsync({ message: challenge.message });
      // console.log('---------', signature);

      await signIn('moralis-auth', { message: challenge.message, signature, network: 'Evm', redirect: false });
      setOpenModal(false);
    } catch (e) {
      notification.error({
        message: 'Oops, something went wrong...',
        description: (e as { message: string })?.message,
        placement: 'bottomRight',
      });
    }
  };

  const connectCoinBase = async () => {
    console.log('connectCoinBase');
    try {
      if (isConnected) {
        await disconnectAsync();
      }

      const { account, chain } = await connectAsync({
        connector: new CoinbaseWalletConnector({
          // chains,
          options: {
            appName: 'Mitsuwa',
          },
        }),
      });
      // console.log('-------------- ', account, chain);

      const challenge = await requestChallengeAsync({ address: account, chainId: chain.id });

      if (!challenge) {
        throw new Error('No challenge received');
      }

      const signature = await signMessageAsync({ message: challenge.message });
      console.log('---------', signature);

      await signIn('moralis-auth', { message: challenge.message, signature, network: 'Evm', redirect: false });
      setOpenModal(false);
    } catch (e) {
      notification.error({
        message: 'Oops, something went wrong...',
        description: (e as { message: string })?.message,
        placement: 'bottomRight',
      });
    }
  };

  const connectWalletConnect = async () => {
    console.log('connectWalletConnect');
    try {
      if (isConnected) {
        await disconnectAsync();
      }

      const { account, chain } = await connectAsync({
        connector: new WalletConnectConnector({
          options: {
            qrcode: true,
          },
        }),
      });
      // console.log('-------------- ', account, chain);

      const challenge = await requestChallengeAsync({ address: account, chainId: chain.id });

      if (!challenge) {
        throw new Error('No challenge received');
      }

      const signature = await signMessageAsync({ message: challenge.message });

      await signIn('moralis-auth', { message: challenge.message, signature, network: 'Evm', redirect: false });
      setOpenModal(false);
    } catch (error) {
      notification.error({
        message: 'Oops, something went wrong...',
        description: (error as { message: string })?.message,
        placement: 'bottomRight',
      });
    }
  };

  const connectTrezor = async () => {
    console.log('connecTrezor');
    try {
      await getAccounts();
      const account = await getAccounts();
      console.log('connected Trezor', account);
      dispatch(web3Actions.setTrezorAccounts(account));
      // const challenge = await requestChallengeAsync({ address: account[0].address, chainId: chain.id });

      // if (!challenge) {
      //   throw new Error('No challenge received');
      // }

      // const signature = await signMessageAsync({ message: challenge.message });

      // await signIn('moralis-auth', { message: challenge.message, signature, network: 'Evm', redirect: false });
      const signTrezor = await sendSignTx();
      console.log('sign trezor', signTrezor.payload);
    } catch (error) {
      notification.error({
        message: 'Oops, something went wrong...',
        description: (error as { message: string })?.message,
        placement: 'bottomRight',
      });
    }
  };

  const handleDisconnect = async () => {
    await disconnectAsync();
    signOut({ callbackUrl: '/' });
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Layout className={styles.root}>
      <Header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/">
            <div className={styles.headerLogo}>MITSUWA</div>
          </Link>
        </div>
        <div className={styles.headerRight}>
          <Input placeholder="search" className={styles.headerSearch} prefix={<SearchOutlined />} />
          {data?.user ? (
            <Button type="primary" onClick={() => showDrawer()} className={styles.addressConnect}>
              {data.user.address}
            </Button>
          ) : (
            <Button type="primary" onClick={() => showModal()} className={styles.buttonConnect}>
              Connect Wallet
            </Button>
          )}
          <Select
            defaultValue="EN"
            style={{ width: 70, marginLeft: '10px' }}
            bordered={false}
            options={[
              {
                value: 'en',
                label: 'EN',
              },
              {
                value: 'jp',
                label: 'JP',
              },
            ]}
          />
        </div>
        <Modal
          title="Connect Your Wallet"
          open={openModal}
          onOk={hideModal}
          onCancel={hideModal}
          cancelText="Cancel"
          footer={null}
          className={styles.modalStyle}
        >
          <div className={styles.connectWallet}>
            <Button className={styles.buttonWallet} onClick={() => connectMetaMark()} style={{}}>
              <div className={styles.wallet}>
                <img
                  className={styles.walletIcon}
                  width={30}
                  height={30}
                  src="https://app.uniswap.org/static/media/metamask.02e3ec27.png"
                />
                MetaMark
              </div>
            </Button>
          </div>
          <div className={styles.connectWallet}>
            <Button className={styles.buttonWallet} onClick={() => connectCoinBase()}>
              <div className={styles.wallet}>
                <img
                  className={styles.walletIcon}
                  width={30}
                  height={30}
                  src="https://app.uniswap.org/static/media/coinbaseWalletIcon.a3a7d7fd.svg"
                />
                CoinBase
              </div>
            </Button>
          </div>
          <div className={styles.connectWallet}>
            <Button className={styles.buttonWallet} onClick={() => connectWalletConnect()}>
              <div className={styles.wallet}>
                <img
                  className={styles.walletIcon}
                  width={30}
                  height={30}
                  src="https://app.uniswap.org/static/media/walletConnectIcon.304e3277.svg"
                />
                WalletConnect
              </div>
            </Button>
          </div>
          <div className={styles.connectWallet}>
            <Button className={styles.buttonWallet} onClick={() => connectTrezor()}>
              <div className={styles.wallet}>
                <img
                  className={styles.walletIcon}
                  width={30}
                  height={30}
                  src="https://cdn-images-1.medium.com/max/1200/1*Sek00YxqMdOJp5FsjveZiQ.png"
                />
                Trezor
              </div>
            </Button>
          </div>
        </Modal>
      </Header>
      <Content style={{ padding: '0 50px', minHeight: '85vh' }}>
        <Layout style={{ display: 'flex', flexDirection: 'row' }}>
          <Sider width={250} style={{ backgroundColor: '#FFF' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['1']}
              // span={4}
              style={{
                height: '100vh',
                borderRight: 0,
                marginTop: '30px',
                maxHeight: '80vh',
                overflow: 'auto',
                overflowX: 'hidden',
              }}
            >
              <Menu.Item key="1">
                <Link href="/area" ><span>Area management</span></Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link href="/project" ><span>Project management</span></Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link href="/" ><span>Sales management</span></Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link href="/" ><span>NFT management</span></Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link href="/" ><span>JCredit registration</span></Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link href="/admin-management" ><span>Profile</span></Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ margin: 0, minHeight: 280 }}>{children}</Content>
          </Layout>
        </Layout>
        <Drawer title={false} placement="right" onClose={onClose} open={openDrawer}>
          <div className={styles.user}>
            <div>
              <div>Connected</div>
              <Button onClick={() => handleDisconnect()}>Log Out</Button>
            </div>
            <div className={styles.icon}>
              <UserOutlined style={{ fontSize: '50px' }} />
            </div>
          </div>
          <div className={styles.information}>
            <div>Wallet Connection:</div>
            <div className={styles.address}>{data?.user?.address}</div>
          </div>
          <div className={styles.connectChain}>
            <div>Connected Chain:</div>
            <div className={styles.chain}>
              {chains.map((chain) => (
                <div>{chain.name}</div>
              ))}
            </div>
          </div>
          <div>
            <Form
              name="basic"
              // labelCol={{ span: 8 }}
              // wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600, margin: '10px 0' }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
              className={styles.formLogin}
            >
              <Form.Item
                label="Display Name"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
                className={styles.name}
              >
                <Input style={{ width: 200 }} />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  { required: true, message: 'Please input your email!' },
                ]}
                className={styles.email}
              >
                <Input style={{ width: 200 }} />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                className={styles.password}
              >
                <Input.Password style={{ width: 200 }} />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ margin: '20px 0' }}>
                <Button type="primary" htmlType="submit">
                  Enable 2 FA
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Drawer>
      </Content>
      <Footer style={{ textAlign: 'center' }}>NEXTJS ©2021 Created by DEVTEAM</Footer>
    </Layout>
  );
};

export default MainLayout;
