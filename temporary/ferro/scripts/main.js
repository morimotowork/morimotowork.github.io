$(document).ready(function () {

function scale (number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    var getRand = (function() {
        var nums = [0,1,2,3,4,5];
        var current = [];
        function rand(n) {
            return (Math.random() * n)|0;
        }
        return function() {
          if (!current.length) current = nums.slice();
          return current.splice(rand(current.length), 1);
        }
    }());

    

$(document).mousemove(function(e){
    if(window.matchMedia("(min-width:1024px)").matches){
    $('.grid-bola').show();

    var xBola = scale(e.pageX, 0, $(document).width(), 0, 6);

    var divyBola = parseInt($(document).height() / ($(document).width() / 6));
    var yBola = scale(e.pageY, 0, $(document).height(), 0, divyBola);

    document.documentElement.style.setProperty('--mapleftbola', parseInt(xBola));

    if(e.pageY > ($(document).width() / 6) * divyBola) {
    document.documentElement.style.setProperty('--maptopbola', divyBola);
    } else {
    document.documentElement.style.setProperty('--maptopbola', parseInt(yBola));
    }
}
});

$(document).mouseleave(function () {
    if(window.matchMedia("(min-width:1024px)").matches){
    $('.grid-bola').hide();
    }
});

if(!window.matchMedia("(min-width:1024px)").matches){

        $('.grid-bola').click(function(){
            $(this).addClass('hide');
        });

        $('#sobre').click(function(){

            if($('main').hasClass('sobre-aberto')) {
                $('.grid-bola').removeClass('hide');
            }

        });
        

    }

$('#sobre').click(function(){

    if(!$('main').hasClass('sobre-aberto')) {
        $('article.info, .wrapper-membros').scrollTop(0);
        }

    $('main').toggleClass('sobre-aberto');
    
    //RANDOMIZE LOGOS
    if( $('main').hasClass('sobre-aberto') && $('.logo-alt').hasClass('randomize') ) {
    $(".logo-alt").css("background-image", "url(imgs/logos-alt/FERRO_LogoBootleg_" + getRand() + ".svg)");
}
$('.logo-alt').addClass('randomize');
//END RANDOMIZE
});


var randLogo = '';
$('.logo-alt').mouseover(function(){

    randLogo = setInterval(function() {
    $(".logo-alt").css("background-image", "url(imgs/logos-alt/FERRO_LogoBootleg_" + getRand() + ".svg)");
}, 100);
});
    $('.logo-alt').mouseout(function() {
        clearInterval(randLogo);
});


});
