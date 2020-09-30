### ES6常用语法

[TOC]

#### let

它的作用类似于var，用来声明变量，但是所声明的变量，只在`let`命令所在的代码块内有效。

```javascript
if(true){
    var a = 1;
    let b = 2;
}
console.log(a);
console.log(b);  // 报错：ReferenceError: b is not defined
```

> 多数情况下推荐使用 `let` 代替 `var`
>
> 拓展教程：https://www.jianshu.com/p/21bd4fd9a7b6

#### const

`const` 声明的是常量，一旦声明，值将是不可变的。

`const` 指令指向变量所在的地址，所以对该变量进行属性设置是可行的（未改变变量地址）。


```javascript
// 数值
const str = 'str1';
console.log(str); // 'str1'
str = 'str2';
console.log(str); // 报错

// 对象
const obj = {id: 'id', name: 'name1'};
console.log(obj); // {id: "id", name: "name1"}
obj.name = 'name2';
console.log(obj); // {id: "id", name: "name2"}
```

#### 模板字符串

表示为反引号 ` ,模板字符串支持在字符串中插入变量。

```javascript
let a = '星期一';
let b = '晴';
let c = `今天是${a}, 天气${b}`;
console.log(c);

// 进行计算
let num1 = 1;
let num2 = 2;
let sum = `${num1} + ${num2} = ${num1 + num2}`; // "1 + 2 = 3"
console.log(sum);

// 运用函数
let value1 = 10;
let value2 = 20;
biggerNum = `${value1} 和 ${value2} 中 较大的是 ${Math.max(value1, value2)}`;
// 运用三元表达式
biggerNum = `${value1} 和 ${value2} 中 较大的是 ${value1 >= value2 ? value1 : value2}`;
console.log(biggerNum);

// 课程中的例子
let weekWeather = []
for (let i = 0;i < 7; i++ ) {
    let date = new Date()
    weekWeather.push({
        day: dayMap[date.getDay()],
        date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
        temp: `${result[i].minTemp}° - ${result[i].maxTemp}°`,
        iconPath: `/images/${result[i].weather}-icon.png`
    });
}
```

#### 解构赋值

解构赋值主要分为`对象的解构`和`数组的解构`

~~~javascript
let person = {name:"swr",age:28, opt1: 1, opt2: 2}
// ES5
let name = person.name
let age = person.age
let opt1 = person.opt1
let opt2= person.opt2

// ES6
let {name,age} = person

console.log(name) // 'swr'
console.log(age) // 28


// 课程中
// ES5
let user = ctx.state.$wxInfo.userinfo.openId;
let username = ctx.state.$wxInfo.userinfo.nickName;
let avatar = ctx.state.$wxInfo.userinfo.avatarUrl;
// ES6
let {user, username, avatar} = ctx.state.$wxInfo.userinfo;
~~~

#### 箭头函数

**箭头函数**是使用`()=>{}`语法的函数简写形式。

ES6 允许使用“箭头”（=>）定义函数。

```javascript
var f = v => v;

// 等同于
var f = function (v) {
  return v;
};
```

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

```javascript
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。

```javascript
var sum = (num1, num2) => {
    let c = num1 - num2;
    return c;
}
```

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。

```javascript
// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
```

下面是一种特殊情况，虽然可以运行，但会得到错误的结果。

```javascript
let foo = () => { a: 1 };
foo() // undefined
```

上面代码中，原始意图是返回一个对象{ a: 1 }，但是由于引擎认为大括号是代码块，所以执行了一行语句a: 1。这时，a可以被解释为语句的标签，因此实际执行的语句是1;，然后函数就结束了，没有返回值。

如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。

```javascript
let fn = () => void doesNotReturn();
```

>  出处：https://www.jianshu.com/p/cef0e8daf45e
>
>  普通function，this绑定使用时所在的对象
>
>  箭头函数，this绑定定义时所在的对象。

#### Array.map(), Array.filter(), Array.sort()

`map`: 对数组中的每个元素进行处理，得到新的数组；

`filter`: 对数组中的每个元素使用指定的函数测试，并创建一个包含所有通过测试的元素的新数组。

`sort`: 对数组中的每个元素使用指定的排序函数（返回正的表示后一个数字在前）， 并返回派完序的新数组。

~~~javascript
const weathers =
[{"weather":"snow","temp":-2,"id":0},{"weather":"lightrain","temp":9,"id":1},{"weather":"overcast","temp":7,"id":2},{"weather":"overcast","temp":9,"id":3},{"weather":"lightrain","temp":0,"id":4},{"weather":"overcast","temp":6,"id":5},{"weather":"snow","temp":-5,"id":6},{"weather":"sunny","temp":17,"id":7}];
console.log(weathers);

// 每天的温度
let temps = weathers.map((weather) => {
    return weather.temp;
});
console.log(temps);

// 温度是正的对象
let filteredWeathers = weathers.filter((weather) => {
    return weather.temp >= 0;
});
console.log(filteredWeathers);

// 温度从高到底排序对象
let sortedWeathers = weathers.sort((w1, w2) => {
    return w1 - w2;
});
console.log(sortedWeathers);

// 温度从高到底排序的正的温度数组
let sortedFilteredTemps = weathers.sort((w1, w2) => {
    return w1 - w2;
}).filter((weather) => {
    return weather.temp >= 0;
}).map((weather) => {
    return weather.temp;
});
console.log(sortedFilteredTemps);
~~~

#### Object.keys(),  Object.values(), Object.entries()/

用于遍历对象。它们都返回一个遍历器，可以用for...of循环进行遍历，唯一的区别是keys()是对*键名*的遍历、values()是对*键值*的遍历，entries()是对*键值对*的遍历。

**Object.keys()**

ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键名。

```javascript
var obj = { foo: "bar", baz: 42 };
Object.keys(obj)
for (let k of Object.keys(obj)) {
    console.log(k);
}
// ["foo", "baz"]
```

**Object.values()**

Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值。

```javascript
var obj = { foo: "bar", baz: 42 };
Object.values(obj)
for (let v of Object.values(obj)) {
    console.log(k);
}
// ["bar", 42]
```

**Object.entries()**

Object.entries方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值对数组。

```javascript
var obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
for (let [k,v] of Object.values(obj)) {
    console.log(k);
}
// [ ["foo", "bar"], ["baz", 42] ]
```

#### 属性的简洁表示法

ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```javascript
function f( x, y ) {
  return { x, y };
}
// 等同于
function f( x, y ) {
  return { x: x, y: y };
}

// 课程中
login({ success, fail, complete }) {
}
// 等于
login({ 'success': success, 'fail': fail, 'complete': complete }) {
}
```

#### 扩展运算符

**扩展运算符（spread）**是三个点（`...`）。其作用是将一个`数组/对象`转为用逗号分隔的`参数序列`。

**合并数组**

```javascript

//ES5
[1,2].concat(more);
//ES6
[1,2,...more]

var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

//ES5的合并数组
arr1.concat(arr2,arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

//ES6的合并数组
[...arr1,...arr2,...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```
**合并对象**

```javascript
a = {'id': 1, 'name': 'name1'}
b = {'age': 20}
let ab = {...a,...b};
console.log(ab);
// {id: 1, name: "name1", age: 20}
```

#### == 和 ===

`==`是数值相等，而`===`要求数值和类型都相等

```javascript
let a = '1'
let b = 1
console.log(a == b) // true
console.log(a === b) // false
```

#### !!

`!`表示取反，所以`!!`表示取反后再取反。

js数据类型：**字符串、数字、布尔、数组、对象、Null、Undefined**

```javascript
var a;
if(a != null && a != undefined && a != ''){
    //a有内容才执行的代码  
}

if(!!a){
    //a有内容才执行的代码...  
}

// 课程中 trolley.js
let isInstantBuy = !!ctx.request.body.isInstantBuy
// isInstantBuys是从前台传过来的，如果用户没有传，则为undefined,经过!!为false
```

> 只有null，undefined，字符串，逻辑值可以使用；而对象，数组，数字不可以使用

~~~javascript
console.log('null', !null) 		// true
console.log('undefined', !undefined) // true
console.log(`''`, !'') 		// true
console.log('false', !false) 	// true

console.log('[]', ![]) 		// false
console.log('{}', !{}) 		// false
console.log('0', !0) 		// true
console.log('1', !1) 		// false
~~~

#### function && function()

这是一种处理传递函数参数的常用方式，首先判断是否传递了function，如果没有传，则`function`为undefined，则逻辑值为false，则不会执行&&后面的代码；如果传了，则`function`为function类型，逻辑值为true，则会执行&& 后面的代码，function加括号就会执行函数。

~~~javascript
login({ success, fail, complete }) {
	qcloud.login({
        success: result => {
            if (result) {
        		userInfo = result
        		success && success(userInfo)
        	} else {
        	// 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
        	this.getUserInfo({ success, fail, complete })
        	}
       	},
        fail: () => {
        	fail && fail()
        },
        complete: () => {
        	complete && complete()
        }
    })
}
~~~

