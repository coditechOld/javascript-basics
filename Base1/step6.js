/**
 * Created by gabykaram on 5/22/17.
 */
const first_number = document.getElementById("first_number");
const second_number = document.getElementById("second_number");
const validate = document.getElementById("validate");

validate.addEventListener('click', function () {
    alert("The Result is " + parseInt(first_number.value)%parseInt(second_number.value));
});
