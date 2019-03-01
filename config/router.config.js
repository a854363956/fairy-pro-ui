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
        name: 'baseMenuInfoManage',
        path: '/baseModel/baseMenuInfoManage',
        component: './base-menu/user-manage',
      },{
        name: 'baseMenuRoleManage',
        path: '/baseModel/baseMenuRoleManage',
        component: './base-menu/user-manage',
      },{
        name: 'baseModel',
        path: 'baseModel'
      },{
        name: 'permissionModule',
        path: 'permissionModule'
      },{
          name: 'baseMenuUserManage',
          path: '/baseModel/userManage',
          component: './base-menu/user-manage',
      },{
          name: 'exception-403',
          path: '/exception/exception-403',
          component: './exception-403',
      },{
          name: 'exception-404',
          path: '/exception/exception-404',
          component: './exception-404',
      },{
          name: 'exception-500',
          path: '/exception/exception-500',
          component: './exception-500'
      },
      ],
    },
  ];