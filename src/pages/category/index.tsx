import React, { useEffect } from 'react';
import { Modal, Form, Message, Table, Button, Input, Breadcrumb, Card, } from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_FORM_PARAMS, UPDATE_LIST, UPDATE_LOADING, UPDATE_PAGINATION, ADD_CATEGORY_NAME } from './redux/actionTypes';
import useLocale from '../../utils/useLocale';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { categoryList, addCategory } from '../../api/category';
import { useState } from 'react';
function CategoryTable() {
    const locale = useLocale();

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'ArticleNumber',
            dataIndex: 'articleNumber',

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
            render: () => (
                <div className={styles.operations}>
                    <Button type="text" size="small">
                        {locale['searchTable.columns.operations.update']}
                    </Button>
                    <Button type="text" status="danger" size="small">
                        {locale['searchTable.columns.operations.delete']}
                    </Button>
                </div>
            ),
        },
    ];

    const categoryTableState = useSelector((state: ReducerState) => state.categoryTable);

    const { data, pagination, loading, formParams } = categoryTableState;

    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, []);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    async function fetchData(current = 1, pageSize = 10, params = {}) {
        dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
        try {
            const postData = {
                page: current,
                pageSize,
                ...params,
            }

            const res: any = await categoryList(postData);
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

        }
    }

    function onChangeTable(pagination) {
        const { current, pageSize } = pagination;
        fetchData(current, pageSize, formParams);
    }

    function onSearch(keyword) {
        fetchData(1, pagination.pageSize, { keyword });
    }


    async function onOk() {
        const res = await form.validate();
        try {
            setConfirmLoading(true);
            const resp: any = await addCategory(res);
            if (resp.code === 200) {
                dispatch({ type: ADD_CATEGORY_NAME, payload: { data: resp.data.list } });
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

    return (
        <div className={styles.container}>
            <Breadcrumb style={{ marginBottom: 20 }}>
                {/* <Breadcrumb.Item>{locale['menu.list']}</Breadcrumb.Item> */}
                <Breadcrumb.Item>Category</Breadcrumb.Item>
            </Breadcrumb>
            <Card bordered={false}>
                <div className={styles.toolbar}>
                    <div>
                        {/* <Button type="primary">{locale['searchTable.addPolicy']}</Button> */}
                        <Button type="primary" onClick={() => setVisible(true)}>Add Category</Button>
                        {/*  modal part */}
                        <Modal
                            title='Add Category Name'
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
                                    <Input placeholder='Please input the category name' />
                                </FormItem>
                            </Form>
                        </Modal>
                    </div>
                    <div>

                        <Input.Search
                            style={{ width: 300 }}
                            searchButton
                            placeholder='Please input the category name'
                            onSearch={onSearch}
                        />
                    </div>
                </div>
                <Table
                    rowKey="id"
                    loading={loading}
                    onChange={onChangeTable}
                    pagination={pagination}
                    columns={columns}
                    data={data}
                />
            </Card>
        </div>
    );
}

export default CategoryTable;
