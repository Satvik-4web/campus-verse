:loop
C:\Users\satvi\Downloads\platform-tools-latest-windows\platform-tools\adb.exe shell ip addr show wlan0 > ip_result.txt 2>&1
findstr /C:"device unauthorized" ip_result.txt >nul
if %errorlevel% equ 0 (
    timeout /t 2 /nobreak >nul
    goto loop
)
findstr /C:"device still authorizing" ip_result.txt >nul
if %errorlevel% equ 0 (
    timeout /t 2 /nobreak >nul
    goto loop
)
C:\Users\satvi\Downloads\platform-tools-latest-windows\platform-tools\adb.exe tcpip 5555
