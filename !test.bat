@echo off
cls

cd app

goto start

:reload
echo [[Application reloaded]]

:start
if exist app.exe (
    call app.exe
) else (
    node app.js
)

pause

cls
goto reload