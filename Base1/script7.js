var b = document.getElementById("validate");

function calculate(shoe_size, year) {
    var shoe_size = document.getElementById("shoe_size").value;
    var year = document.getElementById("year").value;
    var calc = ((((shoe_size * 2) + 5) * 50) - year) + 1766;
    document.write("the result of shoe_size " + shoe_size + " and year " + year + " is : " + calc);
    // event.preventDefault();
}
b.addEventListener("click", calculate);