# Server-Sent Events Debug Project

This project demonstrates Server-Sent Events (SSE) with comprehensive debugging capabilities.

## Debugging Setup

### VS Code Debugging

1. **Open the project in VS Code**
2. **Set breakpoints** by clicking on the line numbers in `index.js`
3. **Press F5** or go to Run → Start Debugging
4. **Select "Debug SSE Server"** from the dropdown

### Debug Configurations Available

- **Debug SSE Server**: Normal debugging mode
- **Debug SSE Server (Break on Start)**: Stops at the first line for inspection
- **Attach to SSE Server**: Attach to an already running Node.js process

### Using the Debugger

1. **Set breakpoints** at these strategic locations:

   - Line 4: Root endpoint request inspection
   - Line 12: SSE stream setup inspection
   - Line 35: Server startup inspection

2. **Debug variables** in the Debug Console:

   - `req.url` - Request URL
   - `req.headers` - Request headers
   - `message` - SSE message content

3. **Step through code** using:
   - F10: Step Over
   - F11: Step Into
   - Shift+F11: Step Out
   - F5: Continue

## Running the Project

### Normal Mode

```bash
npm start
# or
node index.js
```

### Debug Mode with Breakpoints

```bash
npm run debug
# or
node --inspect index.js
```

### Debug Mode with Break on Start

```bash
npm run debug-brk
# or
node --inspect-brk index.js
```

## Testing

1. **Start the server** in debug mode
2. **Open `test-client.html`** in your browser
3. **Set breakpoints** in VS Code
4. **Click "Connect to SSE"** to trigger the SSE endpoint
5. **Use the debugger** to inspect variables and step through code

## Endpoints

- **GET /** - Root endpoint (triggers breakpoint)
- **GET /stream** - SSE stream endpoint (triggers breakpoint)

## Debug Features

- **Console logging** for request tracking
- **Debugger statements** at key points
- **Error handling** with logging
- **Connection cleanup** for SSE streams
- **Periodic updates** for testing

## Troubleshooting

### Debugger Not Working?

1. Make sure you're using VS Code
2. Check that the `.vscode/launch.json` file exists
3. Verify Node.js is installed and accessible
4. Try restarting VS Code

### Breakpoints Not Hit?

1. Ensure you're running in debug mode (F5)
2. Check that the file path in launch.json is correct
3. Verify the debugger statements are present in the code

### SSE Connection Issues?

1. Check the browser console for errors
2. Verify the server is running on the correct port
3. Check that the `/stream` endpoint is accessible

## Next Steps

1. **Add more breakpoints** where you need to inspect data
2. **Use the Debug Console** to evaluate expressions
3. **Inspect the call stack** to understand execution flow
4. **Add watch expressions** for variables you want to monitor
