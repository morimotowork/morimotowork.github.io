$(document).ready(function () {

  $('#horario').text(new Date().toLocaleTimeString() + ' ' + new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1]);

  setInterval(function(){
    $('#horario').text(new Date().toLocaleTimeString() + ' ' + new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1]);
}, 1000);

var getNumber = (function() {
  var previous = NaN;
  return function() {
    var min = 0;
    var max = 4 + (!isNaN(previous) ? -1 : 0);
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    if (value >= previous) {
      value += 1;
    }
    previous = value;
    return value;
  };
})();

$('body').click(function(){
  $('.mosaico-fundo').css('background-image', 'url(imgs/gifs/' + getNumber() + '.gif)');
});

});


const raspagemPixel = document.getElementById("mosaico");
const cursor = document.getElementById("cursor");
const cursor2 = document.getElementById("cursor2");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = $(document).width();
const height = $(document).height();

// Paint golden gradient
canvas.width = width;
canvas.height = height;

var img = new Image();
img.onload = function() {
  fillPattern(this, 120, 120);
  change.onchange = change.oninput = function() {
    fillPattern(img, this.value, this.value);
  }
};
img.src = "imgs/listras.jpg";

// Fills canvas with image as pattern at size w,h
function fillPattern(img, w, h) {

    //draw once
    ctx.drawImage(img, 0, 0, w, h);

    while (w < canvas.width) {
        ctx.drawImage(canvas, w, 0);
        w <<= 1;  // shift left 1 = *2 but slightly faster
    }
    while (h < canvas.height) {
        ctx.drawImage(canvas, 0, h);
        h <<= 1;
    }
}

raspagemPixel.classList.add("mosaico--ready");

// Calculate transparency
const maxPixels = width * height;

const calculateTransparency = () => {
  const imageData = ctx.getImageData(0, 0, width, height).data;
  const alphaValues = imageData.filter(
    (value, index) => index % 4 === 4 - 1 && value === 0
  );

  return alphaValues.length / maxPixels;
};

const mouseFunction = (mouse) => {
  // Move cursor
  const clientX = mouse.clientX ? mouse.clientX : mouse.touches[0].clientX;
  const clientY = mouse.clientY ? mouse.clientY : mouse.touches[0].clientY;
  cursor.style = `--top: ${clientY}px; --left: ${clientX}px;`;
  // Scratch
  cursor2.style = `bottom: ${clientY - (140 * 0.474) / 2 - 20}px; --left: ${document.body.clientWidth - (clientX + (140 * 0.474) * 1.457) + ((140 * 0.474) * 1.457)}px;`;
  // Scratch
  const canvasPosition = canvas.getBoundingClientRect();
  const canvasX = clientX - canvasPosition.left;
  const canvasY = clientY - canvasPosition.top;

  const canvasXinvert = document.body.clientWidth - (clientX + (140 * 0.474) * 1.457) + ((140 * 0.474) * 1.457);
  const canvasYinvert = document.body.clientHeight - (clientY + 140 * 0.474) + (140 * 0.474) - 20;

  if (canvasX > 0 && canvasX < width && canvasY > 0 && canvasY < height) {

    if(window.matchMedia("(max-width: 742px)").matches) {
      ctx.clearRect(canvasX - 10, canvasY - 10, 20, 20);
      ctx.clearRect(canvasXinvert - 10, canvasY - 10, 30, 20);
    } else {
      ctx.clearRect(canvasX - 20, canvasY - 20, 40, 40);
      ctx.clearRect(canvasXinvert - 20, canvasY - 20, 40, 40);
    }


  }
};

// In a real life example you should throttle these
window.addEventListener("mousemove", mouseFunction);
window.addEventListener("touchmove", mouseFunction);



$(function(){
  var doc = $(document),
    body = $("body"),
    docWidth = doc.width(),
    docHeight = doc.height(),
    horiz = 0,
    vert = 0,
    x,
    y,
    range = 30;
  
  /*console.log("docWidth: "+docWidth);
  console.log("docHeight: "+docHeight);
  console.log("range: "+range);*/
  
  function noTransition() {
    body.removeClass("transition-reset"); //addClass("notransition");
  }
  
  function followMouse() {
    horiz = ((range*2)*(x / docWidth))-range;
    vert = -(((range*2)*(y / docHeight))-range);
    $("#logo").css("transform", "rotateX(" + vert + "deg) rotateY(" +horiz + "deg)");
    noTransition();
  }
  
  function reset() {
    body.removeClass("notransition").addClass("transition-reset");
    $("#logo").css("transform", "");  
  }
  
  
  doc.mousemove(function(e){
    x = e.pageX;
    y = e.pageY;
  });
  
  doc.mousemove($.throttle(50,followMouse));


  window.addEventListener("touchmove", function(mouse){
    x = mouse.clientX ? mouse.clientX : mouse.touches[0].clientX;
    y = mouse.clientY ? mouse.clientY : mouse.touches[0].clientY;
  });

  window.addEventListener("touchmove", $.throttle(50,followMouse));  


  doc.on({
    mouseleave : function(){ reset(); },
    mousedown : function(){ reset(); }
  });
    
  });
  
  /*
   * jQuery throttle / debounce - v1.1 - 3/7/2010
   * http://benalman.com/projects/jquery-throttle-debounce-plugin/
   * 
   * Copyright (c) 2010 "Cowboy" Ben Alman
   * Dual licensed under the MIT and GPL licenses.
   * http://benalman.com/about/license/
   */
  (function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);