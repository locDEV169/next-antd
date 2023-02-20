import { FullscreenOutlined, LeftOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Input, Modal, Select, Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';
import clsx from 'clsx';
import Map from 'components/Map/map';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import styles from './styles.module.less';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const { Option } = Select;
const { TextArea } = Input;

const AddNaturalResouce: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const formRef = useRef<FormInstance>(null);
  const [openModalMap, setOpenModalMap] = useState(false);
  const keyGoogleMap = 'AIzaSyCKF7mt9OcEPcZ74cGfOGlyq_grEYlOeIk'
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${keyGoogleMap}`
  const router = useRouter()

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
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

  const onAreaChange = (value: string) => {
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

  const onIconClick = () => {
    setOpenModalMap(true);
  };

  const handleCancel = () => {
    setOpenModalMap(false);
  };

  return (
    <div>
      <div className={styles.headerTitle}>
        <div className={styles.headerLeft}>
          <div>
            <LeftOutlined style={{ fontSize: 20 }} onClick={() => router.back()}/>
          </div>
          <div className={styles.title}>Add New Natural Resource</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.rightContent}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            // beforeUpload={beforeUpload}
            onChange={handleChange}
            style={{ width: '300px !important', height: '200px !important' }}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </div>
        <div className={styles.leftContent}>
          <Form
            name="naturalResourceInformation"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles.formAdd}
          >
            <div className={styles.firstLine}>
              <div>
                <Form.Item
                  label="Area"
                  name="area"
                  rules={[{ required: true, message: 'Please input your Area!' }]}
                  className={clsx(styles.formArea)}
                >
                  <Select
                    placeholder="Select a Admin (Local Government) "
                    onChange={onAreaChange}
                    allowClear
                    className={clsx(styles.customInput)}
                  >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className={clsx(styles.formNaturalInformation)}>
              <div className={clsx(styles.title)}>Natural Resource Information</div>

              <div className={styles.secondLine}>
                <Form.Item
                  label="Natural Resource Name"
                  name="naturalResourceName"
                  rules={[{ required: true, message: 'Please input your Area Name!' }]}
                  className={clsx(styles.left, styles.formItem)}
                  style={{ marginRight: 40 }}
                >
                  <Input placeholder="Enter the Natural Resource Name" />
                </Form.Item>
                <Form.Item
                  label="Acreage"
                  name="acreage"
                  rules={[{ required: true, message: 'Please input your Discord link!' }]}
                  className={clsx(styles.right)}
                >
                  <Input placeholder="Enter the acreage " />
                </Form.Item>
              </div>
              <div className={styles.thirdLine}>
                <Form.Item
                  label="Natural Resource Type"
                  name="naturalResourceType"
                  rules={[{ required: true, message: 'Please input your Natural Resource Type!' }]}
                  className={clsx(styles.left, styles.formItem)}
                  style={{ marginRight: 40 }}
                >
                  <Input placeholder="Enter the Natural Resource Name" />
                </Form.Item>
                <Form.Item
                  label="Royalty fee receiver wallet"
                  name="royaltyFeeReceiverWallet"
                  rules={[{ required: true, message: 'Please input your Royalty fee receiver wallet!' }]}
                  className={clsx(styles.right)}
                >
                  <Input placeholder="Enter the Royalty fee receiver wallet " />
                </Form.Item>
              </div>
              <div className={styles.fourLine}>
                <div className={clsx(styles.left)}>
                  <Form.Item
                    label="Latitude"
                    name="latitude"
                    rules={[{ required: true, message: 'Please input your Latitude!' }]}
                    className={clsx(styles.formItem)}
                  >
                    <Input placeholder="Enter the Latitude" style={{ height: 40 }} />
                  </Form.Item>
                  <Form.Item
                    label="Longitude"
                    name="longitude"
                    rules={[{ required: true, message: 'Please input your Longitude!' }]}
                    className={clsx(styles.formItem)}
                  >
                    <Input placeholder="Enter the Longitude" style={{ height: 40 }} />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: 'Please input your Address!' }]}
                  className={clsx(styles.right)}
                >
                  <Input
                    placeholder="Enter the Address "
                    style={{ height: 40 }}
                    suffix={<FullscreenOutlined onClick={() => onIconClick()} />}
                  />
                </Form.Item>
              </div>
              <Form.Item
                label="Resource's Description"
                name="resourceDescription"
                rules={[{ required: true, message: 'Please input your Resource Description!' }]}
                className={clsx(styles.areaDescription)}
              >
                <TextArea rows={6} placeholder="Enter the description of the Resource" />
              </Form.Item>
              <Form.Item className={clsx(styles.buttonAddMore)}>
                <Button type="dashed" block icon={<PlusOutlined />} className={clsx(styles.submit)}>
                  Add sights
                </Button>
              </Form.Item>
            </div>
            <Form
              name="naturalResourceBiodiversity"
              initialValues={{ remember: true }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
              className={styles.formAdd}
            >
              <div className={clsx(styles.formNaturalResource)}>
                <div className={clsx(styles.title)}>Natural Resource Biodiversity</div>
                <div className={styles.secondLine}>
                  <Form.Item
                    label="Natural Resource Name"
                    name="naturalResourceName"
                    rules={[{ required: true, message: 'Please input your Area Name!' }]}
                    className={clsx(styles.left, styles.formItem)}
                    style={{ marginRight: 40 }}
                  >
                    <Input placeholder="Enter the Natural Resource Name" />
                  </Form.Item>
                  <Form.Item
                    label="Acreage"
                    name="acreage"
                    rules={[{ required: true, message: 'Please input your Discord link!' }]}
                    className={clsx(styles.right)}
                  >
                    <Input placeholder="Enter the acreage " />
                  </Form.Item>
                </div>
                <div className={styles.thirdLine}>
                  <Form.Item
                    label="Natural Resource Type"
                    name="naturalResourceType"
                    rules={[{ required: true, message: 'Please input your Natural Resource Type!' }]}
                    className={clsx(styles.left, styles.formItem)}
                    style={{ marginRight: 40 }}
                  >
                    <Input placeholder="Enter the Natural Resource Name" style={{ width: '50%' }} />
                  </Form.Item>
                </div>
                <Form.Item className={clsx(styles.buttonAddMore)}>
                  <Button type="dashed" block icon={<PlusOutlined />} className={clsx(styles.submit)}>
                    Add sights
                  </Button>
                </Form.Item>
              </div>
            </Form>
            <Form.Item className={styles.formButton}>
              <div>
                <Button type="ghost" htmlType="submit" style={{ marginRight: 20 }} className={styles.buttonSubmit}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" className={styles.buttonSubmit}>
                  Save
                </Button>
              </div>
            </Form.Item>
          </Form>
          <Modal
            title="Map"
            open={openModalMap}
            // onOk={handleOk}
            // confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={false}
            width={750}
          >
            <Map
              googleMapURL={googleMapURL}
              loadingElement={<div style={{ height: `60%` }} />}
              containerElement={<div style={{ height: `60vh`, margin: `auto` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AddNaturalResouce;
