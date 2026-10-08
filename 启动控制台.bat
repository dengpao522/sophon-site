@echo off
rem 强制控制台使用 UTF-8，避免中文路径/输出乱码
chcp 65001 >nul
rem 切换到本脚本所在目录（即 ULM 控制台前端目录）
cd /d "%~dp0"
echo 正在启动 ULM 控制台（端口 5178）...
echo 启动后请用浏览器访问：http://127.0.0.1:5178/
echo 关闭本窗口即停止控制台。
echo.
call npm run dev
