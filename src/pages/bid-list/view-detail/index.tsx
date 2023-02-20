import { LeftOutlined, LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Image, Modal, Row, Steps } from 'antd';
import clsx from 'clsx';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import styles from './styles.module.less';

const ViewDetail: NextPage = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const showModal = () => {
    setOpenModal(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpenModal(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpenModal(false);
  };

  return (
    <Fragment>
      <div className={styles.headerTitle}>
        <div className={styles.headerContent}>
          <div className={clsx(styles.headerLeft)}>
            <LeftOutlined style={{ fontSize: 20 }} onClick={() => router.back()} />
            <div className={styles.title}>Bid Detail</div>
          </div>
        </div>
      </div>
      <Row className={clsx(styles.content)}>
        <Col span={8}>
          <div className={clsx(styles.left)}>
            <Image
              className={styles.image}
              src="https://img.freepik.com/free-vector/internet-network-warning-404-error-page-file-found-web-page-internet-error-page-issue-found-network-404-error-present-by-man-sleep-display_1150-55450.jpg?size=626&ext=jpg&ga=GA1.2.1004547509.1665458463&semt=ais"
              preview={false}
              style={{ maxWidth: 450, width: '100%' }}
            />
          </div>
        </Col>
        <Col span={16}>
          <div className={clsx(styles.right)}>
            <div className={clsx(styles.title)}>Corporation Information</div>
            <Row className={clsx(styles.firstLine)}>
              <Col span={8}>Name:</Col>
              <Col span={16}>Ronald Richards</Col>
            </Row>
            <Row className={clsx(styles.secondLine)}>
              <Col span={8}>Wallet Address:</Col>
              <Col span={16}>7ce8ds0ds8ds6dssa...7xs</Col>
            </Row>
            <Row className={clsx(styles.thirdLine)}>
              <Col span={8}>Email Address:</Col>
              <Col span={16}>debbie.baker@example.com</Col>
            </Row>
            <Row className={clsx(styles.fourLine)}>
              <Col span={8}>Phone Number:</Col>
              <Col span={16}>(406) 555-0120</Col>
            </Row>
            <div className={clsx(styles.title)} style={{ margin: '30px 0 0' }}>
              Bid Information
            </div>
            <Row className={clsx(styles.firstLine)}>
              <Col span={8}>Price:</Col>
              <Col span={16}>20 ETH / 1 Ton</Col>
            </Row>
            <Row className={clsx(styles.secondLine)}>
              <Col span={8}>Royalty fee:</Col>
              <Col span={16}>10%</Col>
            </Row>
            <Row className={clsx(styles.thirdLine)}>
              <Col span={8}>Limit per wallet:</Col>
              <Col span={16}>4000 Tons</Col>
            </Row>
            <Row className={clsx(styles.fourLine)}>
              <Col span={8}>Bid Quantity:</Col>
              <Col span={16} className={clsx(styles.bid)}>
                1000
              </Col>
            </Row>
            <Row className={clsx(styles.fiveLine)}>
              <Col span={8}>Total Price:</Col>
              <Col span={16}>(406) 20,000 ETH</Col>
            </Row>
          </div>
        </Col>
      </Row>
      <div className={clsx(styles.buttonAction)}>
        <Button
          type="dashed"
          htmlType="submit"
          style={{ marginRight: 20 }}
          className={clsx(styles.buttonSubmit, styles.buttonDanger)}
          onClick={showModal}
        >
          Reject
        </Button>
        <Button type="primary" htmlType="submit" className={clsx(styles.buttonSubmit)}>
          Accept & Mint NFT
        </Button>
      </div>
      <div className={clsx(styles.progress)}>
        <Steps
          items={[
            {
              title: 'Verify email',
              status: 'finish',
              icon: <UserOutlined />,
            },
            {
              title: 'Authenticate Investor',
              status: 'finish',
              icon: <SolutionOutlined />,
            },
            {
              title: 'Payment',
              status: 'process',
              icon: <LoadingOutlined />,
            },
            {
              title: 'Mint NFT',
              status: 'wait',
              icon: <SmileOutlined />,
            },
            {
              title: 'Successfully',
              status: 'wait',
              icon: <SmileOutlined />,
            },
          ]}
        />
      </div>
      <Modal
        title="Reject Bid Request"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        // okButtonProps={{ disabled: true }}
        // cancelButtonProps={{ disabled: true }}
        footer={false}
        className={clsx(styles.modal)}
      >
        <p>Are you sure to reject this bid request? This action cannot be undone!</p>
        <div className={clsx(styles.buttonModal)}>
          <Button
            type="dashed"
            htmlType="submit"
            style={{ marginRight: 20 }}
            className={clsx(styles.buttonSubmit)}
            onClick={showModal}
          >
            Cancel
          </Button>
          <Button type="ghost" htmlType="submit" className={clsx(styles.buttonSubmit, styles.buttonDanger)}>
            Yes, reject
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ViewDetail;
