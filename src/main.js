// ------------ Electron content ------------
const { app, ipcMain, BrowserWindow, Menu, Tray } = require("electron");

// ------------ File Content ------------
const path = require("path");
const iconPath = path.join(__dirname, "images/icon.png");
const commandsPath = path.join(__dirname, "../commands.json");
const fs = require("fs");
const fsPromisse = require("fs").promises;

// ------------ Exec commands ------------
const exec = require("child_process").exec;

// ------------ Electron content start ------------
let tray = null;
let win = null;
let opened = true;

// ------------ Functions to export and execute ------------

// Check if commands.json exists
const fileExists = () => {
  const fileExist = fs.existsSync(commandsPath);
  if (!fileExist) {
    fs.appendFileSync("commands.json", "[]");
  }
};

// Run the commands from json
const executeCommand = (command) => {
  console.log("Executando: ", command);
  exec(command);
};

// Return commadns from commands.json
const getFileData = async () => {
  const dataStrign = await fsPromisse.readFile(commandsPath, "utf8");
  const dataJson = JSON.parse(dataStrign);

  // EveryTime that getFileData is called, we send message to our webApplication

  return dataJson;
};

// Delete commands
const deleteCommand = async (commandName) => {
  console.log("Deleting commands");
  const fileData = await getFileData();
  const newFileData = fileData.filter((data) => data.name !== commandName);

  fs.writeFile(commandsPath, JSON.stringify(newFileData), (error) => {
    if (error) return error;
  });
  createTray();
  return newFileData;
};

// Put commands at commands.json
const createCommand = async (name, code) => {
  const obj = {
    name,
    code,
  };
  let exist = false;
  let fileData = await getFileData();
  let newData = fileData.map((data) => {
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
    newData = [...fileData, obj];
  }

  fs.writeFile(commandsPath, JSON.stringify(newData), (error) => {
    if (error) return error;
  });
  createTray();
  return newData;
};

// ------------ Electron functions ------------

const createWindow = () => {
  // Every time that the user open the window to create or see commands, check if commands.json still existing
  fileExists();

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

  win.loadURL("http://localhost:3000");
};

const createTray = async () => {
  const fileData = await getFileData();

  const template = fileData.map((each) => {
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
ipcMain.on("getFileData", async (event, _data) => {
  console.log("Entrando aqui");
  event.returnValue = await getFileData();
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
ipcMain.on("deleteCommand", async (event, commandName) => {
  console.log(`Deleting command: ${commandName}`);
  const newCommands = await deleteCommand(commandName);
  event.returnValue = newCommands;
});

// App Execute
app.on("window-all-closed", (e) => e.preventDefault());

// run first
app.whenReady().then(() => {
  tray = new Tray(iconPath);
  // First check if file exist
  fileExists();

  createWindow();
  createTray();
});
