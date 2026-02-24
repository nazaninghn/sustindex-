@echo off
echo ========================================
echo Restarting Frontend with Clean Build
echo ========================================
echo.

cd frontend

echo Step 1: Deleting .next folder...
if exist .next (
    rmdir /s /q .next
    echo OK - .next folder deleted
) else (
    echo OK - .next folder not found
)
echo.

echo Step 2: Starting development server...
echo.
echo IMPORTANT: After server starts, go to:
echo http://localhost:3000/questionnaire/1
echo.
echo Then scroll down to see the YELLOW BOX with RED BORDER
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev
