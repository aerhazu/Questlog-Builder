@echo off
setlocal
cd /d "%~dp0" || exit /b 1
if "%~1"=="" (
  echo Drag one or more Minecraft mod .jar files onto this file.
  echo Or run: Generate-Mod-Data.bat "mod.jar" --textures --minecraft-version 1.21.1
  echo See README-Mod-JAR-Generator.txt for installation steps.
  if not defined QUESTLOG_NO_PAUSE pause
  exit /b 0
)
rem Test the interpreter rather than relying on Windows Store aliases.
set "QUESTLOG_PYTHON="
py -3 -c "import sys; sys.exit(not sys.version_info >= (3, 11))" >nul 2>&1
if not errorlevel 1 set "QUESTLOG_PYTHON=py -3"
if not defined QUESTLOG_PYTHON (
  python -c "import sys; sys.exit(not sys.version_info >= (3, 11))" >nul 2>&1
  if not errorlevel 1 set "QUESTLOG_PYTHON=python"
)
if not defined QUESTLOG_PYTHON (
  echo ERROR: Python 3.11 or newer is required. Install Python with its launcher or PATH entry.
  if not defined QUESTLOG_NO_PAUSE pause
  exit /b 1
)
%QUESTLOG_PYTHON% "%~dp0mod_jar_generator.py" %*
set "QUESTLOG_RESULT=%errorlevel%"
echo.
if "%QUESTLOG_RESULT%"=="0" (
  echo Generation complete. See the output paths printed above.
) else (
  echo Generation finished with errors. Check the messages above.
)
if not defined QUESTLOG_NO_PAUSE pause
exit /b %QUESTLOG_RESULT%
