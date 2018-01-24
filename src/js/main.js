$( document ).ready(function() {

    $(function() {
        $('select').selectric();
    });

//движения фона в шапке
    var currentX = '';
    var currentY = '';
    var movementConstant = .015;
    $(document).mousemove(function(e) {
        if(currentX == '') currentX = e.pageX;
        var xdiff = e.pageX - currentX;
        currentX = e.pageX;
        if(currentY == '') currentY = e.pageY;
        var ydiff = e.pageY - currentY;
        currentY = e.pageY;
        $('.parallax div').each(function(i, el) {
            var movement = (i + 1) * (xdiff * movementConstant);
            var movementy = (i + 1) * (ydiff * movementConstant);
            var newX = $(el).position().left + movement;
            var newY = $(el).position().top + movementy;
            $(el).css('left', newX + 'px');
            $(el).css('top', newY + 'px');
        });
    });


//timeline
    (function() {
        'use strict';
        // define variables
        var items = document.querySelectorAll(".timeline li");
        // check if an element is in viewport
        // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        function callbackFunc() {
            for (var i = 0; i < items.length; i++) {
                if (isElementInViewport(items[i])) {
                    items[i].classList.add("in-view");
                }
            }
        }

        // listen for events
        window.addEventListener("load", callbackFunc);
        window.addEventListener("resize", callbackFunc);
        window.addEventListener("scroll", callbackFunc);

    })();



//открытие модального окна
    $('#myModal').on('shown.bs.modal', function () {
        // $('#myInput').focus()
    });


//форма
//
//     $('.toggle').on('click', function() {
//         $('.container1').stop().addClass('active');
//     });
//
//     $('.close').on('click', function() {
//         $('.container1').stop().removeClass('active');
//     });


//плавый скролл
    $("#menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

//Аякс отправка форм

    /*var oldUrl = window.location.pathname;
    var path = oldUrl.split('/');
    var message = "Спасибо! Наш специалист свяжется с вами в ближайшее время.";
        if (!!~['en'].indexOf(path[1])) {
           message = "Thank you! We will contact you to discuss the project";
        }*/

    //Документация: http://api.jquery.com/jquery.ajax/
    $("#callback-form").submit(function() {
        var str =   $("#Phone").val();
        var found = str.match(/(?:\w)(?:(?:(?:(?:\+?3)?8\W{0,5})?0\W{0,5})?[34569]\s?\d[^\w,;(\+]{0,5})?\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d(?!(\W?\d))/)

        if (found !== null) {
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: $("#callback-form").serialize()
            }).done(function() {
                $('.modal').modal('toggle');
                setTimeout(function() {
                    //alert(message);
                    // $('#alert').css("display", "block");
                   // $("#myModal2").css("display", "block").addClass('show');
                    $('#myModal2').fadeIn();
                }, 700);
            });
        }
        else {
            $('#errorMessage').css("display","block");
        }
        return false;
    });



    $('#open-close').show();
    $('.wrap-alert').show();

    $('#open-close').click(function(event) {
        event.preventDefault(); // Для того чтобы при нажатии на ссылку не кидало вверх
        $('.wrap-alert').slideToggle();
    });


    //Регулярные выражения на проверку телефона


    /* $( "#Phone" ).onfocus(function() {
         $(this).removeClass("bfh-phone");

     });*/


    //форма битрикса
   /* var oldUrl = window.location.pathname;
    var path = oldUrl.split('/');
    var lang = 'en';
    if (!(!!~['en'].indexOf(path[1]))) {
        // var lang = 'ru';

        (function(w,d,u,b){w['Bitrix24FormObject']=b;w[b] = w[b] || function(){arguments[0].ref=u;
                (w[b].forms=w[b].forms||[]).push(arguments[0])};
            if(w[b]['forms']) return;
            s=d.createElement('script');r=1*new Date();s.async=1;s.src=u+'?'+r;
            h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
        })(window,document,'https://wedo.bitrix24.ua/bitrix/js/crm/form_loader.js','b24form');

        b24form({"id":"12","lang":"ru","sec":"g50il2","type":"button","click":""});

    }
    else {
        (function(w,d,u,b){w['Bitrix24FormObject']=b;w[b] = w[b] || function(){arguments[0].ref=u;
                (w[b].forms=w[b].forms||[]).push(arguments[0])};
            if(w[b]['forms']) return;
            s=d.createElement('script');r=1*new Date();s.async=1;s.src=u+'?'+r;
            h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
        })(window,document,'https://wedo.bitrix24.ua/bitrix/js/crm/form_loader.js','b24form');

        b24form({"id":"6","lang":"en","sec":"1yigw2","type":"button","click":""});
    }
*/


});
