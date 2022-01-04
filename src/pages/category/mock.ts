import Mock from 'mockjs';
import qs from 'query-string';
import setupMock from '../../utils/setupMock';

const Random = Mock.Random;

const data = Mock.mock({
  'list|55': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      'name|4-8': /[A-Z]/,
      'articleNumber|4': /[A-Z][a-z][-][0-9]/,
      createdTime: Random.datetime(),
      updatedTime: Random.datetime(),
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/v1/categories'), (params) => {
      switch (params.type) {
        case 'POST':
          const { name } = JSON.parse(params.body);
          const newCate = Mock.mock({
            'id|8': /[A-Z][a-z][-][0-9]/,
            name,
            'articleNumber': 0,
            createdTime: Random.datetime(),
            updatedTime: Random.datetime(),

          })
          data.list.unshift(newCate);
          return {
            code: 200,
            msg: 'Successful!',
            data
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
