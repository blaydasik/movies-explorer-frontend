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
  link: "https://api.diplomabyblaydasik.nomoredomains.club",
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
// продолжительность короткометражного
const shortMovieDuration = 40;

// функция, фильтрующая карточки по короткометражности
export function filterCardsByShorts(cards, isShorts) {
  return cards.filter((item) => {
    let result = true;
    if (item.duration > shortMovieDuration && isShorts) {
      result = false;
    }
    return result;
  });
}

// точки перестроения карточек на экране
const widthScreen = {
  wide: 1217,
  medium: 690,
};

// функция, определяющая количество карточек для отображения
export function amountCardsToView(width) {
  if (width > widthScreen.wide) {
    return { cards: 12, more: 3 };
  }
  if (width > widthScreen.medium) {
    return { cards: 8, more: 2 };
  }
  return { cards: 5, more: 2 };
}

// регулярка для валидации поля имя
export const nameRegex = "[а-яА-ЯёЁa-zA-Z -]+";

// регулярка для валидации email
export const emailRegex = "[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\\.[A-Za-z]{2,4}";
