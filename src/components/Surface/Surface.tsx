import { FC } from 'react';
import { IProps } from './Surface.types';

const Surface: FC<IProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Surface;
