var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });
});

router.login = function(req, res, next){
	res.render('login', { title: '用户登录'});
	debugger;
};

router.doLogin = function(req, res){
	var user={
		username:'admin',
		password:'1'
	}
	debugger;
	if(req.body.username==user.username && req.body.password==user.password){
		console.log('ready redirect to home');
		req.session.user = user;
		return res.redirect('/home');
	}
	else{
		req.session.error = '用户名或密码不正确';
		return res.redirect('/login');
	}
};

router.logout = function(req, res){
	req.session.user = null;
	res.redirect('/');
};

router.home = function(req, res){
	console.log('in home');
	res.render('home', { title: 'Home'});
};

router.authentication = function(req, res, next) {
	if (!req.session.user) {
		req.session.error='请先登录';
		return res.redirect('/login');
	}
	next();
}

router.notAuthentication = function(req, res, next) {
	if (req.session.user) {
		req.session.error='已登录';
		return res.redirect('/home');
	}
	next();
}

module.exports = router;

