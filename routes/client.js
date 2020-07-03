var express = require('express');
var router = express.Router();

router.get('/', (req,res) => {
    const path = require('path');
    console.log(__dirname);
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

module.exports = router;
