var stringSize = function (text) {
    var size = text.length;
    return size;
}
var replaceCharacterE = function (text) {
    var rep = text.replace(/e/, ' ');
    return rep;
}
var concatString = function (text1, text2) {
    var conc = text1.concat(text2);
    return conc;
}
var showChar5 = function (text) {
    var ans = text.charAt(4);
    return ans;

}
var showChar9 = function (text) {
    var ans = text.slice(0, 9);
    return ans;

}
var toCapitals = function (text) {
    var upr = text.toUpperCase();
    return upr;
}
var toLowerCase = function (text) {
    var lwr = text.toLowerCase();
    return lwr;
}
var removeSpaces = function (text) {
    var del = text.trim();
    return del;
}
var IsString = function (text) {
    if (typeof (text) == 'string') {
        return true;
    } else return false;
}

var getExtension = function (text) {
    var ext = text.split('.')
    return ext[1]
}
var countSpaces = function (text) {
    var countSpaces = text.split(" ");
    return countSpaces.length - 1;
}
var InverseString = function (text) {
    var ans = "";
    for (var i = text.length - 1; i >= 0; i--) {
        ans += text[i];
    }
    return ans;
}

var power = function (x, y) {
    var power = Math.pow(x, y);
    return power;

}
var absoluteValue = function (num) {
    var ans = Math.abs(num);
    return ans
}
var absoluteValueArray = function (array) {
    var ans = '';
    var arr = [];
    for (var i = 0; i < array.length; i++) {
        ans = Math.abs(array[i])
        arr.push(ans)
    }
    return arr;
}
var circleSurface = function (radius) {
    var circle = Math.ceil(Math.PI * (radius * radius));
    return circle;

}
var hypothenuse = function (ab, ac) {
    var ans = Math.hypot(ab, ac);
    return ans;
}
var BMI = function (weight, height) {
    var ans = (weight / (height * height)).toFixed(2)
    ans = parseFloat(ans);
    return ans;
}

var createLanguagesArray = function () {
    var arr = ['Html', 'CSS', 'Java', 'PHP'];
    return arr;
}

var createNumbersArray = function () {
    var arr = [];
    for (var i = 0; i <= 5; i++) {
        arr.push(i)
    }
    return arr;
}

var replaceElement = function (languages) {
    languages.splice(2, 1, 'Javascript');
    return languages;
}

var addElement = function (languages) {
    languages.splice(5, 0, 'Ruby', 'Python');
    return languages;
}

var addNumberElement = function (numbers) {
    numbers.splice(0, 0, -2, -1);
    return numbers;
}

var removeFirst = function (languages) {
    languages.shift();
    return languages;
}

var removeLast = function (languages) {
    languages.pop();
    return languages;
}

var convertStrToArr = function (social_arr) {
    var ans = social_arr.split(',');
    return ans;
}

var convertArrToStr = function (languages) {
    var result = languages.toString();
    return result;
}

var sortArr = function (social_arr) {
    var ans = social_arr.sort();
    return ans;
}

var invertArr = function (social_arr) {
    var ans = social_arr.reverse();
    return ans;
}