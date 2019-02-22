/* eslint-disable */
export default {
  'POST /api/user/findUserAll': (req, res) => {
    setTimeout(() => {
      const { pageSize, pageNo } = req.body.data;
      const datas = [];
      for (let i = 0; i < 50; i += 1) {
        datas.push({
          id: i,
          loginName: `admin_${i}_${pageNo}`,
          realName: `系统管理员_${i}_${pageNo}`,
          identityCard: `429005199609080071_${i}_${pageNo}`,
          roleName: `维护员_${i}_${pageNo}`,
          email: `zhangjin0908@Hotmail.com_${i}_${pageNo}`,
          onlineTime: 30,
        });
      }
      res.send({
        status: 200,
        message: 'Data operation completed.',
        data: {
          pageSize,
          pageNo,
          data: datas,
          total: 200,
        },
      });
    }, 600);
  },
};
