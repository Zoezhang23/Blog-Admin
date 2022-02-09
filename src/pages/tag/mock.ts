import Mock from 'mockjs';
import qs from 'query-string';
import setupMock from '../../utils/setupMock';

const Random = Mock.Random;

let data = Mock.mock({
  'list|55': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      'name|4-8': /[A-Z]/,
      'articleNumber': 0,
      createdTime: Random.datetime(),
      updatedTime: Random.datetime(),
    },
  ],
});

const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = date + ' ' + time;

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/v1/tags'), (params) => {
      switch (params.type) {
        case 'POST': {
          const { name } = JSON.parse(params.body);
          const newCate = Mock.mock({
            'id|8': /[A-Z][a-z][-][0-9]/,
            name,
            'articleNumber': 0,
            createdTime: dateTime,
            updatedTime: Random.datetime(),

          })
          data.list.unshift(newCate);
          return {
            code: 200,
            msg: 'Add Successful!',
            data
          }
        }
        case 'PUT': {
          const { id, name } = JSON.parse(params.body);
          data.list.map((item) => {
            if (item.id === id) {
              item.name = name
            }
          })
          return {
            code: 200,
            msg: 'Update Successful!',
            data: null
          }
        }
        case 'DELETE': {
          const { id } = JSON.parse(params.body);
          const newData = data.list.filter((item) => {
            if (item.id !== id) {
              return item;
            }
          })
          data.list = newData;
          return {
            code: 200,
            msg: 'Deleted Successful!',
            data: null
          }
        }
        case 'GET':
        default:
          const { page = 1, pageSize = 10 } = qs.parseUrl(params.url).query;
          const p = page as number;
          const ps = pageSize as number;
          return {
            list: data.list.slice((p - 1) * ps, p * ps),
            total: 55,
          };
      }

    });
  },
});
