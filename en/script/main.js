$(document).ready(function() {

    if (window.matchMedia( "(min-width: 768px)" ).matches) {

        $("ul#projects li").mousemove(function(event){

            if(event.pageY > $(window).outerHeight() - $('img', this).outerHeight()){
                $('img', this).css({"top": event.pageY-$('img', this).outerHeight()+3, "left": event.pageX+3, "display": "block"}); 
            } else {
                $('img', this).css({"top": event.pageY+3, "left": event.pageX+3, "display": "block"}); 
            }

            $(this).mouseleave(function(){
                $('img', this).hide(); 
            });

        });

        $("body#home").mousemove(function(e){
            
            $('.axis').show();
$('.axis#x').css({"top": e.pageY + 3});
$('.axis#y').css({"left": e.pageX + 3});


        });

        $(function(){
            $( "img.movel" ).draggable();
        });

    }

    var ano = new Date().getFullYear();

    $( "header#index h1" ).text($( "header#index h1" ).text() + ano);
    $( "body:not(#home) footer").find("h1:last").text($( "footer").find("h1:last").text() + ano);

});
