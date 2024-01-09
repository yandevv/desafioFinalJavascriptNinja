export default function DOM(elements) {
    this.element = document.querySelectorAll(elements);
}

DOM.prototype.on = function on(eventType, callback) {
    return this.forEach((node) => node.addEventListener(eventType, callback))
};
DOM.prototype.off = function off(eventType, callback) {
    return this.forEach((e) => e.removeEventListener(eventType, callback));
}
DOM.prototype.get = function get() {
    return this.element;
};

DOM.prototype.forEach = function forEach() {
    return Array.prototype.forEach.apply(this.element, arguments);
}
DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.element, arguments);
}
DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.element, arguments);
}
DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.element, arguments);
}
DOM.prototype.reduceRight = function reduceRight() {
    return Array, prototype.reduceRight.apply(this.element, arguments);
}
DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.element, arguments);
}
DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.element, arguments);
}

DOM.is = (arg) => Object.prototype.toString.call(arg);
DOM.isArray = (arg) => DOM.is(arg) === '[object Array]';
DOM.isFunction = (arg) => DOM.is(arg) === '[object Function]';
DOM.isNull = (arg) => DOM.is(arg) === '[object Null]' || this.is(arg) === '[object Undefined]';
DOM.isNumber = (arg) => typeof arg === 'number';
DOM.isString = (arg) => typeof arg === 'string';
DOM.isBoolean = (arg) => typeof arg === 'boolean';