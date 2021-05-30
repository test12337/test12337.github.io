'use strict';
const changeColor = () => {
    let hex = '0123456789abcdef';
    str = '#';
    for (let i = 0; i < 6; i++) {
        str+= hex[Math.trunc((Math.random() * hex.length))];
    }
    document.body.style.backgroundColor = str;
}

let total,
path;
window.addEventListener('scroll', () => {
    total = document.body.scrollHeight - window.innerHeight;
    console.log(total, window.pageYOffset, total % window.pageYOffset)
    if (total % window.pageYOffset >= 0 && total % window.pageYOffset <= 100) {
        changeColor();
    }
})

const disemvowel = (str) => str.replace(/[aeoiu]/gim, '');
const makeSentence = (arr) => {
    const str = arr.join(' ');
    return str.replace(/\s,/gim, ',').replace(/\s\./gim, '') + '.';
}
const solution = (roman) => {
    let num = 0;
    const convert = (str) => {
        switch (str) {
            case 'I':
                return 1;
                break;
            case 'V':
                return 5;
                break;
            case 'X':
                return 10;
                break;
            case 'L':
                return 50;
                break;
            case 'C':
                return 100;
                break;
            case 'D':
                return 500;
                break;
            case 'M':
                return 1000;
                break;
            default:
                break;
        }
    }
    
    for (let i = 0; i < roman.length; i++) {
        if (convert(roman[i]) >= convert(roman[i + 1]) || convert(roman[i + 1]) === undefined) {
            num += convert(roman[i]);
        }
        if (convert(roman[i]) < convert(roman[i + 1])) {
            num -= convert(roman[i]);
        }
    }
    return num;
};
console.log(solution('IV'));

function firstNonRepeatingLetter(s) {
    for (let i = 0; i < s.length; i++) {
        const reg = new RegExp(s[i], 'gim');
        if (s.match(reg).length === 1) {
            return s[i];
        }
    }
    return '';
}
function orderWeight(strng) {
    const arr = strng.split(' ');
    const struct = new Array(arr.length)
    for (let index = 0; index < arr.length; index++) {
        struct[index] = new Object;
        struct[index].old = arr[index];
        struct[index].new = struct[index].old.split('').map(e => Number(e)).reduce((sum, value) => sum + value);
    }
    struct.sort((a, b) => a.new - b.new);
    for (let i = 0; i < struct.length; i++) {
        for (let j = i; j < struct.length; j++) {
            if (struct[i].new === struct[j].new && struct[i].old > struct[j].old) {
                [struct[i].old, struct[j].old] = [struct[j].old, struct[i].old];
            }
        }
    }
    return struct.map((e) => e.old).join(" ");
}
console.log(orderWeight('2000 10003 1234000 44444444 9999 11 11 22 123'));
console.log('1003'.localeCompare('22'));
function filter_list(l) {
    return l.filter(e => typeof(e) !== 'string' && e >= 0);
}

console.log(filter_list([0,'0', 2, 3,'test', '1', 2, -10]));

// function sortArray(struct) {
//     for (let i = 0; i < struct.length; i++) {
//         for (let j = i; j < struct.length; j++) {
//             if (struct[i] % 2 !== 0 && struct[j] % 2 !== 0 && struct[i] > struct[j]) {
//                 [struct[i], struct[j]] = [struct[j], struct[i]];
//             }
//         }
//     }
//     return struct;
// }

function sortArray(array) {
    const odd = array.filter(e => e % 2 !== 0).sort((a,b) => a - b);
    return array.map(e => e % 2 === 0 ? e : odd.shift())
}
console.log(sortArray([5, 8, 6, 3, 4]));

function findUniq(arr) {
    let set = [...new Set(arr)];
    for (let i = 0; i < arr.length; i++) {
        if (set.length === 1) {
            return Number(set);
        }
        for (let j = i +1; j < arr.length; j++) {
            if (arr[i] === arr[j] && set.includes(arr[i])) {
                set = set.filter(e => e !== arr[i]);
            } 
        }       
    }
    return Number(set);
}

console.log(findUniq([0, 1, 0 ]))

function pigIt(str){
    return str.replace(/(\w)(\w+)/gim, '$2$1ay').replace(/(\w{1})/gim, '');
}

console.log(pigIt('t'));
const buttons = document.querySelectorAll('.buttons');
const result = document.querySelector('.result');
const clear = document.querySelector('.clear');
const reduce = document.querySelector('.reduce');
let out = document.querySelector('.out');
let value = '';
clear.addEventListener(('click'), () => {
    value = '';
    out.innerHTML = '0';
});
reduce.addEventListener('click', () =>{
    if (out.innerHTML !== '0') {
        value = value.substring(0, value.length - 1)
        out.innerHTML = value;
    }
    if (out.innerHTML === '') {
        out.innerHTML = '0';
    }
});
result.addEventListener('click', () => {
    if (value != '') {
        value = String(eval(value));
        out.innerHTML = value;
    }
});
buttons.forEach(el => el.addEventListener('click', (e) => {
    value += e.target.innerHTML;
    console.log(value)
    out.innerHTML=value;
}));