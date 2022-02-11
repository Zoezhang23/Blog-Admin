import React, { useEffect, useState } from 'react'
import { IconPlus, IconEdit, IconDelete } from '@arco-design/web-react/icon';
import { Upload, Progress, Modal, Button, Form, Input, Message } from '@arco-design/web-react';

export const ImageItem = (props) => {
    const { url, link, index = 0, icon, onChange, addOne, deleteOne, showAddBtn, showDelBtn } = props

    //form part
    const [file, setFile] = useState<any>({
        url: url
    })
    const cs = `arco-upload-list-item${file && file.status === 'error' ? ' is-error' : ''}`;

    //modal part
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();


    useEffect(() => {
        setFile({ url: url })
        form.setFieldValue('url', file.url)
    }, [url])


    function onOk() {
        form.validate().then((res) => {
            setConfirmLoading(true);
            setTimeout(async () => {
                const values = await form.getFields();
                //use onChange to pass the value back to parent component
                onChange({
                    //the index of which image
                    index,
                    //which filed need to change
                    filed: 'url',
                    value: values.url
                });
                Message.success('Success !');
                setVisible(false);
                setConfirmLoading(false);
            }, 1000);
        });
    }
    const changeLink = (value) => {
        //use the parent funtion.
        onChange({
            //the index of which image
            index,
            //which filed need to change
            filed: 'link',
            value: value
        });
    }
    const changeIcon = (value) => {
        onChange({
            //the index of which image
            index,
            //which filed need to change
            filed: 'icon',
            value: value
        });
    }

    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 20,
        },
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-around' }}>
                {
                    showAddBtn && <Button type='primary' icon={<IconPlus />} onClick={addOne} />}
                {
                    //    delete need to use call back with parameters
                    showDelBtn && <Button type='primary' status='danger' icon={<IconDelete />} onClick={() => { deleteOne(index) }} />
                }

            </div>
            <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', marginLeft: 20 }}>
                <Upload
                    action='/'
                    fileList={file ? [file] : []}
                    showUploadList={false}
                    onChange={(_, currentFile) => {
                        setFile({
                            ...currentFile,
                            url: URL.createObjectURL(currentFile.originFile),
                        })
                    }}
                    onProgress={(currentFile: any) => {
                        setFile(currentFile)
                    }}
                >
                    <div className={cs} style={{ paddingRight: 0 }}>
                        {file && file.url ? (
                            <div className='arco-upload-list-item-picture custom-upload-avatar'>
                                <img src={file.url} />
                                <div className='arco-upload-list-item-picture-mask'>
                                    <IconEdit />
                                </div>
                                {file.status === 'uploading' && file.percent < 100 && <Progress
                                    percent={file.percent}
                                    type='circle'
                                    size='mini'
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translateX(-50%) translateY(-50%)'
                                    }}
                                />
                                }
                            </div>
                        ) : (
                            <div className='arco-upload-trigger-picture'>
                                <div className='arco-upload-trigger-picture-text'>
                                    <IconPlus />
                                    <div style={{ marginTop: 10, fontWeight: 600 }}>Upload</div>
                                </div>
                            </div>
                        )}
                    </div>
                </Upload>

                {/* //button+modal */}

                <Button size='small' onClick={() => setVisible(true)} type='primary'>
                    Input image link
                </Button>
                <Modal
                    title='Input Image Link'
                    visible={visible}
                    onOk={onOk}
                    confirmLoading={confirmLoading}
                    onCancel={() => { form.resetFields(); setVisible(false) }}
                >
                    <Form
                        {...formItemLayout}
                        form={form}
                        // field = 'link'
                        labelCol={{ style: { flexBasis: 80 } }}
                        wrapperCol={{ style: { flexBasis: 'calc(100% - 80px)' } }}
                    >
                        <Form.Item label='URL' field='url' rules={[{ required: true, message: 'Please input the image URL' }]}>
                            <Input placeholder='' />
                        </Form.Item>
                    </Form>
                </Modal>

            </div>
            <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-around', marginLeft: 20, }}>
                <Input onChange={changeLink} value={link} style={{ width: 350 }} addBefore='Link' placeholder='Please enter' />
                <Input onChange={changeIcon} value={icon} style={{ width: 350 }} addBefore='Icon' placeholder='Please enter' />
            </div>

        </div>
    );
}
