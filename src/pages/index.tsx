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
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { mainnet, optimism } from 'wagmi/chains'
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
      // if (isConnected) {
      //   await disconnectAsync();
      // }
      await disconnectAsync();
      console.log("xxxxxx");
      
      // const { account, chain } = await connectAsync();
      const { account, chain } = await connectAsync({
        connector: new MetaMaskConnector()
      });
      console.log('-------------- ', account, chain);

      const message = await requestChallengeAsync({ address: account, chainId: chain.id });
      console.log('challenge', message);  
      if (!message) {
        console.log('xxxx', message);
        throw new Error('No challenge received');
      }

      const signature = await signMessageAsync({ message: message.message });
      console.log('---------', signature);
      await signIn('moralis-auth', { message: message.message, signature, network: 'Evm', redirect: false });
      
    } catch (e) {
      console.log('aaaa', e);
      notification.info({
        message: 'Oops, something went wrong...',
        description: (e as { message: string })?.message,
        placement: 'bottomRight',
      });
    }
  };

  const connectCoinBase = () => {
    console.log('connectCoinBase');
  };

  const connectWalletConnect = () => {
    console.log('connectWalletConnect');
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
