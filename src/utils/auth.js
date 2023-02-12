import { mainApiSettings } from "./constants.js";

// метод проверки ответа сервера
function validateAnswer(res) {
  return res.json().then((data) => {
    // дополнительно проверим, что кука есть в хранилище
    // ответ сервера с кодом 203 говорит об ее отсутствии
    if (res.ok && res.status !== 203) {
      return data;
    }
    return Promise.reject(new Error(data.message));
  });
}

// универсальный метод запроса с проверкой ответа
function request(url, options) {
  return fetch(url, { ...options, ...mainApiSettings.options }).then(
    validateAnswer
  );
}

// запрос для регистрации нового пользователя
export const register = (account) =>
  request(`${mainApiSettings.link}/signup`, {
    method: "POST",
    body: JSON.stringify(account),
  });

// запрос для авторизации пользователя
export const login = (account) =>
  request(`${mainApiSettings.link}/signin`, {
    method: "POST",
    body: JSON.stringify(account),
  });

// запрос для проверки куки и получения email
export const checkCookies = () =>
  request(`${mainApiSettings.link}/users/me`, {
    method: "GET",
  });

// запрос для удаления авторизационной куки
export const logout = () =>
  request(`${mainApiSettings.link}/signout`, {
    method: "POST",
  });
