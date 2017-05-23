'use strict';

describe('Character Strings: ', function () {

    describe('stringSize', function(){
      it('Returns the string size', function () {
          var result = stringSize('This text has a certain number of characters');
          expect(result).toEqual(44);
      });
    });

    describe('replaceCharacterE',function(){
      it('Replaces The E Character with a space', function () {
          var result = replaceCharacterE('This text has a certain number of characters');
          expect(result).toEqual('This t xt has a certain number of characters');
      });
    })
    describe('concatString',function(){
      it('Concatenates two strings', function () {
          var result = concatString('el Javascript shi ', 'ra2e3');
          expect(result).toEqual('el Javascript shi ra2e3');
      });
    })
    describe('showChar5',function(){
      it('Shows the fifth character', function () {
          var result = showChar5('TDD kicks ass');
          expect(result).toEqual('k');
      });
    })
    describe('showChar9',function(){
      it('Prints the first 9 characters', function () {
          var result = showChar9('But it is really annoying to write');
          expect(result).toEqual('But it is');
      });
    })
    describe('toCapitals',function(){
      it('Transforms a string to all caps', function () {
          var result = toCapitals('Another useful function');
          expect(result).toEqual('ANOTHER USEFUL FUNCTION');
      });
    })
    describe('toLowerCase',function(){
      it('Transforms a string to lower case', function () {
          var result = toLowerCase('This is a sentence!');
          expect(result).toEqual('this is a sentence!');
      });
    })
    describe('removeSpaces',function(){
      it('Removes space before and after the function', function () {
          var result = removeSpaces(' Rome wasn\'t built in a day ');
          expect(result).toEqual('Rome wasn\'t built in a day');
      });
    })
    describe('IsString',function(){
      it('Checks if a passed parameter is a string', function () {
          var result = IsString('Is this a string?');
          expect(result).toEqual(true);
      });
    })
    describe('getExtension',function(){
      it('Extracts the file extension', function () {
          var result = getExtension('images/photo01.jpg');
          expect(result).toEqual('jpg');
      });
    })
    describe('countSpaces',function(){
      it('Counts the number of space characters in a string', function () {
          var result = countSpaces('Sire open we have a big one!');
          expect(result).toEqual(6);
      });
    })
    describe('InverseString',function(){
      it('Inverses a string', function () {
          var result = InverseString('Après demain, à partir d\'aujourd\'hui?');
          expect(result).toEqual('?iuh\'druojua\'d ritrap à ,niamed sèrpA');
      });
    })
})
describe('Numbers and math : ', function () {
  describe('power',function(){
    it('Calculate the power of a number by another', function () {
        var result = power(2, 3);
        expect(result).toEqual(8);
    });
  })
  describe('absoluteValue',function(){
    it('Get the absolute value of a number', function () {
        var result = absoluteValue(-5);
        expect(result).toEqual(5);
    });
  });
  describe('absoluteValueArray',function(){
    it('Gets multiple absolute values', function () {
        var result = absoluteValueArray([-5,-50,-25,-568]);
        expect(result).toEqual([5,50,25,568]);
    });
  });
  describe('circleSurface',function(){
    it('Calculates a circle\'s surface from a provided radius. Round to the nearest number', function () {
        var result = circleSurface(5);
        expect(result).toEqual(79);
    });
  });
  describe('hypothenuse',function(){
    it('Gets the hypothenuse of a triangle', function () {
        var result = hypothenuse(5, 8);
        expect(result).toEqual(9.433981132056603);
    });
  });
  describe('BMI',function(){
    it('Gets a person\'s BMI (weight / (height * height)). Round to two decimals', function () {
        var result = BMI(65, 1.75);
        expect(result).toEqual(21.22);
    });
  });
});
describe("Arrays", function() {
  it('Creates an array with "Html", "CSS", "Java", "PHP"', function () {
      var languages = createLanguagesArray();
      expect(languages).toEqual(["Html","CSS","Java","PHP"]);
  });
  it('Creates a number array with numbers from 0 to 5', function () {
      var nombres = createNumbersArray();
      expect(nombres).toEqual([0,1,2,3,4,5]);
  });
  it('Replaces the 3rd element of the Array with "Javascript"', function () {
      var languages = createLanguagesArray();
      var languages = replaceElement(languages);
      expect(languages).toEqual(['Html', 'CSS', 'Javascript', 'PHP']);
  });
  it('Adds "Ruby" and "Python" at the end of the array', function () {
      var languages = createLanguagesArray();
      var languages = replaceElement(languages)
      var languages = addElement(languages);
      expect(languages).toEqual(['Html', 'CSS', 'Javascript', 'PHP', 'Ruby', 'Python']);
  });
  it('Adds "-2" and "-1" at the beginning of the numbers array', function () {
      var nombres = [0,1,2,3,4,5];
      var nombres = addNumberElement(nombres);
      expect(nombres).toEqual([-2,-1,0,1,2,3,4,5]);
  });
  it('Removes the first element', function () {
      var languages = ['Html', 'CSS', 'Javascript', 'PHP', 'Ruby', 'Python'];
      var languages = removeFirst(languages);
      expect(languages).toEqual(['CSS', 'Javascript', 'PHP', 'Ruby', 'Python']);
  });
  it('Removes the last element', function () {
      var languages = ['CSS', 'Javascript', 'PHP', 'Ruby', 'Python'];
      var languages = removeLast(languages);
      expect(languages).toEqual(['CSS', 'Javascript', 'PHP', 'Ruby']);
  });
  it('Converts a string into an array', function () {
      var reseaux_sociaux_chaine = 'Facebook,Twitter,Google +,Viadeo,LinkedIn';
      var reseaux_sociaux = convertStrToArr(reseaux_sociaux_chaine);
      expect(reseaux_sociaux).toEqual(['Facebook','Twitter', 'Google +','Viadeo','LinkedIn']);
  });
  it('Converts an array into a comma separated string', function () {
      var languages = ['CSS', 'Javascript', 'PHP', 'Ruby'];
      var languages_chaine = convertArrToStr(languages);
      expect(languages_chaine).toEqual("CSS,Javascript,PHP,Ruby");
  });
  it('Sorts the array', function () {
      var reseaux_sociaux = ['Facebook','Twitter', 'Google +','Viadeo','LinkedIn'];
      var reseaux_sociaux = sortArr(reseaux_sociaux);
      expect(reseaux_sociaux).toEqual(['Facebook','Google +','LinkedIn','Twitter','Viadeo']);
  });
  it('Inverts the array', function () {
      var languages = ['CSS','Javascript','PHP','Ruby'];
      var languages = invertArr(languages);
      expect(languages).toEqual(["Ruby", "PHP", "Javascript", "CSS"]);
  });
});
