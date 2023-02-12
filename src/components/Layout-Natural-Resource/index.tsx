import { Layout, MenuProps, Tabs } from 'antd';
import Area from 'pages/area';
import EnvironmentalValues from 'pages/environmental-values/environmental-values';
import NaturalResource from 'pages/natural-resources';
import Project from 'pages/project';
import { FC } from 'react';
import styles from './styles.module.less';

const renderItem = (data: string) => {
  switch (data) {
    case 'Area':
      return <Area />;
    case 'Natural Resources':
      return <NaturalResource />;
    case 'Project':
      return (
        <div>
          <Project />
        </div>
      );
    case 'Environmental Values':
      return (
        <div>
          <EnvironmentalValues />
        </div>
      );
    default:
      return <div>{data}</div>;
  }
};

const items: MenuProps['items'] | any[] | undefined = [
  'Area',
  'Natural Resources',
  'Project',
  'Environmental Values',
].map((item) => {

  return {
    key: `${item}`,
    //   icon: React.createElement(icon),
    // label: <div onClick={(e) => renderItem(e, item)}>{item}</div>,
    label: `${item}`,
    //   children: `Content of Tab ${item}`,
    children: renderItem(item),
  };
});

const LayoutNaturalResouce: FC = ({}) => {
  return (
    <Layout style={{ background: 'colorBgContainer' }} className={styles.natural}>
      <Tabs tabPosition="left" style={{ margin: '10px 0px' }} items={items} />
    </Layout>
  );
};

export default LayoutNaturalResouce;
