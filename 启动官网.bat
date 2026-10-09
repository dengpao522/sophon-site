@echo off
rem 切换到本脚本所在目录（即官网根目录），保证从任何位置双击都能正确启动
cd /d "%~dp0"
echo 正在启动官网服务器（端口 5177）...
echo 浏览器将自动打开 http://127.0.0.1:5177/
echo 关闭本窗口即停止官网服务。
echo.
start "" "http://127.0.0.1:5177/"
python -m http.server 5177 --bind 127.0.0.1
