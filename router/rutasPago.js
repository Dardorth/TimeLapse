const express = require('express');
const router = express.Router();

router.post('/pay', async (req, res) => {

    console.log(req.body.name)
    /*
    const body = req.body;
    console.log(body);
    */
});

module.exports = router;