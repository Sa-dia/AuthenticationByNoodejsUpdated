const express = require('express');
const { uploadSessionAsXML } = require('../controllers/SessionController');

const router = express.Router();

router.post('/upload-session', async (req, res, next) => {
    try {
        // Assuming uploadDeptAsXML is an async function
        await uploadSessionAsXML(req, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        // You can also pass the error to the error handling middleware
        // next(err);
    }
});

module.exports = router;
