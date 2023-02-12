import { LeftOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePickerProps, Form, Select, Upload, UploadProps, Input, DatePicker } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import clsx from 'clsx';
import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import styles from './styles.module.less';

const { Option } = Select
const { TextArea } = Input

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const AddProject: NextPage = () => {
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

  const onNaturalResourceChange = (value: string) => {
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

  const onExpectedStartDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onExpectedEndDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onActualStartDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onActualEndDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return <div>
    <div className={styles.headerTitle}>
      <div className={styles.headerContent}>
        <div>
          <LeftOutlined style={{ fontSize: 20 }} />
        </div>
        <div className={styles.title}>Add New Area</div>
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
            <div>
              <Form.Item
                label="Natural Resource "
                name="naturalResource"
                rules={[{ required: true, message: 'Please input your Natural Resource !' }]}
                className={clsx(styles.formNaturalResource)}
              >
                <Select
                  placeholder="Select a Natural Resource "
                  onChange={onNaturalResourceChange}
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
          <div className={clsx(styles.projectDetail)}>
            <div className={clsx(styles.title)}>Project details</div>
            <div className={clsx(styles.secondLine)}>
              <Form.Item
                label="Project Name"
                name="projectName"
                rules={[{ required: true, message: 'Please input your Project Name!' }]}
                className={clsx(styles.left, styles.formItem)}
                style={{ marginRight: 40 }}
              >
                <Input placeholder="Enter the Natural Project Name" />
              </Form.Item>
              <Form.Item
                label="Project Number"
                name="projectNumber"
                rules={[{ required: true, message: 'Please input your Project Number!' }]}
                className={clsx(styles.right)}
              >
                <Input placeholder="Enter the Project Number " />
              </Form.Item>
            </div>
            <div className={clsx(styles.thirdLine)}>
              <Form.Item
                label="Expected Start Date"
                name="expectedStartDate"
                rules={[{ required: true, message: 'Please input your Natural Resource Type!' }]}
                className={clsx(styles.left, styles.formItem)}
                style={{ marginRight: 40 }}
              >
                <DatePicker onChange={onExpectedStartDateChange} style={{ height: 40 }} className={clsx(styles.input100)} />
              </Form.Item>
              <Form.Item
                label="Expected End Date"
                name="expectedEndDate"
                rules={[{ required: true, message: 'Please input your Expected End Date!' }]}
                className={clsx(styles.right)}
              >
                <DatePicker onChange={onExpectedEndDateChange} style={{ height: 40 }} className={clsx(styles.input100)} />
              </Form.Item>
            </div>
            <div className={styles.fourLine}>
              <Form.Item
                label="Actual Start Date"
                name="ActualStartDate"
                rules={[{ required: true, message: 'Please input your Actual Start Date!' }]}
                className={clsx(styles.left, styles.formItem)}
                style={{ marginRight: 40 }}
              >
                <DatePicker onChange={onActualStartDateChange} style={{ height: 40 }} className={clsx(styles.input100)} />
              </Form.Item>
              <Form.Item
                label="Actual End Date"
                name="actualEndDate"
                rules={[{ required: true, message: 'Please input your Actual End Date!' }]}
                className={clsx(styles.right)}
              >
                <DatePicker onChange={onActualEndDateChange} style={{ height: 40 }} className={clsx(styles.input100)} />
              </Form.Item>
            </div>
            <div className={styles.fiveLine}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: 'Please input your Status !' }]}
                className={clsx(styles.left, styles.formItem)}
                style={{ marginRight: 40 }}
              >
                <Select
                  placeholder="Select a Status "
                  onChange={onNaturalResourceChange}
                  allowClear
                  // className={clsx(styles.customInput)}
                  // style={{ maxWidth: '186px', width: '100%' }}
                  className={clsx(styles.input100)}
                >
                  <Option value="open">open</Option>
                  <Option value="pending">pending</Option>
                  <Option value="close">close</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Progress (%)"
                name="progress"
                rules={[{ required: true, message: 'Please input your Progress (%)!' }]}
                className={clsx(styles.right)}
              >
                <Input placeholder="Enter the Progress (%) " />
              </Form.Item>
            </div>
            <Form.Item
              label="Project's Description"
              name="ProjectDescription"
              rules={[{ required: true, message: 'Please input your Project Description!' }]}
              className={clsx(styles.areaDescription)}
            >
              <TextArea rows={6} placeholder="Enter the description of the Project" />
            </Form.Item>
          </div>
          <div className={clsx(styles.environmentalValueType)}>
            <Form
              name="environmentalValueType"
              initialValues={{ remember: true }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
              className={styles.formAdd}
            >
              <div className={styles.sixLine}>
                <Form.Item
                  label="Start year"
                  name="startYear"
                  rules={[{ required: true, message: 'Please input your Start year!' }]}
                  className={clsx(styles.left, styles.formItem)}
                  style={{ marginRight: 40 }}
                >
                  <DatePicker onChange={onExpectedStartDateChange} style={{ height: 40 }} className={clsx(styles.input100)} />
                </Form.Item>
                <Form.Item
                  label="End Year"
                  name="endYear"
                  rules={[{ required: true, message: 'Please input your End Year!' }]}
                  className={clsx(styles.right)}
                >
                  <DatePicker onChange={onExpectedStartDateChange} style={{ height: 40 }} className={clsx(styles.input100)} />
                </Form.Item>
              </div>
              <div className={clsx(styles.sevenLine)}>
                <Form.Item
                  label="Environmental Value Type "
                  name="environmentalValueType"
                  rules={[{ required: true, message: 'Please input your Environmental Value Type !' }]}
                  className={clsx(styles.input100)}
                >
                  <Select
                    placeholder="Select a Environmental Value Type "
                    onChange={onNaturalResourceChange}
                    allowClear
                    className={clsx(styles.customInput, styles.input100)}
                  >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
              </div>
            </Form>
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
  </div>;
};

export default AddProject;
