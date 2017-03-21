let db = require('../models')

const crypto = require('crypto');
const shortid = require('shortid');

module.exports = {
  index : function(req, res, next){
    db.User.find().then((users) => {
      res.json(users)
    })
  },
  create: function(req, res, next){
    console.log('run', req.body);
    const secret = shortid.generate();
    const hash = crypto.createHmac('sha256', secret)
                       .update('secret')
                       .digest('hex');
    db.User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      salt: secret,
      password: hash
    })
  },
  login: function(req, res, next){
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      console.log('found it');
      const hash = crypto.createHmac('sha256', user.salt)
      .update(req.body.password)
      .digest('hex');

      if (user.password == hash) {
        res.json({
          status: true,
          msg: 'login success'
        })
      }
    })
  }
}