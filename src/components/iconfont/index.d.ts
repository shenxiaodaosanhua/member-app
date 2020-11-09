/* eslint-disable */
import { FunctionComponent } from 'react';

interface Props {
  name: 'touxiang' | 'weixin' | 'gongdan' | 'guzhang' | 'zengjia';
  size?: number;
  color?: string | string[];
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
