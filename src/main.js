// Electron content
const { app, ipcMain, BrowserWindow, Menu, Tray } = require("electron");

// Files Content
const path = require("path");
const iconPath = path.join(__dirname, "images/icon.png");
const commandsPath = path.join(__dirname, "../commands.json");
const fs = require("fs");
const promisify = require("fs").promises;

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
  1;
  return fileExist ? data : [];
};

const executeCommand = (command) => {
  console.log("Executando: ", command);
  exec(command);
};

const getFileData = async () => {
  const dataStrign = await promisify.readFile(commandsPath, "utf8");
  const dataJson = JSON.parse(dataStrign);
  return dataJson;
};

const createCommand = async (name, code) => {
  const obj = {
    name,
    code,
  };
  const fileData = await getFileData();
  const newData = [...fileData, obj];
  fs.writeFile(commandsPath, JSON.stringify(newData), (error) => {
    if (error) return error;
  });
  createTray();
  return newData;
};

// Electron functions
const createWindow = () => {
  win = new BrowserWindow({
    width: 360,
    height: 640,
    // width: 1200,
    // height: 1600,
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

// Exports
exports.fileData = () => {
  return fileData();
};

ipcMain.on("executeComand", (_, command) => {
  executeCommand(command);
});

ipcMain.on("killWindow", () => {
  console.log("Fechando janela");
  win.close();
  opened = false;
});

ipcMain.on("createCommand", (event, { name, code }) => {
  console.log(`Creating command: ${name} \nWith code: ${code}`);
  createCommand(name, code);
});

// App Execute
app.on("window-all-closed", (e) => e.preventDefault());

app.whenReady().then(() => {
  tray = new Tray(iconPath);
  createWindow();
  createTray();
});
