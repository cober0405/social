/**
 * Created by B-04 on 2017/5/17.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect("/topic/demo");
});

router.get('/demo', function(req, res, next) {
    res.render('demo', {
        title: '大V指路',
        tabFlag: 3
    });
});

router.get('/list', function(req, res, next) {
    res.render('topic_list', {
        title: '大V指路'
    });
});

router.get('/add', function(req, res, next) {
    res.render('topic_add', {
        title: '大V指路'
    });
});

module.exports = router;
