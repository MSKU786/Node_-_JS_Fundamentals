# Windows Activity Logger

A simple Node.js desktop application that monitors and logs Windows activity using the `@miniben90/x-win` library.

## Features

- 🖥️ Monitors active Windows applications in real-time
- 📝 Logs window activity to a file
- 📊 Captures detailed information:
  - Window title
  - Application name
  - Process ID
  - Executable path
  - Memory usage
  - Window position and size
  - Fullscreen status
- ⚙️ Configurable logging interval
- 📄 Supports JSON and text log formats
- 🎯 Console output for real-time monitoring

## Installation

1. Navigate to the project directory:
```bash
cd Node.js/Small-Projects/windows-activity-logger
```

2. Install dependencies:
```bash
npm install
```

## Usage

Run the application:
```bash
npm start
```

The application will:
- Start monitoring Windows activity
- Log entries to `activity.log` file
- Display active window information in the console
- Continue running until you press `Ctrl+C`

## Configuration

You can modify the configuration in `index.js`:

```javascript
const CONFIG = {
  logInterval: 2000,      // Log every 2 seconds (in milliseconds)
  logFile: 'activity.log', // Log file path
  consoleOutput: true,     // Show logs in console
  logFormat: 'json'        // 'json' or 'text'
};
```

## Log Format

### JSON Format (default)
```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "window": {
    "id": 12345,
    "title": "Document - Notepad",
    "processId": 5678,
    "application": "notepad.exe",
    "executablePath": "C:\\Windows\\System32\\notepad.exe",
    "memory": 1234567,
    "position": {
      "x": 100,
      "y": 100,
      "width": 800,
      "height": 600
    },
    "fullscreen": false
  }
}
```

### Text Format
```
[2024-01-15T10:30:45.123Z] notepad.exe - Document - Notepad (PID: 5678)
```

## Requirements

- Node.js (v14 or higher)
- Windows OS (Windows 10+)
- The `@miniben90/x-win` library supports Windows, macOS, and Linux, but this project is optimized for Windows

## Notes

- The application polls the active window at regular intervals
- Duplicate entries (same window) are skipped to reduce log file size
- Logs are appended to the file, so previous logs are preserved
- Press `Ctrl+C` to gracefully stop the application

## License

MIT

