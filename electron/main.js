// ------------ Electron content ------------
const { app, ipcMain, BrowserWindow, Menu, Tray } = require('electron');

// ------------ File Content ------------
const path = require('path');
const iconPath = path.join(__dirname, './icon.png');
const Store = require('electron-store');
const store = new Store();

// ------------ Exec commands ------------
const { exec } = require('child_process');

// ------------ UUID ----------------
const { v4: generateUUID } = require('uuid');

// ------------ Electron content start ------------
let tray = null;
let win = null;
let opened = false;

// ------------ Functions to export and execute ------------

// Verify if store exists

const storeExists = () => {
  const exist = store.get('commands');
  if (!exist) {
    store.set('commands', []);
  }
};

// Run the commands from json
const executeCommand = (command) => {
  exec(command);
};

// Return commadns from commands.json
const getCommandsData = () => {
  const commands = store.get('commands');

  return commands;
};

// Delete commands
const deleteCommand = (commandName) => {
  const commandsData = getCommandsData();
  const newCommandsData = commandsData.filter((data) => data.name !== commandName);

  store.set('commands', newCommandsData);

  createTray();
  return newCommandsData;
};

// Put and edit commands in store
const createCommand = (name, code, uuid) => {
  console.log(name, code, uuid);
  const newUUID = generateUUID();
  const obj = {
    name,
    code,
    uuid: newUUID,
  };
  const commandsData = getCommandsData();
  const commandsExists = commandsData.find((command) => command.uuid == uuid);
  let newCommandsData = [];

  if (commandsExists) {
    newCommandsData = commandsData.map((commands) => {
      if (commands.uuid === uuid) {
        return {
          name,
          code,
          uuid,
        };
      }
      return commands;
    });
  } else {
    console.log('Command does not exist');
    newCommandsData = [...commandsData, obj];
  }

  store.set('commands', newCommandsData);

  createTray();
  return newCommandsData;
};

// ------------ Electron functions ------------

const createWindow = () => {
  win = new BrowserWindow({
    width: 360,
    height: 644,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js',
    },
    resizable: false,
    frame: false,
    icon: iconPath,
  });

  const buildPath = path.join(__dirname, '../build/index.html');

  win.loadFile(buildPath);
};

const createTray = () => {
  const commandsData = getCommandsData();

  const template = commandsData.map((each) => {
    return {
      label: each.name,
      click() {
        executeCommand(each.code);
      },
    };
  });

  // Open and close window form to add new commands
  const openAndCloseWindow = [
    {
      type: 'separator',
    },
    {
      label: 'Show form',
      click() {
        if (!opened) {
          createWindow();
          opened = true;
        }
      },
    },
    {
      label: 'Quit',
      role: 'quit',
    },
  ];

  template.push(...openAndCloseWindow);

  const ctxMenu = Menu.buildFromTemplate(template);

  tray.setContextMenu(ctxMenu);
};

// ------------ Exports ------------

// Send data when called
ipcMain.on('getCommandsData', (event) => {
  event.returnValue = getCommandsData();
});

// To execute command
ipcMain.on('executeComand', (_, command) => {
  executeCommand(command);
});

// To close / kill window
ipcMain.on('killWindow', () => {
  win.close();
  opened = false;
});

// To create commands
ipcMain.on('createCommand', (_event, { name, code, uuid }) => {
  createCommand(name, code, uuid);
});

// To delete commands
ipcMain.on('deleteCommand', (event, commandName) => {
  const newCommands = deleteCommand(commandName);
  event.returnValue = newCommands;
});

// App Execute
app.on('window-all-closed', (e) => {
  e.preventDefault();
  opened = false;
});

// run first
app.whenReady().then(() => {
  tray = new Tray(iconPath);

  storeExists();
  createTray();
});
