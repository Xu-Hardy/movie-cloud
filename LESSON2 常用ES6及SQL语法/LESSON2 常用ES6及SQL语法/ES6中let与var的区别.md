

# ES6中let与var的区别

- 通过var定义的变量，作用域是整个封闭函数，是全域的 。通过let定义的变量，作用域是在块级或是子块中。

```javascript
for (let i = 0; i < 10; i++) {
  // ...
}

console.log(i);
// ReferenceError: i is not defined
//计数器i只在for循环体内有效，在循环体外引用就会报错。1234567
```

- **变量提升现象**：浏览器在运行代码之前会进行预解析，首先解析函数声明，定义变量，解析完之后再对函数、变量进行运行、赋值等。 
  -不论var声明的变量处于当前作用域的第几行，都会提升到作用域的头部。 
  -var 声明的变量会被提升到作用域的顶部并初始化为undefined，而let声明的变量在作用域的顶部未被初始化

```javascript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;
//相当于
var foo;  //声明且初始化为undefined
console.log(foo);
foo=2;
12345678
// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
//相当于在第一行先声明bar但没有初始化，直到赋值时才初始化
123456
```

- 但是直接用let声明变量不赋值是会打印undefined，还是初始化了，只是let声明放在赋值之后，let声明会提前但不会初始化。

```javascript
let a;
alert(a);//值为undefined

alert b;//会报错
let b;12345
```

- 只要块级作用域内存在let命令，它所声明的变量就“绑定”这个区域，不再受外部的影响。总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的，尽管代码块外也存在相同全局变量。

```javascript
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
alert(tmp);  //输出值为123，全局tmp与局部tmp不影响1234567
```

- let不允许在相同作用域内，重复声明同一个变量。

```javascript
// 报错
function () {
  let a = 10;
  var a = 1;
}
// 报错
function () {
  let a = 10;
  let a = 1;
}
```

[转自]：https://blog.csdn.net/zuiziyoudexiao/article/details/76890102