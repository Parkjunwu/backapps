// const { safeStorage } = require('electron/main');

//     console.log(1);

//     const storedPassword = localStorage.getItem("password");
//     const isAvaliable = safeStorage.isEncryptionAvailable();

//     console.log(storedPassword);

//     // if(!storedPassword) {
//     //   // const isAvaliable = safeStorage.isEncryptionAvailable();
//     //   const password = isAvaliable ? safeStorage.encryptString("admin") : "";
//     //   localStorage.setItem("password",password);
//     // }
//     // localStorage.setItem("password","");
//     localStorage.setItem("password","admin");
//     // 로그인 폼 제출 이벤트 핸들러
//     document.getElementById("loginForm").addEventListener("submit", function(event) {
//       event.preventDefault(); // 폼 제출 기본 동작 방지

//       const enteredPassword = document.getElementById("passwordInput").value;
//       // const storedPassword = localStorage.getItem("password");
     
//       // const decryptPassword = isAvaliable ? safeStorage.decryptString(enteredPassword) : "";

//       // if (!storedPassword || decryptPassword === storedPassword) {
//       // if (!storedPassword || enteredPassword === storedPassword) {
//       if (!storedPassword || enteredPassword === storedPassword) {
//         // 비밀번호 일치, home.html로 이동
//         window.location.href = "home.html";
//       } else {
//         alert("비밀번호가 일치하지 않습니다.");
//         console.log("비밀번호가 일치하지 않습니다.");
//       }
//     });






// import { safeStorage } from 'electron';
// import log from 'electron-log';
// import { safeStorage } from 'electron/main';
// const { safeStorage } = require("electron");
  // const { safeStorage } = require('electron/main');
  // const safeStorage = require('electron/main').safeStorage;

    console.log(1);

    const storedPassword = localStorage.getItem("password");
    // const isAvaliable = safeStorage.isEncryptionAvailable();

    console.log(storedPassword);
    

    // if(!storedPassword) {
    //   // const isAvaliable = safeStorage.isEncryptionAvailable();
    //   const password = isAvaliable ? safeStorage.encryptString("admin") : "";
    //   localStorage.setItem("password",password);
    // }
    // localStorage.setItem("password","");
    localStorage.setItem("password","admin");
    // 로그인 폼 제출 이벤트 핸들러
    document.getElementById("loginForm").addEventListener("submit", function(event) {
      event.preventDefault(); // 폼 제출 기본 동작 방지

      const enteredPassword = document.getElementById("passwordInput").value;
      // const storedPassword = localStorage.getItem("password");
     
      // const decryptPassword = isAvaliable ? safeStorage.decryptString(enteredPassword) : "";

      // if (!storedPassword || decryptPassword === storedPassword) {
      // if (!storedPassword || enteredPassword === storedPassword) {
        // alert(enteredPassword);
        // alert(storedPassword);
        // alert(isAvaliable);
        if (!storedPassword || enteredPassword === storedPassword) {
        // 비밀번호 일치, home.html로 이동
        window.location.href = "home.html";
      } else {
        alert("비밀번호가 일치하지 않습니다.");
        console.log("비밀번호가 일치하지 않습니다.");
      }
    });