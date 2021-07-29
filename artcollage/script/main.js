/*
Script developed from scratch by Júnior MORIMOTO
Contact: morimotojunior@gmail.com
Porto, Portugal
2019
This is part of an academic project for my Communication Design graduation program at Faculty of Fine Arts [University of Porto]
*/

$( document ).ready(function() {
    

    //(Fx) BACKGROUND CHANGE RANDOMLY
    function ranBg() {
        /*
    var numB = 1;
    var imageUrl = "../imgs/back_" + Math.floor(Math.random() * numB) + ".png";
    $('body').css('background-image', 'url("' + imageUrl + '")');
    */
        var bgcolors = ["99CCFF", "FFFF99"];
        var bgcolorRan = Math.floor(Math.random() * bgcolors.length);
        $('body').css('background-color', '#' + bgcolors[bgcolorRan]);
        $('section').css('background-color', '#' + bgcolors[bgcolorRan]);
    }
    ranBg();

    var headerHeight = $('header').outerHeight();
    var fooHeight = $('footer').outerHeight();
    var secHeight = $('section#main').height();
    var secCatHeight = $('section#main_cat').height();
    var docHeight = $( document ).height();
    var matOptHeight = $('.sec2#mat_buttons').outerHeight();

    $('section#main_cat').css('max-height', docHeight - headerHeight - fooHeight);

    //(Fx) ALERTS INSIDE WEBPAGE
    var mesHeight = $('#messages').outerHeight();
    $('#messages').css('margin-top', mesHeight * -1);
    function alertHeader(message){
        $('#messages span').text(message);
        $('#messages').show(.1, function(){
            $('#messages').css('margin-top', '0px');
        });
        setTimeout(
            function(){
                mesHeight = $('#messages').outerHeight(true);
                $('#messages').css('margin-top', mesHeight * -1);
                $('#messages').delay(600).fadeOut(1);
            }, 3000);
    }


    //(Fx) MENU OPTIONS
    if (window.matchMedia("(max-width:768px)").matches) {

        window.addEventListener('orientationchange', function(){
            if (window.matchMedia("(orientation: portrait)").matches) {
                alert("For better experience, use the app in portrait mode.");
            }
        });

        $('#materials.sec').find('.sec1').click(function(){
            $('.sec#materials').css('left', '0'); 
        });

        $('#materials.sec').find('.back_option').click(function(){
            $('.sec#materials').css('left', '-50%'); 
        });

        $('#difficulty.sec').find('.sec1').click(function(){
            $('#difficulty.sec').css('left', '-50%'); 
        });

        $('#difficulty.sec').find('.back_option').click(function(){
            $('#difficulty.sec').css('left', '0'); 
        });

    } else {
        $('section#main').css('top', (docHeight - secHeight)/2);

        $('#materials.sec').mouseover(function(){
            $('section').css('left', '0'); 
        });

        $('#materials.sec').mouseleave(function(){
            $('section').css('left', '-50%'); 
        });

        $('#difficulty.sec').mouseover(function(){
            $('section').css('left', '-100%'); 
        });

        $('#difficulty.sec').mouseleave(function(){
            $('section').css('left', '-50%'); 
        });

    }

    //(Fx) SHUFFLE ARRAY FUNCTION 
    //SOURCE: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffleArr(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    //SHUFFLE CATEGORIES
    var ranCat = ["easy medium advanced",
                  "easy medium advanced", 
                  "easy medium advanced", 
                  "medium advanced",
                  "advanced",
                  "advanced"];
    ranCat = shuffleArr(ranCat);


    //(Fx) ARRAY MECHANISM TO APPEND BY TXT FILE --> 2D ARRAY
    function catArrayDef(local, i, varName){
        $.get('script/' + local + i + '.txt', function(data){
            varName[i] = data.split('\n');
        });
    }


    //(Fx) APPEND VALUES TO EACH GROUP INTO 2D ARRAY DEPENDING ON THE MODE
    var cat = []; //2D ARRAY
    var catRes = [];
    var materials = $('.sec2').find('input');

    function appCat(localC){
        //MATERIALS/RESOURCES AVAILABLE SELECTION
        //APPEND VALUES TO EACH CHECKBOX INTO 2D ARRAY
        for (var j = 0; j < $('.cat').length; j++){      
            catArrayDef('cat_arrays/' + localC + '/', j, cat);
        }

        for (var q = 0; q < materials.length; q++){      
            catArrayDef('cat_arrays/resources/' + localC + '/', q, catRes);
        }
    }


    //(Fx) MECHANISM TO ATTRIBUTE VALUES RANDOMLY IN ARRAY ACCORDING TO EACH GROUP
    function catRanValue(){
        $('.cat').find('h3').each(function(i){
            var ranCatValue = Math.floor(Math.random() * cat[i].length) + 1;
            var catText = cat[i][ranCatValue];
            $(this).text(catText);
        });
    }


    //(!!!)TO MODIFY(!!!)
    //(Fx) CHECKBOX MECHANISM TO APPEND VALUES TO CAT[]ARRAY DEPENDING ON THE USER CHOICE
    function appArrayCat(){
        materials.each(function(i){
            if ($(this).is(':checked') == true && i != 0) {

                //TO CREATE (INSIDE HERE) THE SPECIFIC CONDITIONS FOR THE EVENTS AND FOR THE ARRAY APPENDS

                catRes[i].shift(); //REMOVE THE NAME THAT I'VE PLACED IN EVERY TXT FILE IN THE FIRST POSITION

                cat[1] = $.merge(cat[1], catRes[i]);
                //cat[1] = cat[1].concat(catRes[i]);
            }
        });

        //REMOVE (FILTER) REPEATED VALUES
        //SOURCE: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
        cat[1] = cat[1].filter((v, i, a) => a.indexOf(v) == i);

    }


    //MODE SELECTION -> AFTER CLICK
    $('.sec2').find('button').click(function(){

        //CHECK MINIMUN SELECTED CHECKBOXES AND FIRST ONE (REQUIRED)
        if ($('.sec').find('input').first().is( ":checked" ) == false){

            alertHeader("Without glue and scissors?");

        } else if ($('.sec2').find('input:checked').length < 3 && $('.sec').find('input').first().is( ":checked" ) == true){ 

            var nf = 3 - $('.sec2').find('input:checked').length;
            alertHeader("Select at least " + nf + " more material(s) to create a nice combination.");


        } else {

            //HIDE USER OPTIONS CONTENT
            if (window.matchMedia("(max-width:768px)").matches) {
                $('section#main').css({'transition': 'margin-top 1.3s ease', 'margin-top': '100vh'});
            } else {
                $('section#main').css({'transition': 'top 1s ease', 'top': '100%'});
            }

            $('.sec').find('div').each(function(i){
                $(this).delay(100*(i+1)).fadeOut(700, showCat);
            });

            var tId = this.id;

            //CALL ONE FUNCTION AFTER PREVIOUS IS COMPLETE
            //SOURCE: https://stackoverflow.com/questions/5000415/call-a-function-after-previous-function-is-complete
            $.ajax({
                url:appCat(tId),
                success:function(){
                    appArrayCat();
                }
            });


            //DISPLAY CATEGORIES 
            function showCat(){
                $('.sec').hide();
                $('.sec_catg').show();

                //RANDOM CATEGORIES DEPENDING ON THE MODE
                $('.cat').each(function(i){
                    $(this).attr('class', 'cat ' + ranCat[i]);
                });

                catRanValue();

                //DISPLAY CATEGORIES (HOW TO FADE THEM ONE BY ONE?????)
                $('.' + tId).fadeIn(500).css('display', 'flex');
                /* $('.' + tId).find('div').each(function(i){
        $(this).delay(150*(i+1)).fadeIn(500).css('display', 'flex');
    });*/

            }
        }
    });

    //"TRY AGAIN" OPTION TEST
    $('.cat_options').find('h3:last-child').click(catRanValue);

});
