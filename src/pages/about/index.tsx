import React, { useEffect } from 'react'
import { Grid, Breadcrumb, Card, Form, Input } from '@arco-design/web-react';
import styles from './style/index.module.less';
import { TagEdite } from './tagEdite'
import BottomFloat from '../../components/BottomFloat/index'
import { ImgUpload } from '../../components/ImgUpload/index'

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
                'describe': 'hello zoe!',
                'imgs': [
                    {
                        _id: '',
                        link: '',
                        url: ' ',
                        icon: '',
                        showAddBtn: true,
                        showDelBtn: false,
                    }
                ],
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
    const onChange = (data) => {
        console.log('onChange', data)
    }
    return (
        <div className={styles.container}>
            <Breadcrumb style={{ marginBottom: 20 }}>
                {/* <Breadcrumb.Item>{locale['menu.list']}</Breadcrumb.Item> */}
                <Breadcrumb.Item>About Page Management</Breadcrumb.Item>
            </Breadcrumb>
            <Form layout='vertical' form={form}>
                <Row className='grid-gutter-demo' gutter={24} style={{ width: '100%' }}>
                    <Col span={12}>
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

                    </Col>
                    <Col span={12}>
                        <Form.Item
                            field='imgs'
                            labelAlign='left'
                            label='Upload image'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a image',
                                },
                            ]} >
                            {/* onChang as top parent have this function by default and will pass to child*/}
                            {/* Form.item have the value props by default. could sent to child */}
                            <ImgUpload value maxImgs={3} onChange={onChange} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <BottomFloat saveTime={Date.now()} refresh={onRefresh} onSave={sumbit}></BottomFloat>
        </div>

    )
}

