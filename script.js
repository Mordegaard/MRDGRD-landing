window.onload = function() {
  function id(bl) {
    return document.getElementById(bl);
  }
  function cl(bl) {
    return document.getElementsByClassName(bl);
  }
  function getPosition(el) {
    var x = 0,
        y = 0;
    while (el != null && (el.tagName || '').toLowerCase() != 'html') {
        x += el.offsetLeft || 0;
        y += el.offsetTop || 0;
        el = el.parentElement;
    }
    return { x: parseInt(x, 10), y: parseInt(y, 10) };
  }

  var header = id("hdr");
  var navbar = id("navbar");
  var ide = {
    top: getPosition(cl("IDE-container")[0]).y,
    height: cl("IDE-container")[0].offsetHeight,
  }
  
  document.addEventListener("scroll", function() {
    var scr = window.scrollTop || window.pageYOffset;
    scr > header.offsetHeight ? navbar.classList.add("visible") : navbar.classList.remove("visible");
    id("IDEBG").style.backgroundPosition = '100% ' + (scr - ide.top - (ide.height - window.innerHeight)/2)/3 + 'px';

  });
}
