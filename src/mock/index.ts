import Mock from 'mockjs';

import './user';
import './message-box';
import '../pages/search-table/mock';
import '../pages/category/mock';
import '../pages/tag/mock';

Mock.setup({
  timeout: '200-600',
});
