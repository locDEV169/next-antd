import {
  DeleteOutlined,
  DownloadOutlined,
  EditTwoTone,
  LoadingOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Form, FormInstance, Input, Select, Table, Upload, UploadProps } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { ColumnsType, TableProps } from 'antd/lib/table';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import clsx from 'clsx';
import type { NextPage } from 'next';
import React, { useRef, useState } from 'react';
import styles from './styles.module.less';

interface DataType {
  key: React.Key;
  name: string;
  walletAddress: string;
  email?: string;
  phoneNumber: number | string | any;
}

const { Option } = Select;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const AdminManagement: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const formRef = useRef<FormInstance>(null);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalRemove = () => {
    setIsModalRemoveOpen(true);
  };

  const handleOkRemove = () => {
    setIsModalRemoveOpen(false);
  };

  const handleCancelRemove = () => {
    setIsModalRemoveOpen(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Esther Howard',
          value: 'Esther Howard',
        },
        {
          text: 'Category 2',
          value: 'Category 2',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: string | number | boolean, record: any) => record.name.startsWith(value),
      width: '25%',
      render: (name) => (
        <div>
          <Avatar size="large" icon={<UserOutlined />} style={{ marginRight: 15 }} />
          {name}
        </div>
      ),
    },
    {
      title: 'Wallet Address',
      dataIndex: 'walletAddress',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: '',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      // onFilter: (value: string | number | boolean, record: any) => record.address.startsWith(value),
      sorter: (a, b) => a.phoneNumber - b.phoneNumber,
      filterSearch: true,
      width: '40%',
    },
    {
      dataIndex: '',
      key: 'x',
      render: (_text, _record) => (
        <div>
          <EditTwoTone style={{ marginRight: 15 }} />
          <DeleteOutlined style={{ color: '#FC5640' }} onClick={() => showModalRemove()} />
        </div>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'Esther Howard',
      walletAddress: '0x8ce7g9kl6hsk9jsh66sa99sa',
      email: 'kenzi.lawson@example.com',
      phoneNumber: '(405) 555-0128',
    },
    {
      key: '2',
      name: 'Jim Green',
      walletAddress: '0x8ce7g9kl6hsk9jsh66sa99sa',
      email: 'kenzi.lawson@example.com',
      phoneNumber: '(405) 555-0128',
    },
    {
      key: '3',
      name: 'Joe Black',
      walletAddress: '0x8ce7g9kl6hsk9jsh66sa99sa',
      email: 'kenzi.lawson@example.com',
      phoneNumber: '(405) 555-0128',
    },
    {
      key: '4',
      name: 'Esther Howard',
      walletAddress: '0x8ce7g9kl6hsk9jsh66sa99sa',
      email: 'kenzi.lawson@example.com',
      phoneNumber: '(405) 555-0128',
    },
    {
      key: '5',
      name: 'Esther Howard',
      walletAddress: '0x8ce7g9kl6hsk9jsh66sa99sa',
      email: 'kenzi.lawson@example.com',
      phoneNumber: '(405) 555-0128',
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

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

  return (
    <div>
      <div className={styles.headerTitle}>
        <div className={styles.title}>Admin Management</div>
        <div className={styles.titelLeft}>
          <div className={styles.buttonAdd}>
            <Button type="primary" className={styles.buttonConnect} style={{ height: 40 }} onClick={showModal}>
              <PlusOutlined />
              Add New Admin
            </Button>
          </div>
          <div className={styles.buttonImport}>
            <Button type="primary" className={styles.buttonConnect} style={{ height: 40 }}>
              <DownloadOutlined />
              Import
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>Admin List</div>
        <div className={styles.contentTotal}>{data.length} Admins in total</div>
        <div className={styles.table}>
          <Table columns={columns} dataSource={data} onChange={onChange} pagination={false} />
        </div>
      </div>
      <Modal title="Add a New Admin" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
        <div className={clsx(styles.modal)}>
          <div className={styles.leftContent}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              // beforeUpload={beforeUpload}
              onChange={handleImageChange}
              style={{ width: '200px !important', height: '200px !important' }}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </div>
          <div className={clsx(styles.rightContent)} style={{ width: '100%' }}>
            <Form
              name="formAddAdmin"
              initialValues={{ remember: true }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
              className={clsx(styles.formAdd)}
            >
              <div className={clsx(styles.firstLine)}>
                <Form.Item
                  label="Wallet Address "
                  name="walletAddress"
                  rules={[{ required: true, message: 'Please input your Wallet Address !' }]}
                  className={clsx(styles.walletAddress)}
                >
                  <Input placeholder="Enter the Natural Wallet Address" />
                </Form.Item>
              </div>
              <div className={clsx(styles.secondLine)}>
                <Form.Item
                  label="Admin Name "
                  name="adminName"
                  rules={[{ required: true, message: 'Please input your Admin Name !' }]}
                  className={clsx(styles.adminName)}
                >
                  <Input placeholder="Enter the Natural Admin Name" />
                </Form.Item>
              </div>
              <div className={clsx(styles.thirdLine)}>
                <Form.Item
                  label="Email Address"
                  name="emailAddress"
                  rules={[{ required: true, message: 'Please input your Email Address !' }]}
                  className={clsx(styles.emailAddress)}
                >
                  <Input placeholder="Enter the Email Address" />
                </Form.Item>
              </div>
              <div className={clsx(styles.fourLine)}>
                <Form.Item
                  label="Area"
                  name="area"
                  rules={[{ required: true, message: 'Please choose your Area !' }]}
                  className={clsx(styles.emailAddress)}
                >
                  <Select placeholder="Select a Area " onChange={onAreaChange} allowClear>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  className={clsx(styles.formButton)}
                  style={{ display: 'flex !important', justifyContent: 'flex-end !important', border: 0 }}
                >
                  <Button
                    type="ghost"
                    htmlType="reset"
                    onClick={() => handleCancel()}
                    style={{ marginRight: 20 }}
                    className={clsx(styles.buttonSubmit)}
                  >
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit" className={clsx(styles.buttonSubmit)}>
                    Create
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
      <Modal
        title="Remove Admin"
        open={isModalRemoveOpen}
        onOk={handleOkRemove}
        onCancel={handleCancelRemove}
        footer={false}
        className={clsx(styles.modalRemove)}
      >
        <div className={clsx(styles.title)}>Are you sure to remove this Admin? This action cannot be undone!</div>
        <div className={clsx(styles.content)}>
          <div className={clsx(styles.left)}>
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              className={clsx(styles.magin20)}
            />
          </div>
          <div className={clsx(styles.right, styles.magin20)}>
            <div className={clsx(styles.name)}>Admin’s Name</div>
            <div className={clsx(styles.walletAddress)}>0x8ce7g9kl6hsk9jsh66sa99sa</div>
          </div>
        </div>
        <div className={clsx(styles.button)}>
          <Button
            type="ghost"
            htmlType="submit"
            style={{ marginRight: 20 }}
            className={clsx(styles.buttonSubmit)}
            onClick={() => handleCancelRemove()}
          >
            Cancel
          </Button>
          <Button htmlType="submit" style={{background: '#FC5640'}} className={clsx(styles.buttonSubmit)}>
            Yes, remove
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminManagement;
