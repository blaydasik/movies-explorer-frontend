# Дипломный проект - фронтэнд сервиса поиска фильмов по запросу

# movies-explorer-frontend

**Ссылка на проект**

[Movies-explorer](https://diplomabyblaydasik.nomoredomains.club)

## Обзор

Проект представляет собой одностраничный сайт сервиса поиска фильмов по запросу с возможностью сохранения их в личном кабинете.

## Функциональные возможности:

1. Загрузка информации о пользователе с сервера;
2. Редактирование информации о пользователе;
3. Получение списка сохраненных пользователем фильмов;
4. Сохранение фильма в базу;
5. Удаление сохраненного фильма из базы с контролем его принадлжености;
6. Регистрация новых пользователей на сервере;
7. Идентификация и авторизация пользователей с контролем доступа;
8. Исключение повторной авторизации уже авторизованных пользователей;
9. Возможность logout авторизованных пользоватлей.

## Проект создан для закрепления навыков использования React и серверной разработки при создании одностраничного сайта.

IP 84.201.154.67  
Backend https://diplomabyblaydasik.nomoredomains.club

**Ссылка на макет**

[Макет](https://disk.yandex.ru/d/Qy0fsY4VJyR84w)

## Переменные состояния, изменение которых, позволит проверить верстку в разных состояниях:

1. loggedIn - залогинить/разлогинить пользователя
2. isLoading - отобразить/скрыть прелоадер
3. isFound - результат поиска фильмов на роутах /movies и /saved-movies
4. isFailed - произошла или нет ошибка при поиске
5. isInfoTooltipPopupOpen - отобразить/скрыть попап для отображения ошибок
6. isSuccess - меняет содержимое попапа в зависимости от результата работы api

IP 84.201.154.67  
Backend https://diplomabyblaydasik.nomoredomains.club  