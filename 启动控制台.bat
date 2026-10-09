@echo off
rem 切换到本脚本所在目录，再进入控制台前端目录（package.json 所在处）
cd /d "%~dp0"
cd /d "%~dp0console-app"
echo 正在启动 ULM 控制台（端口 5178）...
echo 浏览器将自动打开 http://127.0.0.1:5178/
echo 关闭本窗口即停止控制台。
echo.
start "" "http://127.0.0.1:5178/"
call npm run dev
