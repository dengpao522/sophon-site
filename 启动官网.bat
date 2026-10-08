@echo off
rem 强制控制台使用 UTF-8，避免中文路径/输出乱码
chcp 65001 >nul
rem 切换到本脚本所在目录（即官网根目录），保证从任何位置双击都能正确启动
cd /d "%~dp0"
echo 正在启动官网服务器（端口 5177）...
echo 启动后请用浏览器访问：http://127.0.0.1:5177/
echo 关闭本窗口即停止官网服务。
echo.
python -m http.server 5177 --bind 127.0.0.1
