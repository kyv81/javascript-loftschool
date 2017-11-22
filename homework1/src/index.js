/* ДЗ 1 - Функции */

/*
 Задание 1:

 Функция должна принимать один аргумент и возвращать его
 */
const returnFirstArgument = arg => arg;


/*
 Задание 2:

 Функция должна принимать два аргумента и возвращать сумму переданных значений
 Значение по умолчанию второго аргумента должно быть 100
 */
const defaultParameterValue = (a, b) => a + (b || 100);

/*
 Задание 3:

 Функция должна возвращать все переданные в нее аргументы в виде массива
 Количество переданных аргументов заранее неизвестно
 */
function returnArgumentsArray() {
    let newArr = [];
    for (let i = 0; i < arguments.length; i++) {
        newArr[i] = arguments[i];
    }
    return newArr;
}

/*
 Задание 4:

 Функция должна принимать другую функцию и возвращать результат вызова переданной функции
 */
const returnFnResult = fn => fn();


/*
 Задание 5:

 Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
 При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
 */
const returnCounter = number => {
    let num = Number(number) || 0;
    return function() {
        return ++num;
    }
};

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
 */
function bindFunction (fn) {
    let args = Array.from(arguments);
    args.splice(0, 1);
    return function() {
        return fn.apply(this, args);
    }
}
export {
    returnFirstArgument,
    defaultParameterValue,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
}
