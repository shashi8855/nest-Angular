# nest-Angular

mysql2/promise: Used for creating the nest_js_project database.
TypeORM: Used for connecting to the nest_js_project database and managing the tables within it.

Playwright is a newer automation library developed by Microsoft, 
used for browser automation, testing, and tasks such as generating PDFs, taking screenshots, and scraping web data.

Steps: 
1) Install WAMP/XAMPP for MySQL 3306 and start MySQL.
Ensure that the database is working properly. In Chrome, navigate to: http://localhost/phpmyadmin.
2) Install Node.js 18 LTS.
3) Install Nest.js using the following command:
	npm install -g @nestjs/cli
4) Install Angular using the following command:
	npm install -g @angular/cli
5) Navigate to the backend project directory where the package.json file exists. Open a terminal and run the following command: npm install If you encounter an error, try running:
npm install --legacy-peer-deps

6) After completing step 5, in the same terminal, run: npm start
Check your MySQL database to confirm that the nest_js_project database has been created and the users table is created within it. Keep the backend server running; do not terminate it.

7) Open another terminal and navigate to the Angular project directory where the package.json file exists. Run the following command:npm install If you encounter an error, try running:
npm install --legacy-peer-deps

8) After completing step 7, run: npm start
Once the server starts, you will see localhost:4200 displayed in the terminal. Open your browser and navigate to localhost:4200 to access the application.
