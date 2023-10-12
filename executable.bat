@echo off

REM Discover the project directory dynamically by using the location of this batch script
setlocal enabledelayedexpansion
set "SCRIPT_DIR=%~dp0"
set "PROJECT_DIR=%SCRIPT_DIR%..\"

REM Install Node.js
npm install -g serve

REM Install Angular CLI globally
npm install -g @angular/cli@latest

REM Start the Angular development server using the dynamic project directory
cd "%PROJECT_DIR%"
call start-server.bat
