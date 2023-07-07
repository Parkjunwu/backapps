import { ipcRenderer } from 'electron';
        import { info } from 'electron-log';

        window.onload = function() {
            console.log('display onload')
            info('display onload')
            // const room = prompt("Please enter room ID : ");
            // if(room.trim().length == 0) {
            //     document.write("<h1> Room ID is mandatory to join </h1>");
            //     return;
            // }
            info(1)
            const room = "t/2560/1440"

            info("room : ",room)
            info(2)
            
            const [_,width,height] = room.split('/');
            info(3)
            const img = document.getElementsByTagName("img")[0];
            
            // const imageWidth = $("img").width();
            // const imageHeight = $("img").height();
            const imageWidth = img.width;
            const imageHeight = img.height;

            info(4)
            info("imageWidth : ",imageWidth)
            console.log("imageWidth : ",imageWidth)
            
            let widthRatio = width / imageWidth;
            let heightRatio = height / imageHeight;

            // $(window).on('resize', function(e){

            //     // const newImageWidth = $("img").width();
            //     // const newImageHeight = $("img").height();
            //     const newImageWidth = img.width;
            //     const newImageHeight = img.height;
            //     widthRatio = width / newImageWidth;
            //     heightRatio = height / newImageHeight;
            // })
            window.addEventListener('resize', function(e){

                info("resize : ")

                // const newImageWidth = $("img").width();
                // const newImageHeight = $("img").height();
                const newImageWidth = img.width;
                const newImageHeight = img.height;
                widthRatio = width / newImageWidth;
                heightRatio = height / newImageHeight;
            })

            socket = io.connect('http://localhost');

            // socket.emit("join-message", room);
            socket.emit("admin-login", room);
            
            



            
            socket.on('screen-data', function(message){
                info("screen-data : ")
                // $("img").attr("src", "data:image/png;base64," + message);
                img.setAttribute("src", "data:image/png;base64," + message);
            })
            // ipcRenderer.on("screen-data", (event, data) => {
            //     $("img").attr("src", "data:image/png;base64," + data);
            // })






            // $("img").mousemove(function(e){

            //     const posX = $(this).offset().left;
            //     const posY = $(this).offset().top;

            //     const { pageX, pageY } = e;

            //     const x = (pageX - posX) * widthRatio;
            //     const y = (pageY - posY) * heightRatio;
            //     // console.log("x : ",x)
            //     // console.log("pageX : ",pageX)
            //     // console.log("widthRatio : ",widthRatio)
            //     // console.log("posX : ",posX)

            //     const obj = { x, y, room}
            //     socket.emit("mouse-move", JSON.stringify(obj));

            // })
            img.addEventListener('mousemove',function(e){

                const posX = this.offsetLeft;
                const posY = this.offsetTop;

                const { pageX, pageY } = e;

                const x = (pageX - posX) * widthRatio;
                const y = (pageY - posY) * heightRatio;
                // console.log("x : ",x)
                // console.log("pageX : ",pageX)
                // console.log("widthRatio : ",widthRatio)
                // console.log("posX : ",posX)

                const obj = { x, y, room}
                socket.emit("mouse-move", JSON.stringify(obj));

            })

            const clickBtn = {
                1: "left",
                2: "middle",
                3: "right"
            }

            // $("img").click(function(e){
            //     const which = clickBtn[e.which]
            //     const obj = { which, room};
            //     socket.emit("mouse-click", JSON.stringify(obj));
            // })

            img.addEventListener('click',function(e){
                const which = clickBtn[e.which]
                const obj = { which, room };
                socket.emit("mouse-click", JSON.stringify(obj));
            })

            

            img.addEventListener("dragstart",function(e){
                // console.log("dragstart")
                const obj = { room }
                socket.emit("drag-start", JSON.stringify(obj));
            })

            img.addEventListener("dragover",function(e){
                // console.log("dragover")
                e.preventDefault(); // 이게 있어야 drop 실행됨
                const posX = $(this).offset().left;
                const posY = $(this).offset().top;

                const { pageX, pageY } = e;

                const x = (pageX - posX) * widthRatio;
                const y = (pageY - posY) * heightRatio;

                const obj = { x, y, room}
                socket.emit("drag-over", JSON.stringify(obj));
            })
            img.addEventListener("drop",function(e){
                // console.log("drop");
                const obj = { room }
                socket.emit("drag-leave", JSON.stringify(obj));
            })
            
            // $("img").mouseenter(function(e){
            //     const obj = {"room" : room};
            //     socket.emit("mouse-enter", JSON.stringify(obj));
            // })

            // $("img").mouseleave(function(e){
            //     const obj = {"room" : room};
            //     socket.emit("mouse-leave", JSON.stringify(obj));
            // })


            // $(window).on("scroll", function(e) {
            //     console.log("scroll")
            //     const scrollY = $(this).scrollTop();
            //     // const scrollY = $(this).scrollLeft();
            //     const obj = { y: scrollY, room };
            //     socket.emit("scroll", JSON.stringify(obj));
            // })
            window.addEventListener('wheel', function(e){
                console.log("scroll")
                const scrollY = e.deltaY || e.detail;
                const posY = scrollY > 0 ? "down" : "up" // robotjs scroll 이 안되서
                const obj = { y: posY, room };
                // const obj = { y: scrollY, room };
                socket.emit("scroll", JSON.stringify(obj));
            },false);

            // $(window).bind("keyup", function(e) {

            //     const obj = { key: e.key, room};
            //     socket.emit("type", JSON.stringify(obj));
            //     // const key = e.code === "AltRight" ? "AltRight" : e.key;
            //     // console.log("e.code : ",e.code)
            //     // const obj = { key, room};
            //     // socket.emit("type", JSON.stringify(obj));
            // })
            window.addEventListener('keyup', function(e){
                const obj = { key: e.key, room};
                socket.emit("type", JSON.stringify(obj));
            });

            // $(window).on("beforeunload", function(e) {
            //     socket.emit("admin-logout", room);
            // })
            window.addEventListener('beforeunload', function(e){
                socket.emit("admin-logout", room);
            });
        }





// const ipcRenderer = require('electron').ipcRenderer;
// const log = require('electron-log');

// window.onload = function() {
//     log.info('onload')
//     // const room = prompt("Please enter room ID : ");
//     // if(room.trim().length == 0) {
//     //     document.write("<h1> Room ID is mandatory to join </h1>");
//     //     return;
//     // }
//     const room = "t/2560/1440"
    
//     const [_,width,height] = room.split('/');
//     const imageWidth = $("img").width();
//     const imageHeight = $("img").height();

//     log.info("imageWidth : ",imageWidth)
//     console.log("imageWidth : ",imageWidth)
    
//     let widthRatio = width / imageWidth;
//     let heightRatio = height / imageHeight;

//     $(window).on('resize', function(e){
//         log.info('resize')

//         const newImageWidth = $("img").width();
//         const newImageHeight = $("img").height();
//         widthRatio = width / newImageWidth;
//         heightRatio = height / newImageHeight;
//     })

//     socket = io.connect('http://localhost');

//     // socket.emit("join-message", room);
//     socket.emit("admin-login", room);
    
    



    
//     socket.on('screen-data', function(message){
//         $("img").attr("src", "data:image/png;base64," + message);
//     })
//     // ipcRenderer.on("screen-data", (event, data) => {
//     //     $("img").attr("src", "data:image/png;base64," + data);
//     // })






//     $("img").mousemove(function(e){

//         const posX = $(this).offset().left;
//         const posY = $(this).offset().top;

//         const { pageX, pageY } = e;

//         const x = (pageX - posX) * widthRatio;
//         const y = (pageY - posY) * heightRatio;
//         // console.log("x : ",x)
//         // console.log("pageX : ",pageX)
//         // console.log("widthRatio : ",widthRatio)
//         // console.log("posX : ",posX)

//         const obj = { x, y, room}
//         socket.emit("mouse-move", JSON.stringify(obj));

//     })

//     const clickBtn = {
//         1: "left",
//         2: "middle",
//         3: "right"
//     }

//     $("img").click(function(e){
//         const which = clickBtn[e.which]
//         const obj = { which, room};
//         socket.emit("mouse-click", JSON.stringify(obj));
//     })

//     const img = document.getElementsByTagName("img")[0];

//     img.addEventListener("dragstart",function(e){
//         // console.log("dragstart")
//         const obj = { room }
//         socket.emit("drag-start", JSON.stringify(obj));
//     })

//     img.addEventListener("dragover",function(e){
//         // console.log("dragover")
//         e.preventDefault(); // 이게 있어야 drop 실행됨
//         const posX = $(this).offset().left;
//         const posY = $(this).offset().top;

//         const { pageX, pageY } = e;

//         const x = (pageX - posX) * widthRatio;
//         const y = (pageY - posY) * heightRatio;

//         const obj = { x, y, room}
//         socket.emit("drag-over", JSON.stringify(obj));
//     })
//     img.addEventListener("drop",function(e){
//         // console.log("drop");
//         const obj = { room }
//         socket.emit("drag-leave", JSON.stringify(obj));
//     })
    
//     // $("img").mouseenter(function(e){
//     //     const obj = {"room" : room};
//     //     socket.emit("mouse-enter", JSON.stringify(obj));
//     // })

//     // $("img").mouseleave(function(e){
//     //     const obj = {"room" : room};
//     //     socket.emit("mouse-leave", JSON.stringify(obj));
//     // })


//     // $(window).on("scroll", function(e) {
//     //     console.log("scroll")
//     //     const scrollY = $(this).scrollTop();
//     //     // const scrollY = $(this).scrollLeft();
//     //     const obj = { y: scrollY, room };
//     //     socket.emit("scroll", JSON.stringify(obj));
//     // })
//     window.addEventListener('wheel', function(e){
//         console.log("scroll")
//         const scrollY = e.deltaY || e.detail;
//         const posY = scrollY > 0 ? "down" : "up" // robotjs scroll 이 안되서
//         const obj = { y: posY, room };
//         // const obj = { y: scrollY, room };
//         socket.emit("scroll", JSON.stringify(obj));
//     },false);

//     $(window).bind("keyup", function(e) {

//         const obj = { key: e.key, room};
//         socket.emit("type", JSON.stringify(obj));
//         // const key = e.code === "AltRight" ? "AltRight" : e.key;
//         // console.log("e.code : ",e.code)
//         // const obj = { key, room};
//         // socket.emit("type", JSON.stringify(obj));
//     })

//     $(window).on("beforeunload", function(e) {
//         socket.emit("admin-logout", room);
//     })
// }















// const express = require('express');
// const http = require('http');
// const socket = require('socket.io');
// const log = require('electron-log');

// window.onload = function() {
//     // const room = prompt("Please enter room ID : ");
//     // if(room.trim().length == 0) {
//     //     document.write("<h1> Room ID is mandatory to join </h1>");
//     //     return;
//     // }

    

//     const app = express();
//     const httpServer = http.createServer(app);
//     const io = socket(http);

//     app.get('/view', (req, res) => {
//         res.sendFile(__dirname + '/display.html');
//     });

//     io.on('connection', (socket)=> {

//         socket.on("join-message", (roomId) => {
//             socket.join(roomId);
//             console.log("User joined in a room : " + roomId);
//         });
        
//         socket.on("admin-login", (roomId) => {
//             socket.join(roomId);
//             socket.broadcast.to(roomId).emit("admin-login", roomId);
//         });
        
//         socket.on("admin-logout", (roomId) => {
//             socket.join(roomId);
//             socket.broadcast.to(roomId).emit("admin-logout", roomId);
//         });

//         socket.on("screen-data", function(data) {
//             data = JSON.parse(data);
//             var room = data.room;
//             var imgStr = data.image;
//             socket.broadcast.to(room).emit('screen-data', imgStr);
//         });

//         socket.on("mouse-move", function(data) {
//             var room = JSON.parse(data).room;
//             socket.broadcast.to(room).emit("mouse-move", data);
//         });

//         socket.on("mouse-click", function(data) {
//             var room = JSON.parse(data).room;
//             socket.broadcast.to(room).emit("mouse-click", data);
//         });

//         // socket.on("mouse-enter", function(data) {
//         //     var room = JSON.parse(data).room;
//         //     socket.broadcast.to(room).emit("mouse-enter", data);
//         // });

//         // socket.on("mouse-leave", function(data) {
//         //     var room = JSON.parse(data).room;
//         //     socket.broadcast.to(room).emit("mouse-leave", data);
//         // });
        
//         socket.on("drag-start", function(data) {
//             var room = JSON.parse(data).room;
//             socket.broadcast.to(room).emit("drag-start", data);
//         });

//         socket.on("drag-over", function(data) {
//             var room = JSON.parse(data).room;
//             socket.broadcast.to(room).emit("drag-over", data);
//         });

//         socket.on("drag-leave", function(data) {
//             var room = JSON.parse(data).room;
//             socket.broadcast.to(room).emit("drag-leave", data);
//         });

//         socket.on("scroll", function(data) {
//             var room = JSON.parse(data).room;
//             socket.broadcast.to(room).emit("scroll", data);
//         });

//         socket.on("type", function(data) {
//             var room = JSON.parse(data).room;
//             socket.broadcast.to(room).emit("type", data);
//         });
//     });

//     var server_port = 80;
//     httpServer.listen(server_port, () => {
//         // console.log("Started on : "+ server_port);
//         log.info("Started on : "+ server_port)
//     });

//     const room = "t/2560/1440"
    
//     const [_,width,height] = room.split('/');
//     const imageWidth = $("img").width();
//     const imageHeight = $("img").height();
    
//     let widthRatio = width / imageWidth;
//     let heightRatio = height / imageHeight;

//     $(window).on('resize', function(e){

//         const newImageWidth = $("img").width();
//         const newImageHeight = $("img").height();
//         widthRatio = width / newImageWidth;
//         heightRatio = height / newImageHeight;
//     })

//     socket = io.connect('http://localhost');

//     // socket.emit("join-message", room);
//     socket.emit("admin-login", room);
//     socket.on('screen-data', function(message){
//         $("img").attr("src", "data:image/png;base64," + message);
//     })

//     $("img").mousemove(function(e){

//         const posX = $(this).offset().left;
//         const posY = $(this).offset().top;

//         const { pageX, pageY } = e;

//         const x = (pageX - posX) * widthRatio;
//         const y = (pageY - posY) * heightRatio;
//         // console.log("x : ",x)
//         // console.log("pageX : ",pageX)
//         // console.log("widthRatio : ",widthRatio)
//         // console.log("posX : ",posX)

//         const obj = { x, y, room}
//         socket.emit("mouse-move", JSON.stringify(obj));

//     })

//     const clickBtn = {
//         1: "left",
//         2: "middle",
//         3: "right"
//     }

//     $("img").click(function(e){
//         const which = clickBtn[e.which]
//         const obj = { which, room};
//         socket.emit("mouse-click", JSON.stringify(obj));
//     })

//     const img = document.getElementsByTagName("img")[0];

//     img.addEventListener("dragstart",function(e){
//         // console.log("dragstart")
//         const obj = { room }
//         socket.emit("drag-start", JSON.stringify(obj));
//     })

//     img.addEventListener("dragover",function(e){
//         // console.log("dragover")
//         e.preventDefault(); // 이게 있어야 drop 실행됨
//         const posX = $(this).offset().left;
//         const posY = $(this).offset().top;

//         const { pageX, pageY } = e;

//         const x = (pageX - posX) * widthRatio;
//         const y = (pageY - posY) * heightRatio;

//         const obj = { x, y, room}
//         socket.emit("drag-over", JSON.stringify(obj));
//     })
//     img.addEventListener("drop",function(e){
//         // console.log("drop");
//         const obj = { room }
//         socket.emit("drag-leave", JSON.stringify(obj));
//     })
    
//     // $("img").mouseenter(function(e){
//     //     const obj = {"room" : room};
//     //     socket.emit("mouse-enter", JSON.stringify(obj));
//     // })

//     // $("img").mouseleave(function(e){
//     //     const obj = {"room" : room};
//     //     socket.emit("mouse-leave", JSON.stringify(obj));
//     // })


//     // $(window).on("scroll", function(e) {
//     //     console.log("scroll")
//     //     const scrollY = $(this).scrollTop();
//     //     // const scrollY = $(this).scrollLeft();
//     //     const obj = { y: scrollY, room };
//     //     socket.emit("scroll", JSON.stringify(obj));
//     // })
//     window.addEventListener('wheel', function(e){
//         console.log("scroll")
//         const scrollY = e.deltaY || e.detail;
//         const posY = scrollY > 0 ? "down" : "up" // robotjs scroll 이 안되서
//         const obj = { y: posY, room };
//         // const obj = { y: scrollY, room };
//         socket.emit("scroll", JSON.stringify(obj));
//     },false);

//     $(window).bind("keyup", function(e) {

//         const obj = { key: e.key, room};
//         socket.emit("type", JSON.stringify(obj));
//         // const key = e.code === "AltRight" ? "AltRight" : e.key;
//         // console.log("e.code : ",e.code)
//         // const obj = { key, room};
//         // socket.emit("type", JSON.stringify(obj));
//     })

//     $(window).on("beforeunload", function(e) {
//         socket.emit("admin-logout", room);
//     })
// }