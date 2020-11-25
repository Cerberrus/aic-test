/*
  Тут лежит функция,
  которая объединяет названия классов в массивы
  в зависимости от компонента, к которому класс принадлежит
*/

const csso = require('csso');

const getComponentId = (className) => {
    const tokens = className.split('_');

    // Для всех классов, названия которых
    // отличаются от [componentId]_[classNameId],
    // возвращаем одинаковый идентификатор компонента
    if (tokens.length !== 2) {
        return 'default';
    }

    return tokens[0];
};

module.exports = (ast) => {
    const scopes = {};

    // Пробегаемся по всем селекторам классов
    csso.syntax.walk(ast, (node) => {
        if (node.type !== 'ClassSelector') {
            return;
        }

        const componentId = getComponentId(node.name);

        if (!scopes[componentId]) {
            scopes[componentId] = [];
        }

        if (!scopes[componentId].includes(node.name)) {
            scopes[componentId].push(node.name);
        }
    });

    return Object.values(scopes);
};