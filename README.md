# Free To Play Games 

### <a href="https://ftp-games-e11547fb4d03.herokuapp.com/" target="_blank">Посмотреть онлайн</a>

### Локальный просмотр и запуск
Введите следующие команды в консоли:
```
git clone https://github.com/alexbulgakov
```
```
npm install
```
**(ATTENTION!)** Для локального запуска потребуется ключ к API, предоставляемый RapidAPI. Перейдите на <a href="https://rapidapi.com/digiwalls/api/free-to-play-games-database" target="_blank">страницу сервиса</a> и зарегестрируйтесь. В разделе Code Snippets будет доступен X-RapidAPI-Key. Откройте корневую папку проекта, затем папку backend. В файле backend.js вставьте ваш ключ в строке с пометкой "ВСТАВЬТЕ ВАШ КЛЮЧ RAPID API".

Далее возможно два варианта:
- Вариант 1. Запуск сервера с хостингом статики и API для инкапсуляции внешних запросов. Доступен весь функционал приложения. 
```
npm run build
```
```
npm run start
```
Сервер запустится на порту 3001. <a href="http://localhost:3001/" target="_blank">Нажмите для просмотра в браузере.</a>

- Вариант 2. Запуск бэкенда и фронтенда на разных портах. В таком случае сервер будет обеспечивать только функционал API - запросов.

Запуск бэкенда:
```
npm run start
```
Запуск фронтенда (в отдельном окне консоли):
```
npm run start-react
```
<a href="http://localhost:3000/" target="_blank">Нажмите для просмотра в браузере.</a>

### Технические параметры

- Стек: React+Redux, TypeScript, Node.JS, Jest, <a href="https://www.freetogame.com/api-doc" target="_blank">Free-To-Play Games API</a>, <a href="https://ant.design/docs/react/introduce" target="_blank">Ant Design</a>. 
- Редьюсеры покрыты unit-тестами.
- Приложение адаптивно. 
- Учитывается, что список игр может содержать тысячи тайтлов.
- При неудачном запросе происходит три попытки повторного запроса.
- При переходе со страницы на страницу, запросы, относящиеся к старой странице, прерываются.
- Бэкенд для хостинга статики и API для инкапсуляции внешних запросов написан на Node.JS.

### Краткое описание

На **главной странице** отображаются игры в виде карточек. При наведении курсора на карточку игры отображается подробная информация о ней.  Игры можно **фильтровать**: по платформе и жанру. **Сортировка** осуществляется по возрастанию/убыванию даты релиза, по  популярности, по алфавиту и т.д. Кнопка Reset - сброс фильтров. На странице также отображаются индикаторы загрузки и оповещения об ошибках. По нажатию на кнопку Begin tour начнется гайд по фунционалу странички.

![gif-1](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWExenUwcG00djVzaWo2bTl0dzMyZGlmbmx1cnloNTZ0czFpamxlYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yjINznh9WPT6y2dEar/giphy.gif)

По клику на карточку произойдет переход на **страницу игры** с информацией об игре, каруселью скриншотов и кнопка возврата на главную страницу. 

![gif-1](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHo2NGxiM3NucGQyenV2MmZpMW8zMWZ0cTZtaXg2enBkeWxzOTd6bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nOdEURNyhNJDXCptFk/giphy.gif)

