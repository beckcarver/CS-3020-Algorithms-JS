var length = 100000;

console.time("array1");
var arr = new Array();
for(let i = 0; i < length; i++) {
  arr.push(1);
}
console.timeEnd("array1");

console.time("array2");
var arr = new Array();
for(let i = 0; i < length; i++) {
  arr.unshift(1);
}
console.timeEnd("array2");

console.time("array3");
var arr = new Array(length).fill(1);
for(let i = 0; i < length; i++) {
  arr.pop();
}
console.timeEnd("array3");

console.time("array4");
var arr = new Array(length).fill(1);
for(let i = 0; i < length; i++) {
  arr.shift();
}
console.timeEnd("array4");

console.time("array5");
var arr = new Array(length).fill(1);
arr.reverse();
for(let i = 0; i < length; i++) {
  arr.pop();
}
console.timeEnd("array5");

var arr = new Array();
for(let i = 0; i < length; i++) {
  arr.push(Math.random() * length);
}
var arr1 = JSON.parse(JSON.stringify(arr));

console.time("array6");
arr.sort(function(a, b) { return a - b; });
console.timeEnd("array6");

console.time("array7");
while(true) {
    let swaps = 0;
    for(let i = 1; i < length; i++) {
      if(arr1[i-1] > arr1[i]) {
          let tmp = arr1[i-1];
          arr1[i-1] = arr1[i];
          arr1[i] = tmp;
          swaps++;
      }
    }
    if(swaps == 0) break;
}
console.timeEnd("array7");

var arr = new Array();
for(let i = 0; i < length; i++) {
  arr.push(i);
}
var arr1 = JSON.parse(JSON.stringify(arr));

console.time("array8");
arr.sort(function(a, b) { return a - b; });
console.timeEnd("array8");

console.time("array9");
while(true) {
    let swaps = 0;
    for(let i = 1; i < length; i++) {
      if(arr1[i-1] > arr1[i]) {
          let tmp = arr1[i-1];
          arr1[i-1] = arr1[i];
          arr1[i] = tmp;
          swaps++;
      }
    }
    if(swaps == 0) break;
}
console.timeEnd("array9");
