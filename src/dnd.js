/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
const createDiv = () => {
    const randomWidth = () => Math.round(Math.random() * window.innerWidth);

    const randomHeight = () => Math.round(Math.random() * window.innerHeight);

    const randomColor = () => {
        let rgb = [];
        for (let i = 0; i < 3; i++) {
            rgb.push(Math.round(Math.random() * 255));
        }
        return 'rgb(' + rgb.join(',') + ')';
    };

    const randomLeft = () => Math.round(Math.random() * 100);

    const randomTop = () => Math.round(Math.random() * 100);

    let div = document.createElement('div');
    div.className = 'draggable-div';
    div.setAttribute('draggable', 'true');
    div.style.cursor = 'move';
    div.innerHTML = 'some text in div';
    div.style.border = '1px solid red';
    div.style.width = randomWidth() + 'px';
    div.style.height = randomHeight() + 'px';
    div.style.backgroundColor = randomColor();
    div.style.position = 'absolute';
    div.style.left = randomLeft() + '%';
    div.style.top = randomTop() + '%';
    return div;
};

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
const addListeners = target => {
    let shiftX, shiftY, coordinates;

    const handleDragStart = e => {
        e.target.opacity = '0.4';
        e.dataTransfer.effectAllowed='move';
        e.dataTransfer.setData('text/html', e.target.id);
        coordinates = target.getBoundingClientRect();
        shiftX = e.pageX - coordinates.left;
        shiftY = e.pageY - coordinates.top;
    };

    const handleDrop = e => {
        e.target.opacity = 1;
        e.dataTransfer.getData('text/html');
        target.style.left = e.pageX - shiftX + 'px';
        target.style.top = e.pageY - shiftY + 'px';
    };

    target.addEventListener('dragstart', handleDragStart);
    target.addEventListener('dragend', handleDrop);
};

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
