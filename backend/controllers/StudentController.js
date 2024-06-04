const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const db = require('../config/db');

// Function to handle uploading department data as XML
const uploadStudentAsXML = async (req, res) => {
    const xmlData = req.body;
    console.log('Received XML Data:', xmlData); // Log incoming data for debugging

    xml2js.parseString(xmlData, async (err, result) => {
        if (err) {
            console.error('Error parsing XML:', err);
            return res.status(400).send('Invalid XML data');
        }
        // Session_Id,Dept_Id,Session_Name,Start_Date,End_Date
        const rows = result.root.row;
        try {
            await clearTable('Student'); // Clear the table before inserting new data

            for (const row of rows) {
                const student_id = row.student_id && row.student_id[0];
                const Name = row.Name && row.Name[0];
                const session_id = row.session_id && row.session_id[0];
                const Class_roll=row.Class_roll && row.Class_roll[0];
                const Exam_roll = row.Exam_roll&& row.Exam_roll[0];
                const Registration_no = row.Registration_no && row.Registration_no[0];
                const Email=row.Email && row.Email[0];
                const Password=row.Password && row.Password[0];
                const Phone =row.Phone && row.Phone[0];
               
                // Check if all required fields are present
                if (Name && session_id && Class_roll && Exam_roll && Registration_no && Email && Password && Phone) {
                    const hashedPassword = await bcrypt.hash(Password, 10);
                    await insertXmlStudentIntoDatabase({ student_id,Name,session_id,Class_roll,Exam_roll,Registration_no,Email,hashedPassword,Phone});
                } else {
                    console.warn('Skipping incomplete row:', row);
                }
            }
            res.status(200).send('XML data imported successfully.');
        } catch (error) {
            console.error('Error importing XML data:', error);
            res.status(500).send('Error importing XML data.');
        }
    });
};

// Function to insert department data into the database
const insertXmlStudentIntoDatabase = (data) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Student(student_id,Name,session_id,Class_roll,Exam_roll,Registration_no,Email,Password,Phone) VALUES (?, ?, ?, ?, ?,?,?,?,?)';
        db.query(query, [data.student_id,data.Name,data.session_id,data.Class_roll,data.Exam_roll,data.Registration_no,data.Email,data.hashedPassword,data.Phone], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Function to clear the specified table
const clearTable = (tableName) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM ${tableName}`;
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    uploadStudentAsXML
};
