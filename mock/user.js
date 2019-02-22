/* eslint-disable */
// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  'POST /api/user/getCurrentUser': (req, res) => {
    res.send({
      data: {
        realName: '超级管理员',
        loginName: 'admin',
        roleName: '超级管理',
        onlineTime: 30,
        identityCard: '429005199609080071',
        email: 'zhangjin0908@hotmail.com'
      },
      message: '',
      status: 200
    });
  },
  'POST /api/menu/getAccessibleMenuAll': (req, res) => {
    res.send({
      data: [{
        icon: 'smile',
        name: 'baseModel',
        routes: [{
           icon: 'smile',
           name: 'baseMenuUserManage',
           routes: []
        }]
      }],
      message: '',
      status: 200
    });
  }
};
