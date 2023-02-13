import { LeftOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import Upload, { RcFile, UploadProps } from 'antd/lib/upload';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import clsx from 'clsx';
import type { NextPage } from 'next';
import { Fragment, useRef, useState } from 'react';
import styles from './styles.module.less';

const { Option } = Select;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const MonitoringCyclePage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const formRef = useRef<FormInstance>(null);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleImageChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url: any) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const onProjectChange = (value: string) => {
    switch (value) {
      case 'male':
        formRef.current?.setFieldsValue({ note: 'Hi, man!' });
        break;
      case 'female':
        formRef.current?.setFieldsValue({ note: 'Hi, lady!' });
        break;
      case 'other':
        formRef.current?.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
        break;
    }
  };

  const selectAfter = (
    <Select defaultValue={'tons'} className={styles.selectAfter}>
      <Option value="tons">Tons</Option>
      <Option value="kg">Kgs</Option>
    </Select>
  );

  const selectAfterPrice = (
    <Select defaultValue={'USDT'} className={styles.selectAfter}>
      <Option value="USDT">USDT</Option>
      <Option value="VND">VND</Option>
    </Select>
  );

  return (
    <Fragment>
      <div className={styles.headerTitle}>
        <div className={styles.headerContent}>
          <div className={clsx(styles.headerLeft)}>
            <LeftOutlined style={{ fontSize: 20 }} />
            <div className={styles.title}>Monitoring cycle</div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            // beforeUpload={beforeUpload}
            onChange={handleImageChange}
            style={{ width: '300px !important', height: '200px !important' }}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </div>
        <div className={clsx(styles.rightContent)} style={{ width: '100%' }}>
          <Form
            name="naturalResourceInformation"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={clsx(styles.formAdd)}
          >
            <div className={clsx(styles.firstLine)}>
              <Form.Item
                label="Project Number"
                name="projectNumber"
                rules={[{ required: true, message: 'Please input your Project Number !' }]}
                className={clsx(styles.formProject)}
              >
                <Select
                  placeholder="Select a Project Number "
                  onChange={onProjectChange}
                  allowClear
                  className={clsx(styles.customInput)}
                >
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>
            </div>
            <div className={clsx(styles.enviromentValueDetail)}>
              <div className={clsx(styles.title)}>Eviroment Value Details</div>
              <div className={clsx(styles.secondLine)}>
                <Form.Item
                  label="Total Estimated Value "
                  name="totalEstimatedValue"
                  rules={[{ required: true, message: 'Please input your Total estimated value (Ton)!' }]}
                  className={clsx(styles.left, styles.width650)}
                  style={{ marginRight: 40 }}
                >
                  <Input placeholder="Enter the Total estimated value " addonAfter={selectAfter} />
                </Form.Item>
                <Form.Item
                  label="Total Actual Value "
                  name="totalActualValue"
                  rules={[{ required: true, message: 'Please input your Total actual value !' }]}
                  className={clsx(styles.right, styles.width650)}
                >
                  <Input placeholder="Enter the Total actual value " addonAfter={selectAfter} />
                </Form.Item>
              </div>
              <div className={clsx(styles.thirdLine)}>
                <Form.Item
                  label="Total Sales value  "
                  name="totalSalesValue "
                  rules={[{ required: true, message: 'Please input your Total Sales value  !' }]}
                  className={clsx(styles.left, styles.width650)}
                  style={{ marginRight: 40 }}
                >
                  <Input placeholder="Enter the Total Sales value  " addonAfter={selectAfter} />
                </Form.Item>
                <Form.Item
                  label="Total Furusato Value "
                  name="totalFurusatoValue"
                  rules={[{ required: true, message: 'Please input your Total Furusato value !' }]}
                  className={clsx(styles.right, styles.width650)}
                >
                  <Input placeholder="Enter the Total Furusato value " addonAfter={selectAfter} />
                </Form.Item>
              </div>
              <div className={clsx(styles.fourLine)}>
                <Form.Item
                  label="Price (how much ETH/USDT per Ton)"
                  name="price "
                  rules={[{ required: true, message: 'Please input your Price !' }]}
                  className={clsx(styles.left, styles.width650)}
                  style={{ marginRight: 40 }}
                >
                  <Input placeholder="Enter the Price " addonAfter={selectAfterPrice} />
                </Form.Item>
                <Form.Item
                  label="Planed Monitoring Year "
                  name="planedMonitoringYear"
                  rules={[{ required: true, message: 'Please input your Planed monitoring year !' }]}
                  className={clsx(styles.right, styles.width650)}
                >
                  <Input placeholder="Enter the Planed monitoring year " />
                </Form.Item>
              </div>
              <div className={clsx(styles.fiveLine)}>
                <Form.Item
                  label="Valid Period"
                  name="ValidPeriod "
                  rules={[{ required: true, message: 'Please input your Valid Period !' }]}
                  className={clsx(styles.left, styles.width650)}
                  style={{ marginRight: 40 }}
                >
                  <Input placeholder="Enter the Valid Period " />
                </Form.Item>
                <Form.Item
                  label="Minimum Value "
                  name="minimumValue"
                  rules={[{ required: true, message: 'Please input your Minimum Value !' }]}
                  className={clsx(styles.right, styles.width650)}
                >
                  <Input placeholder="Enter the Minimum Value " addonAfter={selectAfter} />
                </Form.Item>
              </div>
              <div className={clsx(styles.sixLine)}>
                <Form.Item
                  label="Royalty Fee"
                  name="royaltyFee"
                  rules={[{ required: true, message: 'Please input your Royalty Fee !' }]}
                  className={clsx(styles.left, styles.width650)}
                  style={{ marginRight: 40 }}
                >
                  <Input placeholder="Enter the Royalty Fee" />
                </Form.Item>
                <Form.Item
                  label="Minimum Value "
                  name="minimumValue"
                  rules={[{ required: true, message: 'Please input your Minimum Value !' }]}
                  className={clsx(styles.right, styles.width650)}
                >
                  <Input placeholder="Enter the Minimum Value " addonAfter={selectAfter} />
                </Form.Item>
              </div>
              <div className={clsx(styles.sixLine)}>
                <Form.Item
                  label="Royalty fee receiver wallet"
                  name="royaltyFeeReceiverWallet"
                  rules={[{ required: true, message: 'Please input your Royalty fee receiver wallet !' }]}
                  className={clsx(styles.left, styles.width650)}
                  style={{ marginRight: 40 }}
                >
                  <Input placeholder="Enter the Royalty fee receiver wallet" />
                </Form.Item>
              </div>
            </div>
            <Form.Item
              className={clsx(styles.formButton)}
              style={{ display: 'flex !important', justifyContent: 'flex-end !important', border: 0 }}
            >
              <Button type="ghost" htmlType="submit" style={{ marginRight: 20 }} className={clsx(styles.buttonSubmit)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" className={clsx(styles.buttonSubmit)}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default MonitoringCyclePage;
