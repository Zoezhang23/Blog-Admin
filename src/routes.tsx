import React from 'react';
import { IconList, IconGift, IconSelectAll, IconTag, IconUser } from '@arco-design/web-react/icon';

export const defaultRoute = 'welcome';

export const routes = [
  {
    name: 'menu.welcome',
    key: 'welcome',
    icon: <IconGift />,
    componentPath: 'welcome',
  },
  {
    name: 'menu.list',
    key: 'list',
    icon: <IconList />,
    children: [
      {
        name: 'menu.list.searchTable',
        key: 'list/search-table',
        componentPath: 'search-table',
      },
    ],
  },
  {
    name: 'menu.category',
    key: 'category',
    icon: <IconSelectAll />,
    componentPath: 'category',
  },
  {
    name: 'Tag',
    key: 'tag',
    icon: < IconTag />,
    componentPath: 'tag',
  },
  {
    name: 'About',
    key: 'about',
    icon: <IconUser />,
    componentPath: 'about',
  },
];
