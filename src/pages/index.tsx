import type { NextPage } from 'next';
import styles from './styles.module.less';
import Link from 'next/link';
import { Button } from 'components/Button';
import clsx from 'clsx';
import { Space } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getHelloMessage, setHelloMessage } from 'store/ducks/hello/slide';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const helloMessage = useAppSelector(getHelloMessage);

  return (
    <div className={clsx(styles.main, 'container')}>
      <>
        <h3> Home page</h3>
        <Space direction="vertical">
          <Button onClick={() => dispatch(setHelloMessage('Hello world'))}>Say hello</Button>
          {helloMessage}
        </Space>
      </>
    </div>
  );
};

export default Home;
