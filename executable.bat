@echo off


REM Install Node.js
npm install -g serve

REM Install Angular CLI globally
npm install -g @angular/cli@latest

REM Start the Angular development server by calling a separate batch file
call start-server.bat
