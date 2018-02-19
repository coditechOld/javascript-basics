var b = document.getElementById("validate");

function calculate(first_number, second_number) {
    var first_number = document.getElementById("first_number").value;
    var second_number = document.getElementById("second_number").value;
    var rem = (first_number % second_number);
    document.write("the remainder of " + first_number + " and " + second_number + " is : " + rem);
    // event.preventDefault();
}
b.addEventListener("click", calculate);