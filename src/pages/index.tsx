import { useAuthRequestChallengeEvm } from '@moralisweb3/next';
import { InjectedConnector } from '@wagmi/core';
import { Modal, notification, Space } from 'antd';
import clsx from 'clsx';
import { Button } from 'components/Button';
import { useAppDispatch, useAppSelector } from 'hooks';
import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { getHelloMessage, setHelloMessage } from 'store/ducks/hello/slide';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import styles from './styles.module.less';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const helloMessage = useAppSelector(getHelloMessage);
  const [openModal, setOpenModal] = useState(false);
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect({ connector: new InjectedConnector() });
  const { disconnectAsync } = useDisconnect();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { signMessageAsync } = useSignMessage();

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

  const connecTrezor = () => {
    console.log('connecTrezor');
  };

  return (
    <div className={clsx(styles.main, 'container')}>
      <>
        <h3> Home page</h3>
        <Space direction="vertical">
          <Button onClick={() => dispatch(setHelloMessage('Hello world'))}>Say hello</Button>
          {helloMessage}
          <Button type="primary" onClick={showModal}>
            Connect a Wallet
          </Button>
          <Modal title="Connect a Wallet" open={openModal} onOk={hideModal} onCancel={hideModal} cancelText="Cancel">
            <div className={styles.connectWallet}>
              <Button className={styles.buttonWallet} onClick={() => connectMetaMark()}>
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
              <Button className={styles.buttonWallet} onClick={() => connecTrezor()}>
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
        </Space>
      </>
    </div>
  );
};

export default Home;
