/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
const forEach = (array, fn) => {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
};

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
const map = (array, fn) => {
    let newArr = [];
    for (let i = 0; i < array.length; i++) {
        newArr.push(fn(array[i], i, array));
    }
    return newArr;
};

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
const reduce = (array, fn, initial) => {
    let result = initial || array[0];
    for (let i = initial ? 0 : 1; i < array.length; i++ ) {
        result = fn(result, array[i], i, array);
    }
    return result;
};

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
const deleteProperty = (obj, prop) => delete obj[prop];


/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
const hasProperty= (obj, prop) => obj.hasOwnProperty(prop);


/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
const getEnumProps = obj => Object.keys(obj);

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
const upperProps = obj => {
    let newArr = [];
    for (let key in obj) {
        newArr.push(key.toUpperCase());
    }
    return newArr;
};

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
const slice = (array, from, to) => {
    let slicedArr = [],
        len = array.length;

    if ( !(from || from >= 0) || from < 0) {
        from = 0;
    }
    if ( !(to || to >= 0) ) {
        to = len;
    }
    if (to < 0) {
        to = len + to;
    }

    for (let i = from; i < to && i < len; i++) {
        slicedArr.push(array[i]);
    }

    return slicedArr;
};

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
const createProxy = obj => {
    return new Proxy(obj, {
        set(target, prop, value) {
            return target[prop] = Math.pow(value, 2);
        }
    });
};

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
