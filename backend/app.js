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
const { createXmlDataSessionTable } = require('./models/SessionModel');
const { createXmlDataStudentTable}= require('./models/StudentModel');
const {createXmlDataExamYearTable}=require('./models/ExamYearModel');
createSuperUserTable();
createXmlDataDeptTable();
createXmlDataTeacherTable();
createXmlDataSessionTable(); 
createXmlDataStudentTable();
createXmlDataExamYearTable();

// Routes
const superUserRoutes = require('./routes/superUserRoutes');
const DeptRoutes = require('./routes/DeptRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const SessionRoutes=require('./routes/SessionRoutes');
const StudentRoutes=require('./routes/StudentRoutes');
const ExamYearRoutes=require('./routes/ExamYearRoutes');

app.use('/api', superUserRoutes);
app.use('/api', DeptRoutes);
app.use('/api', teacherRoutes);
app.use('/api',SessionRoutes);
app.use('/api',StudentRoutes);
app.use('/api',ExamYearRoutes);

// Protected route example
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({
        message: 'This is a protected route',
        authData: req.authData
    });
});

module.exports = app;
