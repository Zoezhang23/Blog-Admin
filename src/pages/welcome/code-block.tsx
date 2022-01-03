import React from 'react';
import { Button, Tooltip, Message } from '@arco-design/web-react';
import { IconCopy } from '@arco-design/web-react/icon';
import clipboard from '../../utils/clipboard';
import styles from './style/code-block.module.less';

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock(props: CodeBlockProps) {
  const { code } = props;
  return (
    <pre className={styles['code-block']}>
      <code className={styles['code-block-content']}>{code}</code>
      <Tooltip content="click to copy">
        <Button
          type="text"
          className={styles['code-block-copy-btn']}
          icon={<IconCopy />}
          onClick={() => {
            clipboard(code);
            Message.success('coped');
          }}
        />
      </Tooltip>
    </pre>
  );
}
