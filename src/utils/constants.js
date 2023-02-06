export function getTimeFromMins(mins) {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours} ч ${minutes} м`;
}

export const formTextRegister = {
  header: "Добро пожаловать!",
  button: "Зарегистрироваться",
  span: "Уже зарегистрированы?",
  link: "Войти",
  linkTo: "/signin",
};

export const formTextLogin = {
  header: "Рады видеть!",
  button: "Войти",
  span: "Еще не зарегистрированы?",
  link: "Регистрация",
  linkTo: "/signup",
};

// параметры для запросов к серверу beat films
export const apiSettings = {
  link: "https://api.nomoreparties.co/beatfilm-movies",
  options: {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  },
  serverURL: "https://api.nomoreparties.co/",
};

// параметры для запросов к серверу beat films
export const mainApiSettings = {
  link: "http://localhost:3001",
  options: {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  },
};

// метод проверки ответа сервера
export function validateAnswer(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

// функция, фильтрующая набор карточек по строке
export function filterCardsByString(cards, searchString) {
  if (searchString === undefined) {
    return cards;
  }
  return cards.filter((item) => {
    let result = false;
    if (item.nameRU.toLowerCase().indexOf(searchString.toLowerCase()) >= 0) {
      result = true;
    } else if (
      item.nameEN.toLowerCase().indexOf(searchString.toLowerCase()) >= 0
    ) {
      result = true;
    }
    return result;
  });
}

// функция, фильтрующая карточки по короткометражности
export function filterCardsByShorts(cards, isShorts) {
  return cards.filter((item) => {
    let result = true;
    if (item.duration > 40 && isShorts) {
      result = false;
    }
    return result;
  });
}

export const regExpName = "[а-яА-ЯёЁa-zA-Z -]+";

export const regExpEmail = "[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}";