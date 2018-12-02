'use strict'
const adminLogin = 'admin';
const adminPassword = 'm4ng0h4ckz';
const cancelled = 'Отменено пользователем!'

const loginRequest = prompt ("Your login");

if (loginRequest === adminLogin) {
  const passwordRequest = prompt ('Your password')
  if (passwordRequest === adminPassword){
     alert ('Добро пожаловать!')
  }
  else if  (passwordRequest === null) {
    alert (cancelled)
  }
    else {
     alert ("Доступ запрещен, неверный пароль!")
    }
}
else if (loginRequest === null) {
  alert (cancelled)
}
else {
 alert ("Доступ запрещен, неверный логин!")
  }

