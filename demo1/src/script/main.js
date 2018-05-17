/* main.js */
import '../style/index.css';

import htmlBg1 from '../assets/img/html-1.jpg';

console.log(htmlBg1);

console.log('webpack第一步');

const sayHello = () => {
    console.log('hello');
};
sayHello();

const base = {
    hello() {
        console.log('hello');
    }
};
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [...arr1, 6, 7, 8];
