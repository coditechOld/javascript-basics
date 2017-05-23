function doThings(){
let shoeSize = parseInt (document.getElementById("shoe_size").value);
let year = parseInt (document.getElementById("year").value);
let total=(shoeSize*2+5)*50-year+1766;
alert (total);
}
