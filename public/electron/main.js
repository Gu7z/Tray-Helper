// ------------ Electron content ------------
const { app, ipcMain, BrowserWindow, Menu, Tray } = require("electron");

// ------------ File Content ------------
const path = require("path");
const iconPath = path.join(__dirname, "icon.png");
const Store = require("electron-store");
const store = new Store();

// ------------ Exec commands ------------
const { exec } = require("child_process");

// ------------ Electron content start ------------
let tray = null;
let win = null;
let opened = false;

// ------------ Functions to export and execute ------------

// Verify if store exists

const storeExists = () => {
  const exist = store.get("commands");
  if (!exist) {
    store.set("commands", []);
  }
};

// Run the commands from json
const executeCommand = (command) => {
  console.log("Executando: ", command);
  exec(command);
};

// Return commadns from commands.json
const getCommandsData = () => {
  console.log("Getting data");
  const commands = store.get("commands");
  console.log(commands);

  return commands;
};

// Delete commands
const deleteCommand = (commandName) => {
  console.log("Deleting command");

  const commandsData = getCommandsData();
  const newCommandsData = commandsData.filter(
    (data) => data.name !== commandName
  );

  store.set("commands", newCommandsData);
  console.log(newCommandsData);

  createTray();
  return newCommandsData;
};

// Put commands at commands.json
const createCommand = (name, code) => {
  const obj = {
    name,
    code,
  };
  let exist = false;
  const commandsData = getCommandsData();
  let newCommandsData = commandsData.map((data) => {
    if (data.name === name) {
      exist = true;
      return {
        name,
        code,
      };
    }
    return data;
  });

  if (!exist) {
    newCommandsData = [...commandsData, obj];
  }

  store.set("commands", newCommandsData);

  createTray();
  return newCommandsData;
};

// ------------ Electron functions ------------

const createWindow = () => {
  win = new BrowserWindow({
    width: 360,
    height: 640,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
    },
    resizable: false,
    // frame: false,
  });

  const buildPath = path.join(__dirname, "../../build/index.html");
  const buildFiles = `file://${buildPath}`;
  win.loadURL(buildFiles);
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
      label: "Show add form",
      click() {
        if (!opened) {
          createWindow();
          opened = true;
        }
      },
    },
  ];

  template.push(...openAndCloseWindow);

  const ctxMenu = Menu.buildFromTemplate(template);

  tray.setContextMenu(ctxMenu);
};

// ------------ Exports ------------

// Send data when called
ipcMain.on("getCommandsData", (event, _data) => {
  console.log("Entrando aqui");
  event.returnValue = getCommandsData();
});

// To execute command
ipcMain.on("executeComand", (_, command) => {
  executeCommand(command);
});

// To close / kill window
ipcMain.on("killWindow", () => {
  console.log("Fechando janela");
  win.close();
  opened = false;
});

// To create commands
ipcMain.on("createCommand", (_event, { name, code }) => {
  console.log(`Creating command: ${name} \nWith code: ${code}`);
  createCommand(name, code);
});

// To delete commands
ipcMain.on("deleteCommand", (event, commandName) => {
  console.log(`Deleting command: ${commandName}`);
  const newCommands = deleteCommand(commandName);
  event.returnValue = newCommands;
});

// App Execute
app.on("window-all-closed", (e) => e.preventDefault());

// run first
app.whenReady().then(() => {
  tray = new Tray(iconPath);
  // First check if file existfileExists();
  storeExists();

  createWindow();
  createTray();
});
