import { FilterOutlined } from '@ant-design/icons';
import { Button, Card, Form, Image, Input, Modal } from 'antd';
import clsx from 'clsx';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import styles from './styles.module.less';

const tabList = [
  {
    key: 'tab1',
    tab: 'Remaining Values',
  },
  {
    key: 'tab2',
    tab: 'Sold NFT',
  },
];

const listCard = ['a', 'b', 'c'];
const listImg = ['a', 'b', 'c'];

const Profile: NextPage = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>('tab1');
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const contentList: Record<string, React.ReactNode> = {
    tab1: (
      <div className={clsx(styles.remainingValues)}>
        {listCard.map((index) => (
          <div key={index} className={styles.card}>
            <div className={clsx(styles.headerTitle)}>Da Nang City</div>
            <div className={clsx(styles.listImg)}>
              {listImg.map((index) => (
                <div className={styles.contentImage} key={index}>
                  <div className={styles.headerImg}>
                    <div className={styles.textImage}>Ba Den Forest of DaNang city</div>
                    <div className={styles.description}>
                      <div className={styles.titleDescription}>Environmental value:</div>
                      <div style={{ margin: '10px 0 10px' }}>CO2</div>
                      <div style={{ margin: '5px 0 0' }}>Estimated value: 4000t</div>
                      <div style={{ margin: '5px 0 0' }}>Remaining value: 100t</div>
                    </div>
                    <div className={clsx(styles.buttonFurusato)}>
                      <Button type="primary" className={styles.buttonAdd} onClick={() => showModal()}>
                        Furusato
                      </Button>
                    </div>
                  </div>
                  <Image
                    className={styles.image}
                    src="https://img.freepik.com/free-vector/internet-network-warning-404-error-page-file-found-web-page-internet-error-page-issue-found-network-404-error-present-by-man-sleep-display_1150-55450.jpg?size=626&ext=jpg&ga=GA1.2.1004547509.1665458463&semt=ais"
                    preview={false}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <Modal
          title="Furusato Mint NFT"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={false}
          centered
          width={800}
        >
          <div className={clsx(styles.modalFurusato)}>
            <div className={clsx(styles.left)}>
              <Image
                className={styles.image}
                src="https://img.freepik.com/free-vector/internet-network-warning-404-error-page-file-found-web-page-internet-error-page-issue-found-network-404-error-present-by-man-sleep-display_1150-55450.jpg?size=626&ext=jpg&ga=GA1.2.1004547509.1665458463&semt=ais"
                preview={false}
              />
            </div>
            <div className={clsx(styles.right)}>
              <Form
                name="formFurusatoMintNFT"
                initialValues={{ remember: true }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={clsx(styles.formAddFurusatoMintNFT)}
              >
                <div className={clsx(styles.firstLine)}>
                  <Form.Item
                    label="Area "
                    name="area"
                    rules={[{ required: true, message: 'Please input your Area !' }]}
                    className={clsx(styles.area)}
                  >
                    <Input placeholder="Enter the Area" />
                  </Form.Item>
                </div>
                <div className={clsx(styles.secondLine)}>
                  <Form.Item
                    label="Wallet Address "
                    name="walletAddress"
                    rules={[{ required: true, message: 'Please input your Wallet Address !' }]}
                    className={clsx(styles.walletAddress)}
                  >
                    <Input placeholder="Enter the Wallet Address" />
                  </Form.Item>
                </div>
                <div className={clsx(styles.thirdLine)}>
                  <Form.Item
                    label="Limit Per Wallet"
                    name="limitPerWallet"
                    rules={[{ required: true, message: 'Please input your Limit Per Wallet !' }]}
                    className={clsx(styles.walletAddress)}
                  >
                    <Input placeholder="Enter the Limit Per Wallet" />
                  </Form.Item>
                </div>
                <div className={clsx(styles.fourLine)}>
                  <Form.Item
                    label="Royalty Fee"
                    name="royaltyFee"
                    rules={[{ required: true, message: 'Please input your Royalty Fee !' }]}
                    className={clsx(styles.walletAddress)}
                  >
                    <Input placeholder="Enter the Royalty Fee" />
                  </Form.Item>
                </div>
                <div className={clsx(styles.fiveLine)}>
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your Price!' }]}
                    className={clsx(styles.walletAddress)}
                  >
                    <Input placeholder="Enter the Price" />
                  </Form.Item>
                </div>
                <div className={clsx(styles.sixLine)}>
                  <Form.Item
                    label="Current Price"
                    name="currentPrice"
                    rules={[{ required: true, message: 'Please input your Current Price!' }]}
                    className={clsx(styles.walletAddress)}
                  >
                    <Input placeholder="Enter the Current Price" />
                  </Form.Item>
                </div>
                <div className={clsx(styles.sevenLine)}>
                  <Form.Item
                    label="Purchased Value:"
                    name="purchasedValue:"
                    rules={[{ required: true, message: 'Please input your Purchased Value!' }]}
                    className={clsx(styles.walletAddress)}
                  >
                    <Input placeholder="Enter the Purchased Value" />
                  </Form.Item>
                </div>
                <div className={clsx(styles.eightLine)}>
                  {/* <Form.Item
                    label="Total price"
                    name="totalPrice"
                    className={clsx(styles.walletAddress)}
                    // style={{display: 'none'}}
                  >
                    <Input style={{display: 'none'}}/>
                  </Form.Item> */}
                  <div>Total Price : </div>
                </div>
                <div className={styles.button}>
                  <Button type="primary" htmlType="submit" className={clsx(styles.buttonSubmit)}>
                    Mint
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    ),
    tab2: <div style={{ padding: '0px !important' }}>sold NFT</div>,
  };

  return (
    <div>
      <Card
        style={{ width: '100%', marginTop: 20 }}
        title={false}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
        tabBarExtraContent={<FilterOutlined style={{ fontSize: '20px', color: '#5C913B' }} />}
      >
        <div className={styles.card}>{contentList[activeTabKey]}</div>
      </Card>
    </div>
  );
};

export default Profile;
