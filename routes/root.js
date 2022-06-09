const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Root', message: 'header'});
});
router.get('/:num', (req, res) => {
    res.send(`level ${req.params.num}`);
});

module.exports = router;