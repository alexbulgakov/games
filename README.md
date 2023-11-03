# Free To Play Games 

### <a href="">Watch online</a>

### Technical Parameters

- Stack: React+Redux, TypeScript, Node.JS, Jest, <a href="https://www.freetogame.com/api-doc">Free-To-Play Games API</a>, <a href="https://ant.design/docs/react/introduce">Ant Design</a>.
- Reducers are covered by unit tests.
- The application is responsive.
- It is considered that the game list might contain thousands of titles.
- In case of a failed request, three retry attempts are made.
- When navigating from page to page, requests related to the old page are terminated.
- The backend for hosting static content and an API to encapsulate external requests is written in Node.JS.

### Brief Description

On the **main page**, games are displayed as cards. Hovering over a game card reveals detailed information about it. **Games can be filtered** by platform and genre. Sorting is done by ascending/descending release date, by popularity, alphabetically, etc. The Reset button clears all filters. The page also displays loading indicators and error notifications. Clicking on the 'Begin tour' button will start a guide on the page's functionality.

[![Animation-1.gif](https://i.postimg.cc/SRsrSLMc/Animation-1.gif)](https://postimg.cc/8J2Ww6wC)

By clicking on a card, the user is directed to the **game page** with information about the game, a carousel of screenshots, and a button to return to the main page.

[![Animation-2.gif](https://i.postimg.cc/sgppRHNt/Animation-2.gif)](https://postimg.cc/LJ8qtDRT)

