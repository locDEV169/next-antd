import { SearchOutlined } from '@ant-design/icons';
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';
import { InjectedConnector } from '@wagmi/core';
import { Button, Input, Layout, Modal, notification, Select } from 'antd';
import { useTrezor } from 'components/Trezor';
import { useAppDispatch } from 'hooks';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC, useState } from 'react';
import { web3Actions } from 'store/web3-slice';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import styles from './styles.module.less';

const { Header, Content, Footer } = Layout;

const MainLayout: FC = ({ children }) => {
  const { data } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect({ connector: new InjectedConnector() });
  const { disconnectAsync } = useDisconnect();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { signMessageAsync } = useSignMessage();
  const { getAccounts, sendSignTx } = useTrezor();
  const dispatch = useAppDispatch();

  const showModal = () => {
    setOpenModal(true);
  };

  const hideModal = () => {
    setOpenModal(false);
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

  return (
    <Layout className={styles.root}>
      <Header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/">
            <div className={styles.headerLogo}>MITSUWA</div>
          </Link>
        </div>
        <div className={styles.headerCenter}>
          <Link href="/">
            <div className={styles.titleCenter}>Home</div>
          </Link>
          <Link href="/admin-management">
            <div className={styles.titleCenter}>admin management</div>
          </Link>
          <Link href="/">
            <div className={styles.titleCenter}>Environmental values</div>
          </Link>
          <Link href="/">
            <div className={styles.titleCenter}>bid list</div>
          </Link>
          <Link href="/">
            <div className={styles.titleCenter}>JCredit registration</div>
          </Link>
          <Link href="/">
            <div className={styles.titleCenter}>My wallet</div>
          </Link>
          <Input placeholder="search" className={styles.headerSearch} prefix={<SearchOutlined />} />
        </div>
        <div className={styles.headerRight}>
          {data?.user ? (
            <Button type="primary" onClick={() => handleDisconnect()} className={styles.addressConnect}>
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
        <div>{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>NEXTJS ©2021 Created by DEVTEAM</Footer>
    </Layout>
  );
};

export default MainLayout;
