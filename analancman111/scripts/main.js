$( document ).ready(function() {

var strokeCor = '#85c3d5';
var blurCor = '#70a5b4';
var bgCor = '#d4fbff';

	function colorValues(color)
{
    if (color === '')
        return;
    if (color.toLowerCase() === 'transparent')
        return [0, 0, 0, 0];
    if (color[0] === '#')
    {
        if (color.length < 7)
        {
            // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
            color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
        }
        return [parseInt(color.substr(1, 2), 16),
            parseInt(color.substr(3, 2), 16),
            parseInt(color.substr(5, 2), 16),
            color.length > 7 ? parseInt(color.substr(7, 2), 16)/255 : 1];
    }
    if (color.indexOf('rgb') === -1)
    {
        // convert named colors
        var temp_elem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
        var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
        temp_elem.style.color = flag;
        if (temp_elem.style.color !== flag)
            return; // color set failed - some monstrous css rule is probably taking over the color of our object
        temp_elem.style.color = color;
        if (temp_elem.style.color === flag || temp_elem.style.color === '')
            return; // color parse failed
        color = getComputedStyle(temp_elem).color;
        document.body.removeChild(temp_elem);
    }
    if (color.indexOf('rgb') === 0)
    {
        if (color.indexOf('rgba') === -1)
            color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
        return color.match(/[\.\d]+/g).map(function (a)
        {
            return +a
        });
    }
}


	jQuery.fn.outerHTML = function() {
		return jQuery('<div />').append(this.eq(0).clone()).html();
	  };

	if(window.matchMedia("(max-width: 641px)").matches){
if(!$('#filtro .menulinks li:first-child').hasClass("linkativo")){

	linkativoHtml = $('#filtro .menulinks').find('.linkativo').outerHTML();
	$('#filtro .menulinks').find('.linkativo').remove();
	$('#filtro .menulinks').prepend(linkativoHtml);

}

		$('.linkativo').prepend("<span class='detcirculo'></span>");

		$('.menuprincipal').click(function(){
			var $not = $(this).find('ul');
			$('ul.menulinks').not($not).children().not('li:first-child').fadeOut(300);
			$('ul.menulinks').not($not).find('.detcirculo').hide();


			$(this).find('li:first-child').siblings().each(function(i){
				$(this).delay(150*i).fadeToggle(400, function(){

					$(this).parent().find('.detcirculo').each(function(){

						$(this).fadeToggle(200);
						locLinkAtivo = $( this ).parent().position().top + $( this ).parent().height() /  2 ;
						locLinkAtivoPorcento = scale(locLinkAtivo, 0, $(this).parents('ul').height(), 0, 100 );
						$( this ).css({ 'top' : locLinkAtivoPorcento + '%' });
						
					});

				});

				

			});
						
					});
					

	} else {
	$('.linkativo').each(function(){ 
		locLinkAtivo = $( this ).position().left + $( this ).width() /  2 ;
		locLinkAtivoPorcento = scale(locLinkAtivo, 0, $(this).parent().width(), 0, 100 );
		$( this ).prepend("<span class='detcirculo'></span>");
		$( this ).find('.detcirculo').css({ 'left' : locLinkAtivoPorcento + '%' });
	});
}

function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var canvas = document.getElementById("espiral");
	canvas.width = window.innerWidth;     
	canvas.height = window.innerHeight;
	
	var ctx = canvas.getContext("2d");
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var stepsMouse = 20;
	var gapMouse = 10;
	var tempoEspiral = -6000;
	document.onmousemove = function(e){
		cursorX = e.pageX;
		cursorY = e.pageY;
		gapMouse = scale(e.pageY, 0, $(window).height(), 9, 20);
		 stepsMouse = scale(e.pageX, 0, $(window).width(), 5, 25);
	}

	ctx.lineWidth = .35;

	function drawSpiral(time) {
		ctx.globalCompositeOperation = "lighter"; 
		var angOff, gap, steps, increment, theta, newX, newY;
		angOff = time / tempoEspiral;
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		gap = gapMouse;
		steps = stepsMouse;
		increment = 2 * Math.PI / steps;
		theta = increment;

		while (theta < 20 * Math.PI) {
			newX = centerX + theta * Math.cos(theta + angOff) * gap;
			newY = centerY + theta * Math.sin(theta + angOff) * gap;
			//ctx.lineTo(newX, newY);
			//ctx.arc(newX, newY, 10, 0, 2 * Math.PI);
			// ESTILO 1 
	
			ctx.strokeStyle = strokeCor;
			ctx.fillStyle = strokeCor;
			ctx.shadowBlur = 4;
			ctx.shadowColor = blurCor;
			ctx.roundRect(newX-1.5, newY-1.5, 3, 3, 1);

			


		/*
		ctx.fillStyle = 'rgb(' + colorValues(bodyColor)[0]+10 + ', ' + colorValues(bodyColor)[1] +10+ ', ' + colorValues(bodyColor)[2]+10 + ')';
		ctx.fill();
		bodyColor = $('body').css( "background-color" );
		ctx.strokeStyle = 'rgb(' + colorValues(bodyColor)[0]+100 + ', ' + colorValues(bodyColor)[1] +10+ ', ' + colorValues(bodyColor)[2]+10 + ')';
		*/

		/* ESTILO 2 
		ctx.fillStyle = "white";
ctx.fill();
ctx.roundRect(newX-5, newY-5, 10, 10, 10);
ctx.shadowBlur = .5;
		ctx.shadowColor = '#000';
		*/
		
			theta = theta + increment;
		}
		
//ctx.stroke();
ctx.fill();
		
	}
	function update(time) { // called by browser through requestAnimationFrame
		// time is the current time in milliseconds
	
		// clear the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	
		// draw the spiral animating via the time
		drawSpiral(time);
	
		// this gets the next animation frame
		// that is in sync with the browsers rendering and
		// will keep in sync with the screen refresh so you dont
		// get any shearing
		requestAnimationFrame(update); //' request next animation frame
	}
	// start the animation
	requestAnimationFrame(update);


function fundo() {
xColor = scale(event.pageX, 0, $( window ).width(), 0, 315);
		yColor = scale(event.pageY, 0, $( window ).height(), 50, 80);
		bgCor = 'hsl(' + xColor + ',' + yColor + '%, 90%)';
		strokeCor = 'hsl(' + xColor + ',' + yColor + '%, 65%)';
		blurCor = 'hsl(' + xColor + ',' + yColor + '%, 35%)';

		$('body#mapa').css({ 'background-color' : bgCor });
	}

	function numerosTexto() {
		$('.mapadetalhes.horizontal .detposicao h3').text(randomNum(0, $( document ).width()) + 'º');
		$('.mapadetalhes.vertical .detposicao h3').text(randomNum(0, $( document ).height()) + 'º');
	}

	$( document ).mousemove(function(event){
		fundo();
		numerosTexto();

		if (event.pageX > $(window).width()/2 - 50 && event.pageX < $(window).width()/2 + 50 && event.pageY > $(window).height()/2 - 50 && event.pageY < $(window).height()/2 + 50) {
			

		} else {
			tempoEspiral = -6000;
		}
	});


	$(' ol.links li ').each(function(){
		randLiX = randomNum(0, ($(this).parent().width() - $(this).children().width())*100 / $(this).parent().width());
		$(this).css({ "margin-left" : randLiX + '%' });
	});

	$(' ol.links li ').hover(function(){
		$(this).find('img').toggle(300);
	});	

if(window.matchMedia("(max-width: 641px)").matches){
	if(!window.matchMedia("(pointer: coarse)").matches) {
	
	$('.menulinks li:not(.linkativo)').mouseenter(function(){
		locLinkMenu =  $(this).position().top + $(this).height()/2;
		locLinkAtivoPorcento = scale(locLinkMenu, 0, $(this).parent().height(), 0, 100 );
		
				$(this).parents('ul').find('.detcirculo').stop().animate({ top : locLinkAtivoPorcento + '%' }, 400);
		
			});
		
			$('.menulinks li:not(.linkativo)').mouseleave(function(){
				locLinkMenu =  $(this).position().top + $(this).height()/2;
				locLinkAtivo = $( this ).parent().find('.linkativo').position().top +  $( this ).parent().find('.linkativo').height() /  2 ;
				
				locLinkAtivoPorcento = scale(locLinkAtivo, 0, $( this ).parent().height(), 0, 100);
		
						$(this).parents('ul').find('.detcirculo').stop().animate({ top : locLinkAtivoPorcento + '%' }, 300);
					});
				}

} else {

	$('.menulinks li:not(.linkativo)').mouseenter(function(){
locLinkMenu =  $(this).position().left + $(this).width()/2;
locLinkAtivoPorcento = scale(locLinkMenu, 0, $(this).parent().width(), 0, 100 );

		$(this).parents('ul').find('.detcirculo').stop().animate({ left : locLinkAtivoPorcento + '%' }, 400);

	});

	$('.menulinks li:not(.linkativo)').mouseleave(function(){
		locLinkMenu =  $(this).position().left + $(this).width()/2;
		locLinkAtivo = $( this ).parent().find('.linkativo').position().left +  $( this ).parent().find('.linkativo').width() /  2 ;
		
		locLinkAtivoPorcento = scale(locLinkAtivo, 0, $( this ).parent().width(), 0, 100);

				$(this).parents('ul').find('.detcirculo').stop().animate({ left : locLinkAtivoPorcento + '%' }, 300);
			});
		}



		$(window).scroll(function(){

			if ($(document).scrollTop() >= 50) {
				if(window.matchMedia("(max-width: 641px)").matches){
					$('ul.menulinks').each(function(){
						$(this).children().not(':first').fadeOut(300);
						$(this).find('.detcirculo').fadeOut(200);
					});
			  }
			}

			calcRolagem = scale($(document).scrollTop(), 0, $(document).height() - $(window).height(), .5, 99);
			
			if (calcRolagem < 100) {
				$('.barrarolagem .detcirculo').css({ 'top' : calcRolagem + '%' });
			} 

			$('.barrarolagem .detcirculo').css({ 'top' : calcRolagem + '%' });

		});


		/* EM PROGRESSO */
		$('#expandirfiltro').click(function(){
$('.catlinks li').each(function(i){
$(this).delay(100*i).fadeIn(1);
});
		});
});