/**
 * Created by gabykaram on 5/22/17.
 */
const first_number = document.getElementById("first_number");
const second_number = document.getElementById("second_number");

validate.addEventListener('click', function () {
    alert("The Result is " + parseInt(first_number.value)%parseInt(second_number.value));
});
