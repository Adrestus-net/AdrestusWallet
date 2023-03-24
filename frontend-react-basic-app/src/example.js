//import {mybundle} from "../bundle.js";

console.log(mybundle.myfunc(3,8))
function greeting() {
    let message = 'Hi';

    function sayHi() {
        message+="val"
        console.log(message);
    }

    return sayHi;
}
let hi = greeting();
hi();
hi();
greeting();
var person=thermostat()
var p=new person("my name")
console.log(p.name)
const arrq=["jan","feb"];
const arr2=arrq;
const arr3=[...arrq];
arrq[0]="diff";
let a=3;
const b=true;
var myGlobal=10
fun2()
const arr = ['bobby', 'hadz', 'com'];

const array=[[1,2],[3,4],[5,6,7,8]]

for(var i=0;i<array.length;i++) {
    for(var j=0;j<array[i].length;j++)
        console.log("here"+array[i][j]);
}
let v=5;
function  fun1(){
    let var_a=4;
}

function fun2(){
    console.log(myGlobal)
}

function thermostat(){
    class Person{
        constructor(name) {
            this.name=name
        }
    }

    return Person;
}

