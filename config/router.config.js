export default [{
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [{ 
          path: '/user/login',
          component: './user-login' 
        }],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [{
        name: 'baseModel',
        path: 'baseModel'
      },{
          name: 'baseMenuUserManage',
          path: '/UserManage',
          component: './base-menu/user-manage',
        },
        {
          name: 'exception-403',
          path: '/exception-403',
          component: './exception-403',
        },
        {
          name: 'exception-404',
          path: '/exception-404',
          component: './exception-404',
        },
        {
          name: 'exception-500',
          path: '/exception-500',
          component: './exception-500'
        },
      ],
    },
  ];