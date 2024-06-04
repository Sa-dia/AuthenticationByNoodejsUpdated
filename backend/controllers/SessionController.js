const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const db = require('../config/db');

// Function to handle uploading department data as XML
const uploadSessionAsXML = async (req, res) => {
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
            await clearTable('Session'); // Clear the table before inserting new data

            for (const row of rows) {
                const Session_Id = row.Session_Id && row.Session_Id[0];
                const Dept_Id = row.Dept_Id && row.Dept_Id[0];
                const Session_Name = row.Session_Name && row.Session_Name[0];
                const Start_Date = row.Start_Date && row.Start_Date[0];
                const End_Date = row.End_Date && row.End_Date[0];
               
                // Check if all required fields are present
                if (Dept_Id && Session_Name && Start_Date && End_Date) {
                    await insertXmlSessionIntoDatabase({ Session_Id,Dept_Id,Session_Name,Start_Date,End_Date });
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
const insertXmlSessionIntoDatabase = (row) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Session (Session_Id,Dept_Id,Session_Name,Start_Date,End_Date) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [row.Session_Id , row.Dept_Id, row.Session_Name, row.Start_Date, row.End_Date], (err, results) => {
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
    uploadSessionAsXML
};
