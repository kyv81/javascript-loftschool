/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

import { createCookie, deleteCookie } from './index';

const getCookies = () => {
    let cookies = {};
    if (!!document.cookie) {
        document.cookie.split(';').map(e => {
            let [name, value] = e.split('=');
            cookies[name.trim()] = value;
        });
        return cookies;
    }
};

const updateCookies = filter => {
    let cookies = getCookies();
    filter = filterNameInput.value;
    listTable.innerHTML = '';
    for (let cookie in cookies) {
        if (!filter || ~cookie.indexOf(filter) || ~cookies[cookie].indexOf(filter)) {
            let row = listTable.insertRow(-1);
            let btnDeleteCookie = document.createElement('button');
            btnDeleteCookie.textContent = 'Удалить';
            btnDeleteCookie.addEventListener('click', () => {
                deleteCookie(cookie);
                updateCookies();
            });
            row.insertCell(0).textContent = cookie;
            row.insertCell(1).textContent = cookies[cookie];
            row.insertCell(2).appendChild(btnDeleteCookie);
        }
    }
};

filterNameInput.addEventListener('keyup', () => {
    updateCookies();
});

addButton.addEventListener('click', () => {
    createCookie(addNameInput.value, addValueInput.value);
    updateCookies();
});