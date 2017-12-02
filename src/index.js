/* ДЗ 4 - работа с DOM */

/**
 * Функция должна создать элемент с тегом DIV, поместить в него текстовый узел и вернуть получившийся элемент
 *
 * @param {string} text - текст, который необходимо поместить в div
 * @return {Element}
 */
const createDivWithText = text => {
    let div = document.createElement('DIV');
    div.innerHTML = text;
    return div;
};

/**
 * Функция должна создать элемент с тегом A, установить значение для атрибута href и вернуть получившийся элемент
 *
 * @param {string} hrefValue - значение для атрибута href
 * @return {Element}
 */
const createAWithHref = hrefValue => {
    let link = document.createElement('A');
    link.setAttribute('href', hrefValue);
    return link;
};

/**
 * Функция должна вставлять элемент what в начало элемента where
 *
 * @param {Element} what - что вставлять
 * @param {Element} where - куда вставлять
 */
const prepend = (what, where) => {
    let elem = where.firstChild;
    where.insertBefore(what, elem);
};

/**
 * Функция должна перебрать все дочерние элементы элемента where
 * и вернуть массив, состоящий из тех дочерних элементов
 * следующим соседом которых является элемент с тегом P
 * Рекурсия - по желанию
 *
 * @param {Element} where - где искать
 * @return {Array<Element>}
 *
 * @example
 * для html '<div></div><p></p><a></a><span></span><p></p>'
 * функция должна вернуть: [div, span]
 * т.к. следующим соседом этих элементов является элемент с тегом P
 */
const findAllPSiblings = where => {
    let childrenArr = where.children;
    let newArr = [];

    for (let i = 0; i < childrenArr.length; i++) {
        if (childrenArr[i].nextElementSibling && childrenArr[i].nextElementSibling.tagName == 'P') {
            newArr.push(childrenArr[i]);
        }
    }

    return newArr;
};

/**
 * Функция должна перебрать все дочерние узлы типа "элемент" внутри where
 * и вернуть массив, состоящий из текстового содержимого перебираемых элементов
 * Но похоже, что в код закралась ошибка, которую нужно найти и исправить
 *
 * @param {Element} where - где искать
 * @return {Array<string>}
 */
const findError = where => {
    let obj = [];

    for (let i = 0; i < where.children.length; i++) {
            obj.push(where.children[i].innerText);
    }

    return obj;
};

/**
 * Функция должна перебрать все дочерние узлы элемента where
 * и удалить из него все текстовые узлы
 * Без рекурсии!
 * Будьте внимательны при удалении узлов,
 * можно получить неожиданное поведение при переборе узлов
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
 * должно быть преобразовано в <div></div><p></p>
 */
const deleteTextNodes = where => {
    let childNodesArr = where.childNodes;
    for (let i = 0; i < childNodesArr.length; i++ ) {
        if (childNodesArr[i].nodeType === 3) {
            where.removeChild(childNodesArr[i]);
        }
    }
};

/**
 * Выполнить предудыщее задание с использование рекурсии
 * то есть необходимо заходить внутрь каждого дочернего элемента
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
 * должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
const deleteTextNodesRecursive = where => {
    let childNodesArr = where.childNodes;
    for (let i = 0; i < childNodesArr.length; i++ ) {
        if (childNodesArr[i].nodeType === 3) {
            where.removeChild(childNodesArr[i]);
            i--;
        } else {
            deleteTextNodesRecursive(childNodesArr[i]);
        }
    }
};

/**
 * *** Со звездочкой ***
 * Необходимо собрать статистику по всем узлам внутри элемента root и вернуть ее в виде объекта
 * Статистика должна содержать:
 * - количество текстовых узлов
 * - количество элементов каждого класса
 * - количество элементов каждого тега
 * Для работы с классами рекомендуется использовать свойство classList
 * Постарайтесь не создавать глобальных переменных
 *
 * @param {Element} root - где собирать статистику
 * @return {{tags: Object<string, number>, classes: Object<string, number>, texts: number}}
 *
 * @example
 * для html <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
 * должен быть возвращен такой объект:
 * {
 *   tags: { DIV: 1, B: 2},
 *   classes: { "some-class-1": 2, "some-class-2": 1 },
 *   texts: 3
 * }
 */
const collectDOMStat = root => {
    let obj = { tags: {}, classes: {}, texts: 0 };
    let childrenArr = root.childNodes;

    for (let i in childrenArr) {
        if (childrenArr[i].nodeType === 3) {
            obj.texts++;
        }

        if (childrenArr[i].nodeType === 1) {
            if (childrenArr[i].tagName in obj.tags) {
                obj.tags[childrenArr[i].tagName]++;
            } else {
                obj.tags[childrenArr[i].tagName] = 1;
            }

            for (let j = 0; j < childrenArr[i].classList.length; j++) {
                if (childrenArr[i].classList[j] in obj.classes) {
                    obj.classes[childrenArr[i].classList[j]]++;
                } else {
                    obj.classes[childrenArr[i].classList[j]] = 1;
                }
            }

            let inner = collectDOMStat(childrenArr[i]);

            obj.texts += inner.texts;

            for (let x in inner.tags) {
                if (x in obj.tags) {
                    obj.tags[x] += inner.tags[x];
                } else {
                    obj.tags[x] = inner.tags[x];
                }
            }

            for (let y in inner.classes) {
                if (y in obj.classes) {
                    obj.classes[y] += inner.classes[y];
                } else {
                    obj.classes[y] = inner.classes[y];
                }
            }
        }
    }

    return obj;
};

/**
 * *** Со звездочкой ***
 * Функция должна отслеживать добавление и удаление элементов внутри элемента where
 * Как только в where добавляются или удаляются элемента,
 * необходимо сообщать об этом при помощи вызова функции fn со специальным аргументом
 * В качестве аргумента должен быть передан объек с двумя свойствами:
 * - type: типа события (insert или remove)
 * - nodes: массив из удаленных или добавленных элементов (а зависимости от события)
 * Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов
 * Рекомендуется использовать MutationObserver
 *
 * @param {Element} where - где отслеживать
 * @param {function(info: {type: string, nodes: Array<Element>})} fn - функция, которую необходимо вызвать
 *
 * @example
 * если в where или в одного из его детей добавляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'insert',
 *   nodes: [div]
 * }
 *
 * ------
 *
 * если из where или из одного из его детей удаляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'remove',
 *   nodes: [div]
 * }
 */
const observeChildNodes = (where, fn) => {
    let observer = new MutationObserver(

        function(mutations) {

            let arrayNodesInsert=[];
            let arrayNodesRemove=[];

            mutations.forEach(mutation => {
                if (mutation.addedNodes.length > 0) {
                    arrayNodesInsert.splice(arrayNodesInsert.length,
                        mutation.addedNodes.length,
                        ...mutation.addedNodes);
                } else if (mutation.removedNodes.length > 0) {
                    arrayNodesRemove.splice(arrayNodesRemove.length,
                        mutation.addedNodes.length,
                        ...mutation.removedNodes);
                }
            });
            if (arrayNodesInsert.length > 0) {
                fn({
                    type: 'insert',
                    nodes: arrayNodesInsert
                });
            }
            if (arrayNodesRemove.length > 0) {
                fn({
                    type: 'remove',
                    nodes: arrayNodesRemove
                });
            }
        });
    observer.observe(where, {
        childList: true,
        subList: true
    });
};

export {
    createDivWithText,
    createAWithHref,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};
