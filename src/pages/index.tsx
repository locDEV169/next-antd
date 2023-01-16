import { Space } from 'antd';
import clsx from 'clsx';
import { Button } from 'components/Button';
import { useAppDispatch, useAppSelector } from 'hooks';
import type { NextPage } from 'next';
import { getHelloMessage, setHelloMessage } from 'store/ducks/hello/slide';
import styles from './styles.module.less';

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
