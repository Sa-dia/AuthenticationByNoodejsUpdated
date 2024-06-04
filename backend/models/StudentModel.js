const db = require('../config/db');

const createXmlDataStudentTable = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS Student (
        student_id INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        session_id INT NOT NULL,
        Class_roll VARCHAR(255) NOT NULL,
        Exam_roll VARCHAR(255) UNIQUE NOT NULL,
        Registration_no VARCHAR(255) UNIQUE NOT NULL,
        Email VARCHAR(255) NOT NULL,
        Password VARCHAR(700) NOT NULL,
        Phone VARCHAR(255) NOT NULL,
        FOREIGN KEY (session_id) REFERENCES Session(Session_Id)
    );
`;
db.query(query, (err, results) => {
    if (err) {
        console.error('Error creating Student table:', err);
        throw err;
    }
    console.log('XML Student Data table created or already exists');
});
};

module.exports = {
    createXmlDataStudentTable
}
