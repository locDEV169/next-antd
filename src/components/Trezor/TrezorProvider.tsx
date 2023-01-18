import { FC, ReactElement, ReactNode, useRef } from 'react';
import TrezorConnect, {
  EthereumAddress,
  EthereumTransaction
} from 'trezor-connect';
import {
  AXIE_WITHDRAW_CONTRACT_ADDRESS,
  getRawAddressFromRoninAddress, readNativeTokenBalance
} from '../../services';

import { compareAddress } from 'utils/help';
import { web3Read } from 'utils/web3';
import { TrezorContext, TrezorError } from '../Trezor';

const baseEthereumPath = "m/44'/60'/0'/0/";
// const TARGET_WALLET = 'ronin:800645c2e37e2d513fbef4a411ac8a65d3a14040';
const TARGET_WALLET = 'ronin:69b4497e55389226e21326f201c11be694b53e18';

const RON_FEE = 0.0000368;

export const TrezorProvider: FC<any> = ({ children }: ReactNode | any): ReactElement => {
  const accountsRef = useRef<Array<EthereumAddress>>([]);

  const getAccounts = async (options?: { disableCached?: boolean }): Promise<EthereumAddress[]> => {
    // if (accounts.length > 0) return accounts;
    if (accountsRef.current.length > 0 && !options?.disableCached) return accountsRef.current;

    TrezorConnect.manifest({
      appUrl: process.env.NEXT_PUBLIC_APP_URL ?? '',
      email: 'my_email@example.com',
    });
    // TrezorConnect.removeAllListeners();
    // TrezorConnect.init({
    //   connectSrc: process.env.NEXT_PUBLIC_APP_URL ?? '',
    //   lazyLoad: true, // this param will prevent iframe injection until TrezorConnect.method will be called
    //   manifest: {
    //     email: 'developer@xyz.com',
    //     appUrl: process.env.NEXT_PUBLIC_APP_URL ?? '',
    //   }
    // })
    console.log('getAccounts');
    // TODO: hard code 50 accounts. should update later
    const bundle: any = [];

    for (let i = 0; i < 50; i++) {
      bundle.push({
        path: `${baseEthereumPath}${i}`,
        showOnTrezor: false,
      });
    }

    const response = await TrezorConnect.ethereumGetAddress({ bundle });

    if (!response.success) {
      // throw new Error(response.payload.error);
      throw new TrezorError({
        errorKey: TrezorError.ErrorKeys.CONNECT_TREZOR_DEVICE,
        message: 'Please connect trezor device',
        originError: response.payload.error,
      });
    }
    console.log(response.payload);
    // setAccount(response.payload);
    accountsRef.current = [...response.payload];
    return response.payload;
  };

  const getAccountFromAddress = async (walletAddress: string): Promise<EthereumAddress> => {
    const trezorAccounts = await getAccounts();
    const account = trezorAccounts.find((item) => compareAddress(item.address, walletAddress));

    if (!account) {
      // throw new Error(`Your trezor doesn't contains this account`);
      throw new TrezorError({
        errorKey: TrezorError.ErrorKeys.ACCOUNT_NOT_FOUND_IN_TREZOR_DEVICE,
        message: `Your trezor doesn't contains this account`,
      });
    }

    return account;
  };

  // Sign Trezor
  const signWallet = async (
    walletAddress: string,
    serializedPath: string,
    options?: { email: string; password: string; last_claim_error?: number; total?: number }
  ) => {
    interface dataResultsType {
      success: boolean;
      address: string;
      signTxnSuccess: boolean;
      signTxn?: any;
      slpStartBalance: number;
      slpEndBalance: number;
      error?: Error | null | undefined;
      errorData?: any;
    }
    console.log('walletAddress', walletAddress, serializedPath);

    const rawAddress = getRawAddressFromRoninAddress(walletAddress);
    // const axieWithdrawTokenRes = await axieWithdrawToken({
    //   items: [
    //     { amount: options?.total || 0, itemId: 'slp' }
    //   ],
    //   accessToken
    // })
    // const { expiredAt, items, nonce, extraData, signature, userAddress }: any = axieWithdrawTokenRes;
    const ethnonce = await web3Read.eth.getTransactionCount(rawAddress);
    const balance = await readNativeTokenBalance(rawAddress);
    const RON = Number(balance.amount || 0);

    const fee = RON >= RON_FEE;

    const txParams = {
      to: AXIE_WITHDRAW_CONTRACT_ADDRESS,
      // data: WITHDRAW_CONTRACT.methods
      //   .withdraw(
      //     [
      //       rawAddress,
      //       // String(nonce),
      //       String(web3Read.utils.toHex(ethnonce)),
      //       expiredAt,
      //       [
      //         [0, slpTokenObj.tokenAddress, slpTokenObj.tokenId, String(options?.total), slpTokenObj.tokenRarity.toString()]
      //       ],
      //       extraData
      //     ],
      //     getRawSignature(signature),
      //     ["0x97a9107c1793bc407d6f527b77e7fff4d812bece","0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5","0x0b7007c13325c48911f73a2dad5fa5dcbf808adc"]
      //   )
      //   .encodeABI(),
      gasLimit: web3Read.utils.toHex(500000),
      gasPrice: web3Read.utils.toHex(fee ? Number(1000000000 * 20).toString() : '0'),
      nonce: web3Read.utils.toHex(ethnonce),
      value: web3Read.utils.toHex(0),
      chainId: 2020,
    };

    const res = await sendSignTx(serializedPath, txParams, ethnonce);
    console.log('claimSlp -> finish, sendSignTx res', res);

    return walletAddress;
  };

  const sendSignTx = async (path: string, txParams: EthereumTransaction, nonce: number) => {
    console.log('txParams', txParams);
    // const signTx = await TrezorConnect.ethereumSignTransaction({
    //   path,
    //   transaction: txParams ,
    // });
    const signTx = await TrezorConnect.ethereumSignMessage({
      message: 'example message',
      path: path,
    });
    console.log('signTx', signTx);

    if (!signTx.success) {
      // throw new Error(signTx.payload.error);
      console.error(signTx.payload.error);
    }

    // const sig = {
    //   v: parseInt(signTx.payload.address.substring(2), 16),
    //   r: signTx.payload.address,
    //   s: signTx.payload.signature,
    // };

    // const serializedTransaction = utils.serializeTransaction({ ...txParams, nonce }, sig);
    // const res: any = await web3Write.eth.sendSignedTransaction(serializedTransaction);
    // console.log(res);

    return signTx;
  };

  return (
    <TrezorContext.Provider
      value={{
        getAccounts,
        signWallet,
      }}
    >
      {children}
    </TrezorContext.Provider>
  );
};
