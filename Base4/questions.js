var stringSize = function(text) {
  return text.length;
}
var replaceCharacterE = function(text) {
  return text.replace("e", " ");
}
var concatString = function(text1, text2) {
  return text1 + text2;
}
var showChar5 = function(text) {
  return text.charAt(4);
}
var showChar9 = function(text) {
  return text.slice(0, 9);
}
var toCapitals = function(text) {
  return text.toUpperCase();
}
var toLowerCase = function(text) {
  return text.toLowerCase();
}
var removeSpaces = function(text) {
  return text.trim();
}
var IsString = function(text) {
  return (typeof(text) == "string");
}

var getExtension = function(text) {
  return text.slice(text.lastIndexOf(".") + 1, text.length);
}
var countSpaces = function(text) {
  let counter = 0;
  for (var i = 0; i < text.length; i++) {
    if (text.charAt(i) == " ") counter++;
  }
  return counter;
}
var InverseString = function(text) {
  return text.split("").reverse().join("");

}

var power = function(x, y) {
return Math.pow(x,y);
}
var absoluteValue = function(num) {
return Math.abs(num);
}
var absoluteValueArray = function(array) {
var absoluteArray = new Array(array.length);
for(var i=0;i<array.length;i++){
absoluteArray[i]=absoluteValue(array[i]);}

return absoluteArray;
}
var circleSurface = function(radius) {
return Math.round(3.14*radius*radius);
}
var hypothenuse = function(ab, ac) {
return Math.sqrt(ab*ab+ac*ac);
}
var BMI = function(weight, height) {
var bmi=weight/(height*height);
return parseFloat(bmi.toFixed(2));
}

var createLanguagesArray = function() {
return ['Html', 'CSS', 'Java', 'PHP'];
}

var createNumbersArray = function() {
return[0,1,2,3,4,5];
}

var replaceElement = function(languages) {
var arr=languages.slice(0);
arr[2]="Javascript";
return arr;
}

var addElement = function(languages) {
var arr=languages.slice(0);
arr.push("Ruby");
arr.push("Python");
return arr;
}

var addNumberElement = function(numbers) {
var arr=numbers.slice(0);
arr.unshift(-1);
arr.unshift(-2);
return arr;
}

var removeFirst = function(languages) {
var arr= languages.slice(1);
return arr;
}

var removeLast = function(languages) {
var arr= languages.slice(0,languages.length-1);
return arr;
}

var convertStrToArr = function(social_arr) {
var arr=social_arr.split(",");
return arr;
}

var convertArrToStr = function(languages) {
var str=languages.join(",");
return str;
}

var sortArr = function(social_arr) {
var arr=social_arr.sort();
return arr;
}

var invertArr = function(social_arr) {
  var arrayTemp=social_arr.slice(0);
return arrayTemp.reverse();
}
