const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const verifyToken = require('./middlewares/authMiddleware');
const fileUpload = require('express-fileupload');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'application/xml' }));
app.use(fileUpload());

// Create tables if they do not exist
const { createSuperUserTable } = require('./models/superUserModel');
const { createXmlDataDeptTable } = require('./models/DeptModel');
const { createXmlDataTeacherTable } = require('./models/teacherModel');

createSuperUserTable();
createXmlDataDeptTable();
createXmlDataTeacherTable();

// Routes
const superUserRoutes = require('./routes/superUserRoutes');
const DeptRoutes = require('./routes/DeptRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

app.use('/api', superUserRoutes);
app.use('/api', DeptRoutes);
app.use('/api', teacherRoutes);

// Protected route example
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({
        message: 'This is a protected route',
        authData: req.authData
    });
});

module.exports = app;
