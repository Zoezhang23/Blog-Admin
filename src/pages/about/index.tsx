import React, { useEffect } from 'react'
import { Grid, Breadcrumb, Card, Form, Input } from '@arco-design/web-react';
import styles from './style/index.module.less';
import { TagEdite } from './tagEdite'
import BottomFloat from '../../components/BottomFloat/index'

export default function aboutPage() {

    const Row = Grid.Row;
    const Col = Grid.Col;
    const [form] = Form.useForm();
    const TextArea = Input.TextArea;
    //set the value to form
    useEffect(() => {
        setTimeout(() => {
            form.setFieldsValue({
                'tags': ['React', 'HTML', 'CSS', 'JS', 'TS'],
                'describe': 'hello zoe!'

            })
        }, 1000)

    }, [])



    const sumbit = async () => {
        await form.validate();
        const value = await form.getFields();
        console.log(value)
    }
    const onRefresh = () => {
        //todo....
    }
    return (
        <div className={styles.container}>
            <Breadcrumb style={{ marginBottom: 20 }}>
                {/* <Breadcrumb.Item>{locale['menu.list']}</Breadcrumb.Item> */}
                <Breadcrumb.Item>About Page Management</Breadcrumb.Item>
            </Breadcrumb>
            <Row className='grid-gutter-demo' gutter={24}>
                <Col span={12}>
                    <div>
                        <Form
                            layout='vertical'
                            form={form}
                            style={{ width: 600 }}
                        >
                            <Card className='card-custom-hover-style' hoverable>
                                <Form.Item
                                    field='tags'
                                    labelAlign='left'
                                    label='TagClouds(1-20):'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter tag',
                                        },
                                    ]} >
                                    <TagEdite maxTags={20} />
                                </Form.Item>
                                <Form.Item
                                    field='describe'
                                    label='Introduction'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please say somthing about yourself',
                                        },
                                    ]} >
                                    <TextArea
                                        maxLength={{ length: 800, errorOnly: true }}
                                        showWordLimit
                                        placeholder='Please enter no more than 800 letters'
                                        style={{ minHeight: 64 }}
                                    />

                                </Form.Item>
                            </Card>
                            {/* <Button onClick={sumbit} type='primary'>Get all tags</Button> */}
                        </Form>
                    </div>
                </Col>
                <Col span={12}>
                    <div> </div>
                </Col>
            </Row>
            <BottomFloat saveTime={Date.now()} refresh={onRefresh} onSave={sumbit}></BottomFloat>
        </div>

    )
}

