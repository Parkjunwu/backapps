const {app, BrowserWindow, ipcMain} = require('electron');
const apps = require('express')();
const http = require('http').createServer(apps);
const io = require('socket.io')(http);
const os = require('os');
const ip = require('ip');

const serverRun = (win) => {
    apps.get('/view', (req, res) => {
        res.sendFile(__dirname + '/display.html');
    });

    io.on('connection', (socket)=> {

        socket.on("join-message", (roomId) => {
            socket.join(roomId);
            console.log("User joined in a room : " + roomId);
        });
        
        socket.on("admin-login", (roomId) => {
            socket.join(roomId);
            socket.broadcast.to(roomId).emit("admin-login", roomId);
        });
        
        socket.on("admin-logout", (roomId) => {
            socket.join(roomId);
            socket.broadcast.to(roomId).emit("admin-logout", roomId);
        });

        // socket.on("screen-data", function(data) {
        //     // console.log("screen-data : ")
        //     data = JSON.parse(data);
        //     const room = data.room;
        //     const imgStr = data.image;
        //     socket.broadcast.to(room).emit('screen-data', imgStr);
        // });

        socket.on('screen-data', function(data){
            const image = JSON.parse(data).image;
            // console.log("screen-data");
            win.webContents.send("screen-data",image)
        })

        socket.on("mouse-move", function(data) {
            const room = JSON.parse(data).room;
            socket.broadcast.to(room).emit("mouse-move", data);
        });

        socket.on("mouse-click", function(data) {
            const room = JSON.parse(data).room;
            socket.broadcast.to(room).emit("mouse-click", data);
        });

        // socket.on("mouse-enter", function(data) {
        //     const room = JSON.parse(data).room;
        //     socket.broadcast.to(room).emit("mouse-enter", data);
        // });

        // socket.on("mouse-leave", function(data) {
        //     const room = JSON.parse(data).room;
        //     socket.broadcast.to(room).emit("mouse-leave", data);
        // });
        
        socket.on("drag-start", function(data) {
            const room = JSON.parse(data).room;
            socket.broadcast.to(room).emit("drag-start", data);
        });

        socket.on("drag-over", function(data) {
            const room = JSON.parse(data).room;
            socket.broadcast.to(room).emit("drag-over", data);
        });

        socket.on("drag-leave", function(data) {
            const room = JSON.parse(data).room;
            socket.broadcast.to(room).emit("drag-leave", data);
        });

        socket.on("scroll", function(data) {
            const room = JSON.parse(data).room;
            socket.broadcast.to(room).emit("scroll", data);
        });

        socket.on("type", function(data) {
            const room = JSON.parse(data).room;
            socket.broadcast.to(room).emit("type", data);
        });

        socket.on("register-node", async (ip) => {
            const ips = await win.webContents.executeJavaScript(`localStorage.getItem("ips")`);
            const parsedIps = ips ? JSON.parse(ips) : [];
            const newIps = JSON.stringify([...parsedIps, ip]);
            const result = await win.webContents.executeJavaScript(`localStorage.setItem("ips",${newIps})`);
            console.log("register-node result : ",result)
        });
    });

    const server_port = 80;
    http.listen(server_port, () => {
        console.log("Started on : "+ server_port);
    });
};

const getMyIp = () => console.log("getMyIp : ",ip.address());

const getIps = () => {
    
    const interfaces = os.networkInterfaces();
    const internalAddresses = [];

    Object.keys(interfaces).forEach((interfaceName) => {
        const addresses = interfaces[interfaceName];
        addresses.forEach((address) => {
            // console.log(address);
            if (address.internal) {
                internalAddresses.push(address.address);
            }
        });
    });

    console.log("getIps : ",internalAddresses);
    return internalAddresses;
};

const getStroedIps = async (win) => {
    const ips = await win.webContents.executeJavaScript(`localStorage.getItem("ips")`);
    console.log("getStroedIps : ",ips);
    return ips;
};

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    
    win.removeMenu();
    // win.loadFile('display.html');
    win.loadFile('login.html');

    serverRun(win);
    getIps();
    getMyIp();
    getStroedIps(win);
};

app.whenReady().then(createWindow);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})