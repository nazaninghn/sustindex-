@echo off
echo ========================================
echo Deployment Configuration Verification
echo ========================================
echo.

echo [1/6] Checking render.yaml configuration...
findstr /C:"rootDir: sustindex-" sustindex-\render.yaml >nul
if %errorlevel% equ 0 (
    echo [OK] rootDir is set to sustindex-
) else (
    echo [ERROR] rootDir not found or incorrect
)
echo.

echo [2/6] Checking build.sh for correct pip install...
findstr /C:"pip install -r requirements.txt" sustindex-\build.sh >nul
if %errorlevel% equ 0 (
    echo [OK] pip install command found
) else (
    echo [ERROR] pip install command not found
)
echo.

echo [3/6] Checking build.sh for incorrect cd before pip...
findstr /B "cd sustindex-" sustindex-\build.sh | findstr /C:"pip install" >nul
if %errorlevel% neq 0 (
    echo [OK] No cd sustindex- before pip install
) else (
    echo [ERROR] Found cd sustindex- before pip install
)
echo.

echo [4/6] Checking requirements.txt exists...
if exist "sustindex-\requirements.txt" (
    echo [OK] requirements.txt found
) else (
    echo [ERROR] requirements.txt not found
)
echo.

echo [5/6] Checking Next.js config...
findstr /C:"output: 'export'" frontend\next.config.js >nul
if %errorlevel% equ 0 (
    echo [OK] Next.js export mode configured
) else (
    echo [ERROR] Next.js export mode not configured
)
echo.

echo [6/6] Checking Next.js distDir...
findstr /C:"distDir: '../sustindex-/frontend-build'" frontend\next.config.js >nul
if %errorlevel% equ 0 (
    echo [OK] Next.js distDir configured correctly
) else (
    echo [ERROR] Next.js distDir not configured correctly
)
echo.

echo ========================================
echo Verification Complete!
echo ========================================
echo.
echo If all checks show [OK], you're ready to deploy!
echo.
echo Next steps:
echo 1. git add -A
echo 2. git commit -m "Fix deployment configuration"
echo 3. git push origin main
echo 4. Deploy on Render.com
echo.
pause
