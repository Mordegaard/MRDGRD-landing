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

function rand(max, m=undefined) {
  if (m === undefined) return Math.floor(Math.random()*max);
  else return Math.floor(Math.random()*m + max);
}

window.onload = function() {
  window.scrollTo(0,0);
  document.body.classList.add("loaded");
  setTimeout(()=>{
    id("loading").children[0].style.display = "none";
    id("loading").children[1].style.display = "none";
    id("loadingLogo").style.transform = "none";
    id("loadingLogoAnimation").beginElement();
    setTimeout(() => {
      var y = id("headerLogo").getBoundingClientRect().top;
      var x = id("headerLogo").getBoundingClientRect().left;
      id("loading").getElementsByClassName("logo")[0].style.top = y + 'px';
      id("loading").getElementsByClassName("logo")[0].style.left = x + 'px';
      id("loading").getElementsByClassName("logo")[0].style.transform = "none";
    }, 666);
    setTimeout(()=>{
      id("loading").style.opacity = "0";
      setTimeout(()=>{id("loading").style.display = "none"}, 500);
    }, 1200);
  }, 500);

  function closeOverflow() {
    overflow.classList.remove("visible");
  }

  var scr = 0;
  var sended = false;
  var header = id("hdr");
  var navbar = id("navbar");
  var overflow = id("overflowContainer");
  var example, start_mult;
  var ide = {
    bg: id("IDEBG"),
    overflow: id("IDEoverflow"),
    top: getPosition(cl("IDE-container")[0]).y,
    height: cl("IDE-container")[0].offsetHeight,
    blocks: [
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM243.8 381.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"></path></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3.1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2.1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z"></path></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M384 121.941V128H256V0h6.059c6.365 0 12.47 2.529 16.971 7.029l97.941 97.941A24.005 24.005 0 0 1 384 121.941zM248 160c-13.2 0-24-10.8-24-24V0H24C10.745 0 0 10.745 0 24v464c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V160H248zM123.206 400.505a5.4 5.4 0 0 1-7.633.246l-64.866-60.812a5.4 5.4 0 0 1 0-7.879l64.866-60.812a5.4 5.4 0 0 1 7.633.246l19.579 20.885a5.4 5.4 0 0 1-.372 7.747L101.65 336l40.763 35.874a5.4 5.4 0 0 1 .372 7.747l-19.579 20.884zm51.295 50.479l-27.453-7.97a5.402 5.402 0 0 1-3.681-6.692l61.44-211.626a5.402 5.402 0 0 1 6.692-3.681l27.452 7.97a5.4 5.4 0 0 1 3.68 6.692l-61.44 211.626a5.397 5.397 0 0 1-6.69 3.681zm160.792-111.045l-64.866 60.812a5.4 5.4 0 0 1-7.633-.246l-19.58-20.885a5.4 5.4 0 0 1 .372-7.747L284.35 336l-40.763-35.874a5.4 5.4 0 0 1-.372-7.747l19.58-20.885a5.4 5.4 0 0 1 7.633-.246l64.866 60.812a5.4 5.4 0 0 1-.001 7.879z"></path></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"></path></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M640 264v-16c0-8.84-7.16-16-16-16H344v-40h72c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32H224c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h72v40H16c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h104v40H64c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32h-56v-40h304v40h-56c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32h-56v-40h104c8.84 0 16-7.16 16-16zM256 128V64h128v64H256zm-64 320H96v-64h96v64zm352 0h-96v-64h96v64z"></path></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M255.03 261.65c6.25 6.25 16.38 6.25 22.63 0l11.31-11.31c6.25-6.25 6.25-16.38 0-22.63L253.25 192l35.71-35.72c6.25-6.25 6.25-16.38 0-22.63l-11.31-11.31c-6.25-6.25-16.38-6.25-22.63 0l-58.34 58.34c-6.25 6.25-6.25 16.38 0 22.63l58.35 58.34zm96.01-11.3l11.31 11.31c6.25 6.25 16.38 6.25 22.63 0l58.34-58.34c6.25-6.25 6.25-16.38 0-22.63l-58.34-58.34c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63L386.75 192l-35.71 35.72c-6.25 6.25-6.25 16.38 0 22.63zM624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z"></path></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M480 160H32c-17.673 0-32-14.327-32-32V64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z"></path></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M400 54.1c63 45 104 118.6 104 201.9 0 136.8-110.8 247.7-247.5 248C120 504.3 8.2 393 8 256.4 7.9 173.1 48.9 99.3 111.8 54.2c11.7-8.3 28-4.8 35 7.7L162.6 90c5.9 10.5 3.1 23.8-6.6 31-41.5 30.8-68 79.6-68 134.9-.1 92.3 74.5 168.1 168 168.1 91.6 0 168.6-74.2 168-169.1-.3-51.8-24.7-101.8-68.1-134-9.7-7.2-12.4-20.5-6.5-30.9l15.8-28.1c7-12.4 23.2-16.1 34.8-7.8zM296 264V24c0-13.3-10.7-24-24-24h-32c-13.3 0-24 10.7-24 24v240c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24z"></path></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 48v416c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V48c0-26.51 21.49-48 48-48h224c26.51 0 48 21.49 48 48zm96 58v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42V88h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zm0 96v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42v-48h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zm0 96v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42v-48h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zm0 96v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42v-48h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zM30 376h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6zm0-96h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6zm0-96h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6zm0-96h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6z"></path></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M634.91 154.88C457.74-8.99 182.19-8.93 5.09 154.88c-6.66 6.16-6.79 16.59-.35 22.98l34.24 33.97c6.14 6.1 16.02 6.23 22.4.38 145.92-133.68 371.3-133.71 517.25 0 6.38 5.85 16.26 5.71 22.4-.38l34.24-33.97c6.43-6.39 6.3-16.82-.36-22.98zM320 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm202.67-83.59c-115.26-101.93-290.21-101.82-405.34 0-6.9 6.1-7.12 16.69-.57 23.15l34.44 33.99c6 5.92 15.66 6.32 22.05.8 83.95-72.57 209.74-72.41 293.49 0 6.39 5.52 16.05 5.13 22.05-.8l34.44-33.99c6.56-6.46 6.33-17.06-.56-23.15z"></path></svg>',
      "Array", "indexOf", "document", "null", "Object", "function()"
    ],
    positionX: [1,2,3,4,5,6,13,14,15,16,17,18],
    positionY: [1,2,3,4,5,6,13,14,15,16,17,18],
    params: {
      start: 1.2,
      opac: 1,
      text: 0
    }
  }
  var idePosLength = ide.positionX.length;
  if (window.screen.width > 800) {
    example = cl("example-button");
  } else {
    example = [cl("android")[0], cl("web")[0]];
    ide.params.start = 1.1; ide.params.text = 0.2;
  }

  document.addEventListener("scroll", function() {
    requestAnimationFrame(scroll);
  }, { capture: false, passive: true});

  function scroll() {
      scr = window.scrollTop || window.pageYOffset;
      scr > header.offsetHeight ? navbar.classList.add("visible") : navbar.classList.remove("visible");
      var start = ide.top*ide.params.start;
      if (scr > start && scr < ide.top + ide.height) {
        document.body.classList.add("overflow-start");
        ide.overflow.style.opacity = (scr-start)/start*3-0.15;
        window.screen.width > 800 ? ide.bg.style.backgroundSize = (100 + (scr-start)/10) + '%' : ide.bg.style.backgroundSize = 'auto ' + (100 + (scr-start)/10) + '%';
      }
      else {
        ide.overflow.style.opacity = 0;
        ide.bg.style.backgroundSize = "";
        document.body.classList.remove("overflow-start");
      }
      if (scr > ide.top * (1.66-ide.params.text)) ide.overflow.classList.add("visible"); else ide.overflow.classList.remove("visible");
      if (scr > ide.top + ide.height) {
        id("IDEoverflow").style.opacity = 1;
        document.body.classList.add("overflow-end");
      }
      else document.body.classList.remove("overflow-end");
  }

  [].forEach.call(example, function(el, ind) {
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
        block.classList.add("copied");
        setTimeout(()=>{block.classList.remove("copied")},500);
      }, function() {
      });
    });
  });

  id("darkFilter").addEventListener("click", closeOverflow);
  id("closeOverflow").addEventListener("click", closeOverflow);

  for (var i=0; i<idePosLength; i++) {
    var block = document.createElement('span');
    var x = rand(ide.positionX.length), y = rand(ide.positionY.length);
    block.innerHTML = ide.blocks[rand(ide.blocks.length)];
    block.style.top = ide.positionY[y] * 5 + '%'; block.style.left = ide.positionX[x] * 5 + '%';
    block.style.transitionDelay = rand(5) / 10 + 's';
    block.style.transform = "scale(" + rand(6, 6) / 10 + ")";
    ide.overflow.prepend(block);
    ide.positionX.splice(x,1); ide.positionY.splice(y,1);
  }

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
