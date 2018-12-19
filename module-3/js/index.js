'use strict'
const logins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];

const isLoginValid = function(login) {
  let result = login.length >= 4 && login.length <= 16 ? true : false;
  return result;
};

const isLoginUnique = function(logins, login) {
  let result;
   result = logins.includes(login) ? false : true;
  return result;
};

/*const isLoginUnique = function(logins, login) {
  let result;
  for (const log of logins) {
    result = log === login ? false : true;
  }
  console.log(result);
  return result;
};*/

const addLogin = function(logins, login) {
  const valid = isLoginValid(login);
  if (!valid) {
    console.log("Ошибка! Логин должен быть от 4 до 16 символов");
    return;
  } else {
    const unique = isLoginUnique(logins, login);
    if (!unique) {
      console.log("Такой логин уже используется!");
    } else {
      logins.push(login);
      console.log("Логин успешно добавлен!");
    }
  }
  return console.log;
};

// Вызовы функции для проверки
addLogin(logins, "Ajax"); // 'Логин успешно добавлен!'
addLogin(logins, "robotGoogles"); // 'Такой логин уже используется!'
addLogin(logins, "Zod"); // 'Ошибка! Логин должен быть от 4 до 16 символов'
addLogin(logins, "jqueryisextremelyfast"); // 'Ошибка! Логин должен быть от 4 до 16 символов'
