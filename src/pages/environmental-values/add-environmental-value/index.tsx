import { LeftOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Input, Select } from 'antd';
import Upload, { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import clsx from 'clsx';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useRef, useState } from 'react';
import styles from './styles.module.less';

const { Option } = Select;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const AddEnviromnentalValue: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const formRef = useRef<FormInstance>(null);
  const router = useRouter()

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

  return (
    <Fragment>
      <div className={styles.headerTitle}>
        <div className={styles.headerContent}>
          <div className={clsx(styles.headerLeft)}>
            <LeftOutlined style={{ fontSize: 20 }} onClick={() => router.back()}/>
            <div className={styles.title}>Add New Environmental Values</div>
          </div>
          <div className={clsx(styles.buttonNext)}>
            <Button type="ghost" htmlType="submit" style={{ marginRight: 20 }} className={clsx(styles.buttonSubmit)}>
              Cancel
            </Button>
            <Link href="/environmental-values/monitoring-cycle">
              <Button type="primary" htmlType="submit" className={clsx(styles.buttonSubmit)}>
                Next
              </Button>
            </Link>
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
                label="Project"
                name="project"
                rules={[{ required: true, message: 'Please input your Project !' }]}
                className={clsx(styles.formProject)}
              >
                <Select
                  placeholder="Select a Project "
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
                  label="Year"
                  name="year"
                  rules={[{ required: true, message: 'Please input your Year!' }]}
                  className={clsx(styles.left, styles.formItem)}
                >
                  <Select
                    placeholder="Select a Year "
                    onChange={onProjectChange}
                    allowClear
                    className={clsx(styles.customInput)}
                  >
                    <Option value="2025">2025</Option>
                    <Option value="2024">2024</Option>
                    <Option value="2023">2023</Option>
                    <Option value="2022">2022</Option>
                    <Option value="2021">2021</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className={clsx(styles.thirdLine)}>
                <Form.Item
                  label="Estimated value (Ton)"
                  name="estimatedValue"
                  rules={[{ required: true, message: 'Please input your Estimated value (Ton)!' }]}
                  className={clsx(styles.left, styles.formItem)}
                  style={{ marginRight: 40 }}
                >
                  <Input placeholder="Enter the Estimated Value (Ton)" />
                </Form.Item>
                <Form.Item
                  label="Actual value (Ton)"
                  name="actualValue"
                  rules={[{ required: true, message: 'Please input your Actual value (Ton)!' }]}
                  className={clsx(styles.right)}
                >
                  <Input placeholder="Enter the Actual value (Ton)" />
                </Form.Item>
              </div>
              <div className={clsx(styles.fourLine)}>
                <Form.Item
                  label="Sale Value"
                  name="saleValue"
                  rules={[{ required: true, message: 'Please input your Sale Value!' }]}
                  className={clsx(styles.left, styles.formItem)}
                  style={{ marginRight: 40 }}
                >
                  <Input placeholder="Enter the Sale Value" />
                </Form.Item>
                <Form.Item
                  label="Furusato value"
                  name="furusatoValue"
                  rules={[{ required: true, message: 'Please input your Furusato value!' }]}
                  className={clsx(styles.right)}
                >
                  <Input placeholder="Enter the Furusato value" />
                </Form.Item>
              </div>
              <div className={clsx(styles.fiveLine)}>
                <Form.Item className={clsx(styles.buttonAddMore, styles.formButton)}>
                  <Button type="dashed" block icon={<PlusOutlined />} className={clsx(styles.buttonSubmit)}>
                    Add sights
                  </Button>
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

export default AddEnviromnentalValue;
