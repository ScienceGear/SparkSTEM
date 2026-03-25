@echo off
echo ============================================
echo Testing AI Endpoint
echo ============================================
echo.
echo Sending test request to: http://localhost:3000/api/ai/ask
echo.

curl -X POST http://localhost:3000/api/ai/ask ^
  -H "Content-Type: application/json" ^
  -d "{\"question\": \"Explain photosynthesis\"}"

echo.
echo.
echo ============================================
pause
