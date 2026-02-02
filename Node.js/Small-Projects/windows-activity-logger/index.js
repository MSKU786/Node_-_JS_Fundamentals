import { activeWindow } from '@miniben90/x-win';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  logInterval: 2000, // Log every 2 seconds (in milliseconds)
  logFile: path.join(__dirname, 'activity.log'),
  consoleOutput: true, // Show logs in console
  logFormat: 'json' // 'json' or 'text'
};

// Create logs directory if it doesn't exist
const logsDir = path.dirname(CONFIG.logFile);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Track previous window to avoid duplicate logs
let previousWindow = null;

/**
 * Formats log entry based on configuration
 */
function formatLogEntry(windowData) {
  const timestamp = new Date().toISOString();
  
  if (CONFIG.logFormat === 'json') {
    return JSON.stringify({
      timestamp,
      window: {
        id: windowData.id,
        title: windowData.title || 'Unknown',
        processId: windowData.info?.processId,
        application: windowData.info?.execName || 'Unknown',
        executablePath: windowData.info?.path || 'Unknown',
        memory: windowData.usage?.memory || 0,
        position: {
          x: windowData.position?.x,
          y: windowData.position?.y,
          width: windowData.position?.width,
          height: windowData.position?.height
        },
        fullscreen: windowData.fullscreen || false
      }
    });
  } else {
    // Text format
    return `[${timestamp}] ${windowData.info?.execName || 'Unknown'} - ${windowData.title || 'Unknown'} (PID: ${windowData.info?.processId || 'N/A'})`;
  }
}

/**
 * Logs the current active window activity
 */
function logActivity() {
  try {
    const currentWindow = activeWindow();
    
    // Skip if window hasn't changed (optional optimization)
    if (previousWindow && 
        previousWindow.id === currentWindow.id && 
        previousWindow.title === currentWindow.title) {
      return;
    }
    
    const logEntry = formatLogEntry(currentWindow);
    const logLine = CONFIG.logFormat === 'json' ? logEntry : logEntry + '\n';
    
    // Write to file
    fs.appendFileSync(CONFIG.logFile, logLine + '\n', 'utf8');
    
    // Console output
    if (CONFIG.consoleOutput) {
      const appName = currentWindow.info?.execName || 'Unknown';
      const title = currentWindow.title || 'Unknown';
      console.log(`[${new Date().toLocaleTimeString()}] Active: ${appName} - ${title}`);
    }
    
    // Update previous window
    previousWindow = {
      id: currentWindow.id,
      title: currentWindow.title
    };
    
  } catch (error) {
    console.error(`Error logging activity: ${error.message}`);
  }
}

/**
 * Graceful shutdown handler
 */
function shutdown() {
  console.log('\nShutting down Windows Activity Logger...');
  console.log(`Log file saved at: ${CONFIG.logFile}`);
  process.exit(0);
}

// Handle graceful shutdown
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Start logging
console.log('Windows Activity Logger Started');
console.log(`Logging interval: ${CONFIG.logInterval}ms`);
console.log(`Log file: ${CONFIG.logFile}`);
console.log(`Log format: ${CONFIG.logFormat.toUpperCase()}`);
console.log('Press Ctrl+C to stop...\n');

// Initial log
logActivity();

// Set up interval for continuous logging
const intervalId = setInterval(logActivity, CONFIG.logInterval);

// Keep the process alive
process.on('exit', () => {
  clearInterval(intervalId);
});

