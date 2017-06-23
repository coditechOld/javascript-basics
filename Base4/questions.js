
var stringSize = function (text) {
    return text.length
}
var replaceCharacterE = function (text) {
text = text.replace('e', ' ')
    return text
}


var concatString = function (text1, text2) {
    var res = text1.concat(text2);
    return res
}
var showChar5 = function (text) {
    var res = text.charAt(4);
    return res;

}
var showChar9 = function (text) {
    var res = text.substring(0,9);
    return res;
}
var toCapitals = function (text) {
      var res = text.toUpperCase();
    return res;



}
var toLowerCase = function (text) {
    var res = text.toLowerCase();
    return res;


}
var removeSpaces = function (text) {
    var res = text.trim();
    return res;

}
var IsString = function (text) {
if ( typeof text === "string"){

    return true
}
else{
    return false
}
}

var getExtension = function (text) {
    return text.split('.').pop();

}
var countSpaces = function (text) {
var spaceCount = (text.split(" ").length - 1);
return spaceCount

}
var InverseString = function (text) {


    function reverse(text){
    return  text.split("").reverse().join("");
}
return reverse(text);

}



var power = function (x, y) {
    var r = Math.pow(x, y);
    return r ;

}
var absoluteValue = function (num) {
    var r = Math.abs(num);
    return r ;

}
var absoluteValueArray = function (array) {
    for(var i=0;i<array.length;i++){
        array[i] = Math.abs(array[i])
    }
    return array;
    


}
var circleSurface = function (radius) {
    
    var x = Math.PI * radius *radius;
    var x1 = Math.round(x);
    return x1;
}


var hypothenuse = function (ab, ac) {
    var x= Math.hypot(ab,ac);
    return x; 

}
var BMI = function (weight, height) {
    var BMI =(weight/Math.pow(height,2))
    var BMI2 = Math.round(BMI * 100) / 100

  return BMI2
}

var createLanguagesArray = function () {
    return languages = ["Html","CSS","Java","PHP"];
    
}

var createNumbersArray = function () {
    return nombres= [0,1,2,3,4,5]


}

var replaceElement = function (languages) {
    var x= languages.splice(2, 1 ,"Javascript");
    return languages;
}

var addElement = function (languages) {
    var x= languages.splice(4, 0 ,"Ruby" ,"Python");
    return languages;


}

var addNumberElement = function (numbers) {
    var x= nombres.splice(0, 0 ,-2 ,-1);
    return nombres;


}

var removeFirst = function (languages) {
     var x= languages.splice(0, 1);
     return languages;


}

var removeLast = function (languages) {
     var x= languages.splice(4,1);
     return languages;

}

var convertStrToArr = function (social_arr) {
    var res = social_arr.split(",");
    return res;


}

var convertArrToStr = function (languages) {
    var str1= languages.toString(",")
    return str1;
    
}

var sortArr = function (social_arr) {
    let x= social_arr.sort();
    return x;


    

}

var invertArr = function (social_arr){
    let x= social_arr.reverse();
    return x;

}
