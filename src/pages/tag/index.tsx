import React, { useEffect } from 'react';
import { Modal, Form, Message, Switch, Table, Button, Input, Breadcrumb, Card, Popconfirm } from '@arco-design/web-react';
import { IconCheck, IconClose } from '@arco-design/web-react/icon';

import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_FORM_PARAMS, UPDATE_LIST, UPDATE_LOADING, UPDATE_PAGINATION, ADD_TAG_NAME, } from './redux/actionTypes';
import useLocale from '../../utils/useLocale';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { tagList, addTag, updateTag, deleteTag, updateTagStatus } from '../../api/tag';
import { useState } from 'react';
import { EditableCell, EditableRow } from './editeItem';

function CategoryTable() {
    const locale = useLocale();

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            editable: true,

        },
        {
            title: 'ArticleNumber',
            dataIndex: 'articleNumber',

        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_, record: any) => (
                <Switch checkedIcon={<IconCheck />} uncheckedIcon={<IconClose />} checked={record.status} onChange={(checked) => { updateStatus(checked, record.id) }} />
            )
        },
        {
            title: 'CreatedTime',
            dataIndex: 'createdTime',
        },
        {
            title: 'UpdatedTime',
            dataIndex: 'updatedTime',
        },
        {
            title: locale['searchTable.columns.operations'],
            dataIndex: 'operations',
            render: (_, record) => (
                <div className={styles.operations}>
                    {/* <Button type="text" size="small">
                        {locale['searchTable.columns.operations.update']}
                    </Button> */}
                    <Popconfirm disabled={record.status}
                        title='Are you sure you want to delete?'
                        onOk={() => {
                            removeRow(record);
                        }}
                        onCancel={() => {
                            Message.error({ content: 'cancel' });
                        }}
                    >
                        <Button type="text" status="danger" size="small" disabled={record.status}> {locale['searchTable.columns.operations.delete']}</Button>
                    </Popconfirm>

                </div>
            ),
        },
    ];

    const tagTableState = useSelector((state: ReducerState) => state.tagTable);

    const { data, pagination, loading, formParams } = tagTableState;

    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const FormItem = Form.Item;


    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData(current = 1, pageSize = 10, params = {}) {
        dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
        try {
            const postData = {
                page: current,
                pageSize,
                ...params,
            }
            const res: any = await tagList(postData);
            if (res) {
                dispatch({ type: UPDATE_LIST, payload: { data: res.list } });
                dispatch({
                    type: UPDATE_PAGINATION,
                    payload: { pagination: { ...pagination, current, pageSize, total: res.total } },
                });
                dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
                dispatch({ type: UPDATE_FORM_PARAMS, payload: { params } });
            }

        } catch (error) {
            console.log('94', error);

        }
    }

    function onChangeTable(pagination) {
        const { current, pageSize } = pagination;
        fetchData(current, pageSize, formParams);
    }

    function onSearch(keyword) {
        fetchData(1, pagination.pageSize, { keyword });
    }
    async function removeRow(key) {
        try {
            const res: any = await deleteTag(key);
            if (res.code === 200) {
                Message.info({ content: 'ok' });
                fetchData();
            }
        } catch (error) {
            Message.error({ content: error });
        }
    }
    async function onOk() {
        const res = await form.validate();
        try {
            setConfirmLoading(true);
            const resp: any = await addTag(res);
            if (resp.code === 200) {
                dispatch({ type: ADD_TAG_NAME, payload: { data: resp.data.list } });
                Message.success(resp.msg);
                setVisible(false);
                setConfirmLoading(false);
                form.resetFields();

            }
        } catch (error) {
            console.log(error);
        }
    }

    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 20,
        },
    };
    //send axios requst to update the data
    const onHandleSave = async (rowData) => {
        if (rowData.status === true) {
            Message.warning('Sorry,you can not change it ! ');
        } else {
            try {
                const res: any = await updateTag(rowData);
                if (res.code === 200) {
                    Message.success(res.msg);
                    fetchData();
                }
            } catch (error) {
                Message.error(error);
            }
        }

    }
    const updateStatus = async (checked: boolean, id: string) => {
        try {
            const res: any = await updateTagStatus({ id, checked });
            if (res.code === 200) {
                Message.success(res.msg);
                fetchData();
            }
        } catch (error) {
            Message.error(error);
        }
    }

    return (
        <div className={styles.container}>
            <Breadcrumb style={{ marginBottom: 20 }}>
                {/* <Breadcrumb.Item>{locale['menu.list']}</Breadcrumb.Item> */}
                <Breadcrumb.Item>Tag Page Managment</Breadcrumb.Item>
            </Breadcrumb>
            <Card bordered={false}>
                <div className={styles.toolbar}>
                    <div>
                        {/* <Button type="primary">{locale['searchTable.addPolicy']}</Button> */}
                        <Button type="primary" onClick={() => setVisible(true)}>Add Tag</Button>
                        {/*  modal part */}
                        <Modal
                            title='Add Tag Name'
                            visible={visible}
                            onOk={onOk}
                            confirmLoading={confirmLoading}
                            onCancel={() => { form.resetFields(); }}
                        >
                            <Form
                                {...formItemLayout}
                                form={form}
                                labelCol={{ style: { flexBasis: 80 } }}
                                wrapperCol={{ style: { flexBasis: 'calc(100% - 80px)' } }}
                            >
                                <FormItem label='Name' field='name' rules={[{ required: true }]}>
                                    <Input placeholder='Please input the Tag name' />
                                </FormItem>
                            </Form>
                        </Modal>
                    </div>
                    <div>

                        <Input.Search
                            style={{ width: 300 }}
                            searchButton
                            placeholder='Please input the tag name'
                            onSearch={onSearch}
                        />
                    </div>
                </div>
                <Table
                    rowKey="id"
                    loading={loading}
                    onChange={onChangeTable}
                    pagination={pagination}
                    components={{
                        body: {
                            row: EditableRow,
                            cell: EditableCell,
                        },
                    }}
                    columns={columns.map((column) =>

                        column.editable
                            ? {
                                ...column,
                                onCell: () => ({
                                    onHandleSave

                                }),
                            }
                            : column

                    )}
                    className={styles['table-demo-editable-cell']}
                    data={data}
                />
            </Card>
            {/* {result === data11.toString() ? console.log(data11) : <div>GoodBye</div>} */}

        </div>

    );
}

export default CategoryTable;
