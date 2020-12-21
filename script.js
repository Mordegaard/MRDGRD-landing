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

  }, {passive:true});

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
