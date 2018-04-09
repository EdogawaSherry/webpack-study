/* main.js */
import '../style/index.css';
import '../style/less.less';
import '../style/scss.scss';
import '../style/sass.sass';

import { sayName } from './module/name';

sayName();

console.log('webpack第二步');

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
