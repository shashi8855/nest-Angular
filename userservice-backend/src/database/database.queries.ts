export const DatabaseQueries = {

    createDatabase: 'CREATE DATABASE IF NOT EXISTS nest_js_project',

    createTable: `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            phone_number CHAR(10) NOT NULL,
            address VARCHAR(255) NOT NULL
          )
        `,
};
