import React, { useEffect } from 'react';
import {
    Table,
    Button,
    Input,
    Breadcrumb,
    Card,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import {
    UPDATE_FORM_PARAMS,
    UPDATE_LIST,
    UPDATE_LOADING,
    UPDATE_PAGINATION,
} from './redux/actionTypes';
import useLocale from '../../utils/useLocale';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { category } from '../../api/category';

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

    async function fetchData(current = 1, pageSize = 10, params = {}) {
        dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
        try {
            const postData = {
                page: current,
                pageSize,
                ...params,
            }


            const res: any = await category(postData);
            console.log(res);
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
        // axios
        //     .get(`/api/v1/category`, {
        //         params: {
        //             page: current,
        //             pageSize,
        //             ...params,
        //         },
        //     })
        //     .then((res) => {
        //         dispatch({ type: UPDATE_LIST, payload: { data: res.data.list } });
        //         dispatch({
        //             type: UPDATE_PAGINATION,
        //             payload: { pagination: { ...pagination, current, pageSize, total: res.data.total } },
        //         });
        //         dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
        //         dispatch({ type: UPDATE_FORM_PARAMS, payload: { params } });
        //     });
    }

    function onChangeTable(pagination) {
        const { current, pageSize } = pagination;
        fetchData(current, pageSize, formParams);
    }

    function onSearch(keyword) {
        fetchData(1, pagination.pageSize, { keyword });
    }

    // function onDateChange(date) {
    //     const [start, end] = date;
    //     fetchData(1, pagination.pageSize, {
    //         createdTimeStart: start,
    //         createdTimeEnd: end,
    //     });
    // }

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
                        <Button type="primary">Add Category</Button>
                    </div>
                    <div>
                        {/* <DatePicker.RangePicker style={{ marginRight: 8 }} onChange={onDateChange} /> */}
                        <Input.Search
                            style={{ width: 300 }}
                            searchButton
                            // placeholder={locale['searchTable.placeholder.name']}
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
