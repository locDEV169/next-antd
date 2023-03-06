import { CheckOutlined, LeftOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Row, Select, Upload, UploadProps } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { postRequest } from 'api/post-request';
import clsx from 'clsx';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Fragment, useRef, useState } from 'react';
import styles from './styles.module.less';

const { Option } = Select;
const { TextArea } = Input;

const props: UploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const AddProject: NextPage = () => {
  const formRef = useRef<FormInstance>(null);
  const [form] = Form.useForm();
  const router = useRouter();
  const PROJECT_API = 'projects';
  const [fromYear, setFromYear] = useState<number>(0);
  const [toYear, setToYear] = useState<number>(0);
  const [click, setClick] = useState(false);

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

  const onSumbit = async (values: any) => {
    console.log(values);
    // try {
    //   const response = await postRequest(PROJECT_API, values);
    //   console.log('data response', response, values);
    // } catch (error) {
    //   console.log('error', error);
    // }
  };

  const onChangeFormYear = () => {
    setFromYear(form.getFieldValue(['fromYear']));
  };

  const onChangeToYear = () => {
    setToYear(form.getFieldValue(['toYear']));
  };

  const onClick = () => {
    setClick(true);
  };

  const input = (fromYear: number, toYear: number) => {
    const a = toYear - fromYear;

    return a > 0 && toYear < 9999
      ? [...new Array(a+1)].map((_item, index) => {
          console.log(index, index + 1);

          return (
            <Fragment>
              <Col className={styles.years} span={6}>
                <div>{Number(fromYear) + index}</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div>
                  <Input
                    type="number"
                    maxLength={4}
                    placeholder="Enter the Estimated Volume"
                    className={clsx(styles.formItem)}
                    // onChange={() => onChangeFormYear()}
                  />
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div>
                  <Input
                    type="number"
                    maxLength={4}
                    placeholder="Enter the Actual Volumer"
                    className={clsx(styles.formItem)}
                    // onChange={() => onChangeFormYear()}
                    disabled
                  />
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div>
                  <Input
                    type="number"
                    maxLength={4}
                    placeholder="Enter the JCredit No"
                    className={clsx(styles.formItem)}
                    // onChange={() => onChangeFormYear()}
                    disabled
                  />
                </div>
              </Col>
            </Fragment>
          );
        })
      : null;
  };

  return (
    <div>
      <div className={styles.headerTitle}>
        <div className={styles.headerContent}>
          <div>
            <LeftOutlined style={{ fontSize: 20 }} onClick={() => router.back()} />
          </div>
          <div className={styles.title}>Add Project</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.leftContent}></div>
        <div className={clsx(styles.rightContent)} style={{ width: '100%' }}>
          <Form
            name="formAddProject"
            form={form}
            initialValues={{ remember: true }}
            onFinish={onSumbit}
            autoComplete="off"
            className={clsx(styles.formAdd)}
          >
            <div className={clsx(styles.firstLine)}>
              <div>
                <Form.Item
                  label="Area"
                  name="area"
                  rules={[{ required: true, message: 'Please input your Area !' }]}
                  className={clsx(styles.formNaturalResource)}
                >
                  <Select
                    placeholder="Select a Area "
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
              <div className={clsx(styles.title)}>Project Information</div>
              <div className={clsx(styles.thirdLine)}>
                <Row style={{ display: 'flex', flexDirection: 'row' }}>
                  <Col span={12}>
                    <Row className={clsx(styles.left)}>
                      <Col span={12}>
                        <Form.Item
                          label="From year"
                          name="fromYear"
                          rules={[
                            { required: true, message: 'Please input your From year !' },
                            {
                              max: 4,
                              message: 'The value is only 4 characters',
                            },
                          ]}
                          className={clsx(styles.left)}
                        >
                          <Input
                            type="number"
                            maxLength={4}
                            placeholder="Enter the From year"
                            className={clsx(styles.formItem)}
                            onChange={() => onChangeFormYear()}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Item
                          label="To Year"
                          name="toYear"
                          rules={[
                            { required: true, message: 'Please input your To year!' },
                            {
                              max: 4,
                              message: 'The value is only 4 characters',
                            },
                          ]}
                          className={clsx(styles.right)}
                        >
                          <Input
                            type="number"
                            maxLength={4}
                            placeholder="Enter the To year"
                            className={clsx(styles.formItem)}
                            onChange={() => onChangeToYear()}
                          />
                        </Form.Item>
                        <CheckOutlined className={clsx(styles.icon)} onClick={() => onClick()} />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className={clsx(styles.right)}>
                      <Form.Item
                        label="Additional information"
                        name="information"
                        rules={[{ required: true, message: 'Please input your Additional information' }]}
                        className={clsx(styles.left)}
                      >
                        <Upload {...props}>
                          <Button icon={<UploadOutlined />}>Import file</Button>
                        </Upload>
                      </Form.Item>
                    </Row>
                  </Col>
                </Row>
              </div>
              <div className={clsx(styles.secondLine)}>
                <Form.Item
                  label="Project Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input your Project Name!' }]}
                  className={clsx(styles.left, styles.formItem)}
                  style={{ marginRight: 40 }}
                >
                  <Input placeholder="Enter the Project Name" />
                </Form.Item>
                <Form.Item
                  label="Project Number"
                  name="number"
                  rules={[{ required: true, message: 'Please input your Project Number!' }]}
                  className={clsx(styles.right)}
                >
                  <Input type="number" placeholder="Enter the Project Number " />
                </Form.Item>
              </div>
              <div className={clsx(styles.thirdLine)}>
                <Row style={{ display: 'flex', flexDirection: 'row' }}>
                  <Col span={12}>
                    <Form.Item
                      label="Application number"
                      name="applicationNumber"
                      rules={[{ required: true, message: 'Please input your Application Number' }]}
                      className={clsx(styles.left)}
                    >
                      <Input placeholder="Enter the Application Number" className={clsx(styles.formItem)} />
                    </Form.Item>
                  </Col>
                  <Col span={12} style={{ display: 'flex', flexDirection: 'row' }}>
                    <Form.Item
                      label="Project Type"
                      name="projectType"
                      rules={[{ required: true, message: 'Please input your Project Type' }]}
                      className={clsx(styles.right)}
                    >
                      <Select
                        placeholder="Select Project Type"
                        onChange={onNaturalResourceChange}
                        allowClear
                        className={clsx(styles.customInput)}
                      >
                        <Option value="CO2">CO2</Option>
                        <Option value="water">Water</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
              <Form.Item
                label="Project's Description"
                name="description"
                rules={[{ required: true, message: 'Please input your Project Description!' }]}
                className={clsx(styles.areaDescription)}
              >
                <TextArea rows={6} placeholder="Enter the description of the Project" />
              </Form.Item>
            </div>
            <div className={clsx(styles.environmentValueInfo)}>
              <div className={clsx(styles.title)}>Environmental Volume Information</div>
              <div className={clsx(styles.information)}>
                <Row gutter={[16, 24]} style={{ display: 'flex', flexDirection: 'row' }}>
                  <Col className="gutter-row" span={6}>
                    <div className={clsx(styles.boderGray)}>Year</div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div className={clsx(styles.boderGray)}>Estimated Volume</div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div className={clsx(styles.boderGray)}>Actual Volume</div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div className={clsx(styles.boderGray)}>JCredit No.</div>
                  </Col>
                  {click ? input(fromYear, toYear) : null}
                  <Col className="gutter-row" span={6}>
                    <div className={clsx(styles.boderGray)}>Total</div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div className={clsx(styles.boderGray)}>0</div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div className={clsx(styles.boderGray)}>0</div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div className={clsx(styles.boderGray)}>0</div>
                  </Col>
                </Row>
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
    </div>
  );
};

export default AddProject;
