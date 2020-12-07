// const md5 = require("md5");
// // 傻白甜式密码。  盐料。颜料。 ele.com
// const passWord = "12345"+"(*^(*&^(*&)";
// console.log(md5(passWord));
//
// const bol = true;
// const a = 123;

// function fn({a=1,b=2,c=3,d=4}={}) {
//     console.log(1111111,a,b,c,d);
// }
// fn();

/* const db = require("./module/db2");
db.page(); */

// 不能够直接接收，得到的是一个Promise
// async function fn() {
//     return  12;
// }
// fn().then(num=>{
//     console.log(num)
// })
/* const db = require("./module/db2");
const res = db.page("adminLog",{
    sort:{
        addTime:-1
    }
})
res.then(data=>{
    console.log(data);
}) */

/* // queryString是内置模块,将对象转为urlencoded也可将urlencode转为对象
const querystring = require("querystring");
const obj = {
	userName:"laotie",
	age:12
}
console.log(querystring.stringify(obj)); //userName=laotie&age=12

const str = "a=1&b=2";
// 将urlencode转为对象
console.log(querystring.parse(str));  //{ a: '1', b: '2' } */

const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
function changeArr(arr,len=10){
	const arr2=[];
	for(let i=0;i<arr.length;i+=len){
		arr2.push(arr.slice(i,i+len));
	}
	return arr2
}
console.log(changeArr(arr,5));
