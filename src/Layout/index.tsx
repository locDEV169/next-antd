import React, { FC, useState } from 'react';
import styles from './styles.module.less';
import { Button, Layout, Modal, notification } from 'antd';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';
import { InjectedConnector } from '@wagmi/core';
import { useTrezor } from 'components/Trezor';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { web3Actions } from 'store/web3-slice';
import { useAppDispatch } from 'hooks';

const { Header, Content, Footer } = Layout;

const MainLayout: FC = ({ children }) => {
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

  return (
    <Layout className={styles.root}>
      <Header className={styles.header}>
        <div className={styles.headerLeft}>
          <div style={{ marginRight: '15px' }}>The LOGO</div>
          <Link href="/profile">Profile</Link>
        </div>
        <div className={styles.headerRight}>
          <Button type="primary" onClick={() => showModal()} className={styles.buttonConnect}>
            Connect Wallet
          </Button>
        </div>
        <Modal
          title="Connect a Wallet"
          open={openModal}
          onOk={hideModal}
          onCancel={hideModal}
          cancelText="Cancel"
          footer={null}
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
