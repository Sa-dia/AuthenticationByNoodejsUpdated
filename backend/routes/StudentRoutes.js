const express = require('express');
const { uploadStudentAsXML } = require('../controllers/StudentController');

const router = express.Router();

router.post('/upload-student', async (req, res, next) => {
    try {
        // Assuming uploadDeptAsXML is an async function
        await uploadStudentAsXML(req, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        // You can also pass the error to the error handling middleware
        // next(err);
    }
});

module.exports = router;