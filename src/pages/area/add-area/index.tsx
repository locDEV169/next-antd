import { LeftOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Input, Select, Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';
import clsx from 'clsx';
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

const AddArea: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const formRef = useRef<FormInstance>(null);
  const router = useRouter();

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

  const onAdminChange = (value: string) => {
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

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <div className={styles.headerTitle}>
        <div className={styles.headerLeft}>
          <div>
            <LeftOutlined style={{ fontSize: 20 }} onClick={() => router.back()} />
          </div>
          <div className={styles.title}>Add New Area</div>
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
            name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            // style={{ maxWidth: 600, margin: '10px 0' }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles.formAdd}
          >
            <div className={styles.firstLine}>
              <Form.Item
                label="Area Name"
                name="areaName"
                rules={[{ required: true, message: 'Please input your Area Name!' }]}
                className={clsx(styles.areaName, styles.formItem)}
                style={{ marginRight: 40 }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Discord link"
                name="discordLink"
                rules={[{ required: true, message: 'Please input your Discord link!' }]}
                className={clsx(styles.discordLink)}
              >
                <Input />
              </Form.Item>
            </div>
            <div className={styles.secondLine}>
              <Form.Item
                label="Admin"
                name="admin"
                rules={[{ required: true, message: 'Please input your Admin!' }]}
                className={clsx(styles.admin)}
              >
                <Select
                  placeholder="Select a Admin (Local Government) "
                  onChange={onAdminChange}
                  allowClear
                  className={clsx(styles.customInput)}
                >
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item
              label="Area's Description"
              name="areaDescription"
              rules={[{ required: true, message: 'Please input your Area Description!' }]}
              className={clsx(styles.areaDescription)}
            >
              <TextArea rows={6} placeholder="Enter the description of the area" />
            </Form.Item>
            <Form.Item
              label="Area's Contribution"
              name="areaContribution"
              rules={[{ required: true, message: 'Please input your Area Contribution!' }]}
              className={clsx(styles.areaContribution)}
            >
              <TextArea rows={6} placeholder="Enter the area's contribution" />
            </Form.Item>
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
        </div>
      </div>
    </div>
  );
};

export default AddArea;
