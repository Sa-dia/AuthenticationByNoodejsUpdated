const db = require('../config/db');

const createXmlDataSessionTable = () => {
    const query = `
CREATE TABLE IF NOT EXISTS Session (
    Session_Id INT AUTO_INCREMENT PRIMARY KEY,
    Dept_Id INT,
    Session_name VARCHAR(255) NOT NULL,
    Start_date DATE,
    End_date DATE,
    FOREIGN KEY (Dept_Id) REFERENCES xml_dept_data(Id)
);
`;
db.query(query, (err, results) => {
    if (err) {
        console.error('Error creating xml_dept_data table:', err);
        throw err;
    }
    console.log('XML Session Data table created or already exists');
});
};

module.exports = {
    createXmlDataSessionTable
}
