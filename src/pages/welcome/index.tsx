import { Alert, Carousel, Typography } from '@arco-design/web-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { ReducerState } from '../../redux';
import useLocale from '../../utils/useLocale';
import styles from './style/index.module.less';
import w1 from '../../assets/welcome1.jpg';
import w2 from '../../assets/welcome2.jpg';
import w3 from '../../assets/welcome3.jpg';
import w4 from '../../assets/welcome4.jpg';
// import imgWorkplace from '../../assets/workplace.png';
// import CodeBlock from './code-block';


const imageSrc = [
  w1, w2, w3, w4
];

export default function Welcome() {
  const locale = useLocale();
  const userInfo = useSelector((state: ReducerState) => state.global.userInfo) || {};
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          {locale['welcome.title.welcome']}
        </Typography.Title>
        <Typography.Text type="secondary">
          {userInfo.name}, {userInfo.email}
        </Typography.Text>
      </div>
      <div className={styles.content}>
        <Alert type="success" content={locale['welcome.invite']} />
        <Carousel
          style={{
            width: '80%',
            height: '60%',
            position: 'fixed'
          }}
          autoPlay={true}
          indicatorType='dot'
          showArrow='hover'
        >
          {imageSrc.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                style={{
                  width: '100%',
                }}
              />
            </div>
          ))}
        </Carousel>
        {/* <Card style={{ marginTop: 20 }} bordered={false} title={locale['welcome.usage']}>
          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            1. {locale['welcome.step.title.pickup']}
          </Typography.Title>
          <Typography.Text>
            {locale['welcome.step.content.pickup']}
            <Tag style={{ marginLeft: 8 }}>@arco-design/pro-pages-workplace</Tag>
          </Typography.Text>

          <Typography.Title heading={6}>2. {locale['welcome.step.title.install']}</Typography.Title>
          <Typography.Text>{locale['welcome.step.content.install']}</Typography.Text>
          <CodeBlock code="arco block use @arco-design/pro-pages-workplace" />

          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            3. {locale['welcome.step.title.result']}
          </Typography.Title>
          <Typography.Text>{locale['welcome.step.content.result']}</Typography.Text>
          <div style={{ marginTop: '1em' }}>
            <Image preview={false} width={600} src={imgWorkplace} />
          </div>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <Typography.Text>{locale['welcome.title.material']}</Typography.Text>
          <div style={{ marginTop: 8 }}>
            <Link target="_blank" href="https://arco.design/material?category=arco-design-pro">
              {locale['welcome.link.material-pro']} <IconDoubleRight />
            </Link>
          </div>
          <div style={{ marginTop: 8 }}>
            <Link target="_blank" href="https://arco.design/material">
              {locale['welcome.link.material-all']} <IconDoubleRight />
            </Link>
          </div>
        </Card> */}
      </div>
    </div>
  );
}
