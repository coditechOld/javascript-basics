var stringSize = function (text) {
    return text.length;
};
var replaceCharacterE = function (text) {
    return text.replace('e', ' ');
};
var concatString = function (text1, text2) {
    return text1 + text2;
};
var showChar5 = function (text) {
    return text.charAt(4);
};
var showChar9 = function (text) {
    var texts = "";
    for (var i = 0; i < 9; i++) {
        texts += text.charAt(i);
    }
    return texts;

};
var toCapitals = function (text) {
    return text.toUpperCase();
};
var toLowerCase = function (text) {

    return text.toLowerCase();
};
var removeSpaces = function (text) {
    return text.trim();


};
/**
 * @return {boolean}
 */
var IsString = function (text) {


    return (typeof text === 'string');
};

var getExtension = function (text) {

    return text.split('.').pop();
};
var countSpaces = function (text) {

    return text.split(' ').length - 1;

};
/**
 * @return {string}
 */
var InverseString = function (text) {
    return text.split("").reverse().join("");
};

var power = function (x, y) {
    if (y === 1) {
        return x;
    }
    return x * power(x, y - 1);
    // return Math.pow(x,y);
};
var absoluteValue = function (num) {

    return Math.abs(num);
};
var absoluteValueArray = function (array) {

    for (var i = 0; i < array.length; i++) {
        array[i] = Math.abs(array[i]);
    }
    return array;
};
var circleSurface = function (radius) {

    return Math.ceil(Math.PI * Math.pow(radius, 2));
};
var hypothenuse = function (ab, ac) {
    return Math.pow(Math.pow(ab, 2) + Math.pow(ac, 2), 0.5);
};
/**
 * @return {number}
 */
var BMI = function (weight, height) {
    return parseFloat((weight / Math.pow(height, 2) ).toFixed(2));
};

var createLanguagesArray = function () {
    return ["Html", "CSS", "Java", "PHP"];
};

var createNumbersArray = function () {
    return [0, 1, 2, 3, 4, 5];
};

var replaceElement = function (languages) {

    languages[2] = "Javascript";
    return languages;
};

var addElement = function (languages) {
    index = languages.length;
    languages[index] = 'Ruby';
    languages[index + 1] = 'Python';
    // languages.pop('Ruby');
    // languages.pop('Python');
    return languages;
};

var addNumberElement = function (numbers) {
    numbers.unshift(-1);
    numbers.unshift(-2);
    return numbers;

};

var removeFirst = function (languages) {

    languages.shift();
    return languages;
};

var removeLast = function (languages) {

    languages.pop();
    return languages;
};

var convertStrToArr = function (social_arr) {
    return social_arr.split(',');

};

var convertArrToStr = function (languages) {
    return languages.toString();
};

var sortArr = function (social_arr) {

  return social_arr.sort();
};

var invertArr = function (social_arr) {

    var left = null;
    var right = null;
    var length = social_arr.length;
    for (left = 0, right = length - 1; left < right; left += 1, right -= 1)
    {
        var temporary = social_arr[left];
        social_arr[left] = social_arr[right];
        social_arr[right] = temporary;
    }
    return social_arr;
    // return social_arr.reverse();
};
