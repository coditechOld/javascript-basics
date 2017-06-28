/**
 * Created by gabykaram on 5/22/17.
 */
document.addEventListener('DOMContentLoaded', function () {
    const image1 = document.querySelector('#image1');
    image1.addEventListener('mouseover', function () {
        image1.src = "images/image1_2.jpg";
    });
    image1.addEventListener('mouseout', function () {
        image1.src = "images/image1.jpg";
    })
});
