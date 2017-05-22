/**
 * Created by gabykaram on 5/22/17.
 */
const imgs = document.getElementsByTagName("img");


var i;
for (i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('mouseover', function () {
        var previousSrc = this.src;
        previousSrc = previousSrc.replace(/^.*[\\\/]/, '');
        previousSrc =previousSrc.slice(0,-4);

        this.src = "images/"+ previousSrc + "_2.jpg";

    });
    imgs[i].addEventListener('mouseout', function () {
        var previousSrc = this.src;
        previousSrc = previousSrc.replace(/^.*[\\\/]/, '');
        previousSrc =previousSrc.slice(0,-6);
        this.src = "images/"+ previousSrc + ".jpg";

    });
}
