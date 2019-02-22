function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
}

export default {
  'POST /api/user/login': (req, res) => {
    const { loginName, password } = req.body.data;
    if (password === 'admin' && loginName === 'admin') {
      res.send({
        status: 200,
        message: 'Data operation completed.',
        data: {
          sessionCode: '5e7187526bb84317913fdb781cce04ae323debabfe84469ebb873af1cc18113e',
          status: 'SUCCESS',
        },
      });
    } else {
      res.send({
        status: 200,
        message: 'Data operation completed.',
        data: {
          sessionCode: '',
          status: 'WRONG_PASSWORD',
        },
      });
    }
  },
  'GET /api/user-login/captcha': getFakeCaptcha,
};
