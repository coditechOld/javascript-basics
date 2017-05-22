/**
 * Created by gabykaram on 5/22/17.
 */
const shoe_size = document.getElementById("shoe_size");
const year = document.getElementById("year");
const validate = document.getElementById("validate");

validate.addEventListener('click', function () {
    const result = ((((parseInt(shoe_size.value) *2)+5)*50)/parseInt(year.value) )+ 1766 ;
    alert("The Result is " + result);
});
