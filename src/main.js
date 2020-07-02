// Electron content
const { app, BrowserWindow, Menu, Tray } = require("electron");

// Files Content
const path = require("path");
const iconPath = path.join(__dirname, "images/icon.png");
const commandsPath = path.join(__dirname, "../commands.json");
const fs = require("fs");

// Exec commands
const exec = require("child_process").exec;

// Electron content start
let tray = null;
let win = null;
let opened = true;

// Functions to export and execute
const fileExist = fs.existsSync(commandsPath);
if (!fileExist) {
  fs.appendFileSync("commands.json", "[]");
}

const fileData = () => {
  const data = require(commandsPath);
  console.log(data);
  return fileExist ? data : [];
};

const executeCommand = (command) => {
  console.log("Executando: ", command);
  exec(command);
};

// Electron functions
const createWindow = () => {
  win = new BrowserWindow({
    // width: 360,
    // height: 640,
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
    resizable: false,
    // frame: false,
  });

  win.loadURL("http://localhost:3000");
};

const createTray = () => {
  tray = new Tray(iconPath);

  const fileData = require(commandsPath);

  const template = fileData.map((each) => {
    return {
      label: each.name,
      click() {
        executeCommand(each.code);
      },
    };
  });

  const openAndCloseWindow = [
    {
      label: "Show add form",
      click() {
        if (!opened) {
          win.show();
        }

        opened = !opened;
      },
    },
    {
      label: "Hide add form",
      click() {
        if (opened) {
          win.hide();
        }

        opened = !opened;
      },
    },
  ];

  template.push(...openAndCloseWindow);

  const ctxMenu = Menu.buildFromTemplate(template);

  tray.setContextMenu(ctxMenu);
};

// Exports
exports.fileData = () => {
  return fileData();
};

exports.executeCommand = (command) => {
  executeCommand(command);
};

exports.createCommand = (name, code) => {
  const obj = {
    name,
    code,
  };
  const data = require(commandsPath);
  const newData = [...data, obj];
  fs.writeFile(commandsPath, JSON.stringify(newData), (error) => {
    if (error) return error;
  });
  return newData;
};

// App Execute
app.whenReady().then(createWindow);
app.whenReady().then(createTray);
