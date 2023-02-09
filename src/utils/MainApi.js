import { mainApiSettings, validateAnswer } from "./constants.js";

class MainApi {
  // входные данные - адрес для запроса и объект заголовка
  constructor({ link, options }) {
    this.link = link;
    this.options = options;
  }

  // приватный универсальный метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, { ...options, ...this.options }).then(validateAnswer);
  }

  // публичный метод, загружающий карточки с сервера
  downloadMovieCards() {
    return this._request(`${this.link}/movies`, {
      method: "GET",
    });
  }

  // публичный метод, обновляющий данные пользователя на сервере
  setNewUserInfo(userData) {
    return this._request(`${this.link}/users/me`, {
      method: "PATCH",
      body: JSON.stringify(userData),
    });
  }

  // публичный метод, добавляющий карточку на сервер
  saveNewMovieCard(cardData) {
    return this._request(`${this.link}/movies`, {
      method: "POST",
      body: JSON.stringify(cardData),
    });
  }

  // публичный метод, удаляющий карточку с сервера
  deleteMovieCard(cardID) {
    return this._request(`${this.link}/movies/${cardID}`, {
      method: "DELETE",
    });
  }
}

// создадим экземпляр класса для работы с Api
const workingApi = new MainApi(mainApiSettings);
export default workingApi;
