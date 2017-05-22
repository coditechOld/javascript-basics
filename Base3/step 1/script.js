/**
 * Created by gabykaram on 5/22/17.
 */
const image1 = document.getElementById('image1');
image1.addEventListener('mouseover', function () {
    image1.className = ' border'
});
image1.addEventListener('mouseout', function () {
    image1.className = ' '
});

