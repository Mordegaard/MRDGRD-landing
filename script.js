var firebaseConfig = {
    apiKey: "AIzaSyAP32_lqMymoNq6o0GnuTfvCzfomwDvbac",
    authDomain: "mordegaard-blgspt.firebaseapp.com",
    databaseURL: "https://mordegaard-blgspt.firebaseio.com",
    projectId: "mordegaard-blgspt",
    storageBucket: "mordegaard-blgspt.appspot.com",
    messagingSenderId: "666333481438",
    appId: "1:666333481438:web:30fee7393125fa23c2354f",
    measurementId: "G-B56B297SCK"
  };
  firebase.initializeApp(firebaseConfig);

window.onload = function() {

  document.body.classList.add("loaded");
  setTimeout(()=>{
    id("loading").children[0].style.display = "none";
    id("loading").children[1].style.display = "none";
    id("loadingLogo").style.transform = "none";
    id("loadingLogoAnimation").beginElement(); console.log(id("loading").getElementsByTagName("svg")[0]);
    setTimeout(() => {
      var y = id("headerLogo").offsetTop;
      var x = id("headerLogo").offsetLeft;
      id("loading").getElementsByClassName("logo")[0].style.top = y + 'px';
      id("loading").getElementsByClassName("logo")[0].style.left = x + 'px';
      id("loading").getElementsByClassName("logo")[0].style.transform = "none";
      console.log(x, y);
    }, 666);
    setTimeout(()=>{
      id("loading").style.opacity = "0";
      setTimeout(()=>{id("loading").style.display = "none"}, 500);
    }, 1000);
  }, 500);

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
  function closeOverflow() {
    overflow.classList.remove("visible");
  }

  var sended = false;
  var header = id("hdr");
  var navbar = id("navbar");
  var overflow = id("overflowContainer");
  var ide = {
    top: getPosition(cl("IDE-container")[0]).y,
    height: cl("IDE-container")[0].offsetHeight,
  }

  document.addEventListener("scroll", function() {
    var scr = window.scrollTop || window.pageYOffset;
    scr > header.offsetHeight ? navbar.classList.add("visible") : navbar.classList.remove("visible");
    if (scr > ide.top - window.innerHeight) id("IDEBG").style.marginTop = (scr - ide.top)/3 + 'px';

  }, true);

  [].forEach.call(cl("example-button"), function(el, ind) {
    el.addEventListener("click", function(){
      overflow.classList.add("visible");
      var vis, invis;
      var title = overflow.getElementsByClassName("title")[0];
      if (ind) {
        title.innerText = "Веб-проекты";
        vis = "webExample"; invis = "androidExample";
      } else {
        title.innerText = "Андроид-проекты";
        vis = "androidExample"; invis = "webExample";
      }
      [].forEach.call(cl(vis), function(el){
        el.classList.add("visible");
      });
      [].forEach.call(cl(invis), function(el){
        el.classList.remove("visible");
      });
    });
  });

  [].forEach.call(cl("webItem"), function(el, ind) {
    el.addEventListener("click", function(){
      projects = cl("webExample")[1].getElementsByClassName("project");
      [].forEach.call(projects, function(el){
        el.classList.remove("selected");
      })
      projects[ind].classList.add("selected");
    });
  });

  [].forEach.call(cl("copy"), function(el, ind) {
    el.addEventListener("click", function(){
      var block = this;
      var text = block.getElementsByClassName("copied-text")[0].innerText;
      navigator.clipboard.writeText(text).then(function() {
        console.log(`copied ${text}`);
        block.classList.add("copied");
        setTimeout(()=>{block.classList.remove("copied")},500);
      }, function() {
        console.log("not copied");
      });
    });
  });

  id("darkFilter").addEventListener("click", closeOverflow);
  id("closeOverflow").addEventListener("click", closeOverflow);

  firebase.auth().signInAnonymously()
  .then((user) => {
    var form = id("sendMessage");
    var usr = user.user.uid;
    form.onsubmit = function(e) {
      e.preventDefault();
      if (form.elements.contacts.value && form.elements.description.value && !sended) {
        var name = form.elements.contacts.value.slice(0, 128);
        var text = form.elements.description.value.slice(0, 1024);
        var database = firebase.database();
        var date = new Date();
        var id = date.getTime();
        var btn = form.elements.submit.parentElement;
        btn.classList.add("sending");
        database.ref('clients/'+usr).child(id).once('value', function(snapshot) {
          if (!snapshot.exists()) {
            database.ref('clients/'+usr+"/"+id).set({
              contacts: name,
              description: text,
              time: date.toString(),
            }).then(() => {
              btn.innerText = "Ваше сообщение\r\n успешно отправлено";
              btn.classList.remove("sending");
              btn.classList.add("sended");
              sended = true;
            }).catch((e) => {
              btn.classList.remove("sending");
              alert("Произошла неизвестная ошибка при отправке");
            });
          }
        });
      }
      return false;
    }
  })
  .catch((error) => {
    console.warn(error.code, error.message);
  });
}
