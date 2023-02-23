import { LeftOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';
import { postRequest } from 'api/post-request';
import clsx from 'clsx';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './styles.module.less';

interface DataType {
  key: React.Key;
  image?: string;
  area?: string;
  discordUrl?: string;
  description?: string;
  customData?: string;
  name?: string;
  origanization: Origanization;
}
interface Origanization {
  description?: string;
  discordUrl?: string;
  name?: string;
  royaltyReceiver?: string;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const { TextArea } = Input;

const AddArea: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  // const formRef = useRef<FormInstance>(null);
  const router = useRouter();
  const AREA_API = 'area';

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

  const onFinish = async (values: DataType) => {
    const response = await postRequest(AREA_API, values);
    console.log(response);
    
    console.log('data response', response, values);
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
                name="name"
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
            <Form.Item
              label="Area's Description"
              name="description"
              rules={[{ required: true, message: 'Please input your Area Description!' }]}
              className={clsx(styles.areaDescription)}
            >
              <TextArea rows={6} placeholder="Enter the description of the area" />
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
