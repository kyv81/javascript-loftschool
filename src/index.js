/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
const isAllTrue = (array, fn) => {
    if (!array.length || typeof array !== 'object') {
        throw new Error('empty array');
    }

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    for (let i = 0; i < array.length; i++) {
        if (!(fn(array[i]))) {
            return false;
        }
    }

    return true;
};

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
const isSomeTrue = (array, fn) => {
    if (!array.length || typeof array !== 'object') {
        throw new Error('empty array');
    }

    for (let i = 0; i < array.length; i++) {
        if (fn(array[i])) {
            return true;
        }
    }

    return false;
};

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments (fn) {
    let emptyArr = [];
    let newArr = [];

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    let args = Array.from(arguments);
    args.splice(0, 1);
    if (!args.length) {
        return emptyArr;
    }

    for (let i = 0; i < args.length; i++) {
        try {
            fn(args[i]);
        }
        catch (e) {
            newArr.push(args[i]);
        }
    }

    return newArr;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
const calculator = (number = 0) => {
    if (isNaN(number)) {
        throw new Error('number is not a number');
    }

    const calc  = {
        sum: function() {
            let args = Array.prototype.slice.call(arguments);
            args.unshift(number);
            return args.reduce((a, b) => a + b);
        },
        dif: function() {
            let args = Array.prototype.slice.call(arguments);
            args.unshift(number);
            return args.reduce((a, b) => a - b);
        },
        div: function() {
            let args = Array.prototype.slice.call(arguments);
            args.unshift(number);
            return args.reduce((a, b) => {
                if (a === 0 || b === 0) {
                    throw new Error('division by 0');
                }
                return a /= b;
            });
        },
        mul: function() {
            let args = Array.prototype.slice.call(arguments);
            args.unshift(number);
            return args.reduce((a, b) => a * b);
        }
    };

    return calc;
};

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
