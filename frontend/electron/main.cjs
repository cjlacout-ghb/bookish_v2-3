const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const net = require('net');

let mainWindow;
let backendProcess;

function waitForPort(port, host, retries, delay) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    function tryConnect() {
      const socket = new net.Socket();
      socket.setTimeout(1000);
      socket.on('connect', () => {
        socket.destroy();
        resolve();
      });
      socket.on('error', () => {
        socket.destroy();
        attempts++;
        if (attempts >= retries) {
          reject(new Error(`No se pudo conectar al backend en ${host}:${port} tras ${retries} intentos.`));
        } else {
          setTimeout(tryConnect, delay);
        }
      });
      socket.on('timeout', () => {
        socket.destroy();
        attempts++;
        if (attempts >= retries) {
          reject(new Error('Timeout esperando al backend.'));
        } else {
          setTimeout(tryConnect, delay);
        }
      });
      socket.connect(port, host);
    }
    tryConnect();
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    title: "Bookish",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function startBackend() {
  const isDev = process.env.NODE_ENV === 'development';
  let backendPath;

  if (isDev) {
    backendPath = path.join(__dirname, '../../backend/dist/bookish-backend.exe');
  } else {
    backendPath = path.join(process.resourcesPath, 'bookish-backend.exe');
  }

  console.log("Iniciando backend en:", backendPath);

  backendProcess = spawn(backendPath, ['8000'], {
    stdio: 'ignore',
    detached: false
  });

  backendProcess.on('error', (err) => {
    console.error('Error al iniciar el backend:', err);
  });
}

app.whenReady().then(() => {
  startBackend();

  // Esperar con reintentos propios (sin wait-on)
  waitForPort(8000, '127.0.0.1', 30, 1000)
    .then(() => {
      createWindow();
    })
    .catch((err) => {
      console.error(err.message);
      createWindow(); // Intentar abrir igualmente
    });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});
