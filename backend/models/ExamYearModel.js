const db = require('../config/db');

const createXmlDataExamYearTable = () => {
    const query = `
CREATE TABLE IF NOT EXISTS ExamYear (
    exam_year_id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    Education_level ENUM('Graduate', 'Undergraduate', 'Postgraduate') NOT NULL,
    Exam_year INT NOT NULL,
    Year INT NOT NULL,
    Semester INT NOT NULL,
    FOREIGN KEY (session_id) REFERENCES Session(Session_id)
);
`;
db.query(query, (err, results) => {
    if (err) {
        console.error('Error creating Exam Year table:', err);
        throw err;
    }
    console.log('XML Exam Year Data table created or already exists');
});
};

module.exports = {
    createXmlDataExamYearTable
}