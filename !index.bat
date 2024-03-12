@echo off
cls

cd app

if exist app.exe (
    call app.exe
) else (
    node app.js
)