import { HeatMapOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { postRequest } from 'api/post-request';
import clsx from 'clsx';
import Map from 'components/Map/map';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.less';

interface DataType {
  key: React.Key;
  image?: string;
  area?: string;
  discordUrl?: string;
  description?: string;
  customData?: Coordinates | Coordinates[];
  name?: string;
  origanization: Origanization;
}
interface Origanization {
  description?: string;
  discordUrl?: string;
  name?: string;
  royaltyReceiver?: string;
}
interface Coordinates {
  lat?: number;
  lng: number;
}

const AddArea: NextPage = () => {
  const router = useRouter();
  const AREA_API = 'area';
  const [openModalMap, setOpenModalMap] = useState(false);
  const keyGoogleMap = 'AIzaSyCzHT1SSRP2RlIQqdypJ6z_gC-UhAP7rYI';
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${keyGoogleMap}`;
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [dataEditor, setDataEditor] = useState<any>();
  const [coordinates, setCoordinates] = useState<any>([])

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, //Added .CKEditor
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
    setEditorLoaded(true);
  }, []);

  const onFinish = async (values: DataType) => {
    const params = {
      customData: coordinates,
      name: values.name,
      description: dataEditor,
    };
    const response = await postRequest(AREA_API, params);

    console.log('data response', response, params);
  };

  const onIconClick = () => {
    setOpenModalMap(true);
  };

  const handleCancel = () => {
    setOpenModalMap(false);
  };

  useEffect(() => {
    console.log(coordinates)
  }, [coordinates])

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
      <div className={clsx(styles.contentAdd)}>
        <div className={styles.title}>Area Information</div>
        <Row className={clsx(styles.row)}>
          <Form
            name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles.formAdd}
            style={{ display: 'contents' }}
          >
            <Col span={12}>
              <Form.Item
                label="Custom map"
                name="Custom Data"
                // rules={[{ required: true, message: 'Please input your Area Name!' }]}
                className={clsx(styles.areaCustomMap, styles.formItem)}
                style={{ marginRight: 40 }}
              >
                <HeatMapOutlined style={{ fontSize: 30 }} onClick={() => onIconClick()} />
              </Form.Item>
              <Form.Item
                label="Area Name"
                name="name"
                rules={[{ required: true, message: 'Please input your Area Name!' }]}
                className={clsx(styles.areaName, styles.formItem)}
                style={{ marginRight: 40 }}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Area's Description"
                name="description"
                rules={[{ required: true, message: 'Please input your Area Description!' }]}
                className={clsx(styles.areaDescription)}
              >
                {editorLoaded ? (
                  <CKEditor
                    editor={ClassicEditor}
                    style={{ maxHeight: '500px' }}
                    // data={data}
                    // onReady={(editor) => {
                    //   // You can store the "editor" and use when it is needed.
                    //   console.log('Editor is ready to use!', editor);
                    // }}
                    onChange={(_event: any, editor: any) => {
                      const data = editor.getData();
                      setDataEditor(data);
                    }}
                  />
                ) : (
                  <p>Carregando...</p>
                )}
              </Form.Item>
            </Col>
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
        </Row>
      </div>
      <Modal
        title="Map"
        open={openModalMap}
        onCancel={handleCancel}
        footer={false}
        width={750}
      >
        <Map
          googleMapURL={googleMapURL}
          loadingElement={<div style={{ height: `60%` }} />}
          containerElement={<div style={{ height: `60vh`, margin: `auto` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          setCoordinates={setCoordinates}
        />
      </Modal>
    </div>
  );
};

export default AddArea;
