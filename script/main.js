$(document).ready(function() {

    if (window.matchMedia( "(min-width: 768px)" ).matches) {

        $("ul#projects li").mousemove(function(){

            if(event.pageY > $(window).outerHeight() - $('img', this).outerHeight()){
                $('img', this).css({"top": event.pageY-$('img', this).outerHeight()-2, "left": event.pageX+2, "display": "block"}); 
            } else {
                $('img', this).css({"top": event.pageY+2, "left": event.pageX+2, "display": "block"}); 
            }

            $(this).mouseleave(function(){
                $('img', this).hide(); 
            });

        });

        $(function(){
            $( "img.movel" ).draggable();
        });

    }

    var ano = new Date().getFullYear();

    $( "header#index h1" ).text($( "header#index h1" ).text() + ano);
    $( "body:not(#home) footer").find("h1:last").text($( "footer").find("h1:last").text() + ano);

});
