import React from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { Exception } from 'ant-design-pro';

const Exception500 = () => (
  <Exception
    type="500"
    desc={formatMessage({ id: 'exception-500.description.500' })}
    linkElement={Link}
    backText={formatMessage({ id: 'exception-500.exception.back' })}
  />
);

export default Exception500;
