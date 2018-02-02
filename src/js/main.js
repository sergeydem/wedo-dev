$( document ).ready(function() {
//------------OWL
    $('.owl-carousel').owlCarousel({
        nav: false,
        dots: true,
        responsive:{
            0:{
                loop: true,
                items: 1
            },
            600:{
                margin: 10,
                loop: true,
                items: 2
            },
            1000:{
                dots: false,
                margin: 10,
                loop: false,
                items: 3,
                mouseDrag: false,
                touchDrag: false,
                pullDrag: false
            }
        }
    });

//------------PARALLAX
    $(window).scroll(function () {
        $("header").css("background-position","50% " + (-$(this).scrollTop() / 2) + "px");
    });
//------------END PARALLAX


//-------------- HOVER BUTTON
    $(".table-container-footer .btn-pink").each(function (index, elem) {
        var elemIndex = index + 2;
        var _this = $(this);
        _this.hover(function(){
            $(".table-container-body tr td:nth-of-type(" + elemIndex + ")").css({"background-color": "rgba(68,125,152,.07)",  "transition": "all 0.3s ease-in"});
        },function(){
            $(".table-container-body tr td:nth-of-type(" + elemIndex + ")").css({"background-color": "transparent",  "transition": "all 0.3s ease-in"});
        }).click(function () {
            $(".table-container-body tr td").each(function () {
               if ($(this).hasClass( "clicked" )) $(this).removeClass("clicked")
            });

            $(".table-container-body tr td:nth-of-type(" + elemIndex + ")").addClass("clicked");
        });
    });




//-------------------TABS
// ----------------- Variables

    wrapper   = $(".tabs");
    tabs      = wrapper.find(".tab");
    tabToggle = wrapper.find(".tab-toggle");

// ----------------- Functions

    function openTab() {
        var content     = $(this).parent().next(".content"),
            activeItems = wrapper.find(".active");

        if(!$(this).hasClass('active')) {
            $(this).add(content).add(activeItems).toggleClass('active');
            wrapper.css('min-height', '400px' );
        }
    };

// ----------------- Interactions

    tabToggle.on('click', openTab);

    tabToggle.first().trigger('click');

// ----------------- Constructor functions

//-----------------END TABS


    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });



    $(function() {
        $('select').selectric();
    });


//открытие модального окна
    $('#myModal').on('shown.bs.modal', function () {
        // $('#myInput').focus()
    });



//плавый скролл
    $("#menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

//Аякс отправка форм


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


    //TABLE---------------------------------------------------------
    var $body = $(".table-container-body"),
        $header = $(".table-container-header"),
        $footer = $(".table-container-footer");

// Get ScrollBar width(From: http://bootstrap-table.wenzhixin.net.cn/)
    var scrollBarWidth = (function () {
        var inner = $('<p/>').addClass('fixed-table-scroll-inner'),
            outer = $('<div/>').addClass('fixed-table-scroll-outer'),
            w1, w2;
        outer.append(inner);
        $('body').append(outer);
        w1 = inner[0].offsetWidth;
        outer.css('overflow', 'scroll');
        w2 = inner[0].offsetWidth;
        if (w1 === w2) {
            w2 = outer[0].clientWidth;
        }
        outer.remove();
        return w1 - w2;
    })();

// Scroll horizontal
    $body.on('scroll', function () {
        $header.scrollLeft($(this).scrollLeft());
        $footer.scrollLeft($(this).scrollLeft());
    });

// Redraw Header/Footer
    var redraw = function() {
        var tds = $body.find("> table > tbody > tr:first-child > td");
        tds.each(function (i) {
            var width = $(this).innerWidth(),
                lastPadding = (tds.length -1 == i ? scrollBarWidth : 0);
            lastHeader = $header.find("th:eq("+i+")").innerWidth(width + lastPadding);
            lastFooter = $footer.find("th:eq("+i+")").innerWidth(width + lastPadding);
        });
    };

// Selection
    $body.find("> table > tbody > tr > td").click(function(e) {
        $body.find("> table > tbody > tr").removeClass("info");
        $(e.target).parent().addClass('info');
    });

// Listen to Resize Window
    $(window).resize(redraw);
    redraw();

    //END TABLE---------------------------------------------------------

// Insert price into labels
    var masPrice = [
        {price: allOptions.main.light.price},
        {price: allOptions.main.medium.price},
        {price: allOptions.main.premium.price}
    ];

    $(".table-container-footer .price").each(function (index) {
        $(this).text('$'+ masPrice[index].price);
    });
    $(".tab-content .price").each(function (index) {
        $(this).find('p').text('$'+ masPrice[index].price);
    });

    // calculating total price and total time:
    var checkBoxes =  $('input[type=checkbox]');
    var options = {} ;
    var totalPrice ;
    var basePrice    = allOptions.main.light.price ;
    var optionsPrice = 0 ;

    var totalTime;
    var baseTime    = allOptions.main.light.time  ;
    var optionsTime = 0 ;
    var tariffName ;


    $('[id="light"]').click(function(){
        basePrice = allOptions.main.light.price;
        baseTime  = allOptions.main.light.time;
        updateTariff(this.id);
        checkBoxes.change();
    });

    $('[id="medium"]').click(function(){
        basePrice = allOptions.main.medium.price;
        baseTime  = allOptions.main.medium.time;
        checkBoxes.change();
        updateTariff(this.id);
    });

    $('[id="premium"]').click(function(){
        basePrice = allOptions.main.premium.price;
        baseTime  = allOptions.main.premium.time;
        checkBoxes.change();
        updateTariff(this.id);
    });

    $('#modalBtn').click(function () {
        checkBoxes.change();
    });


    checkBoxes.change(function() {
        optionsPrice = 0;
        optionsTime = 0 ;
        $('input[type=checkbox]').each(function () {
            if (this.checked) {
                options[this.id] = this.name;
                optionsPrice += allOptions['options'][this.id]['price'];
                optionsTime  += allOptions['options'][this.id]['time']
            }else{
                if (typeof options[this.id] !== 'undefined') {
                    delete options[this.id];
                }
            }
        });

        totalPrice = parseInt(basePrice) + parseInt(optionsPrice) ;
        totalTime  = parseInt(baseTime)  + parseInt(optionsTime)  ;

        updateTotalPriceAndTime(totalPrice,totalTime);
        // update form data :
        updateFormOptions(options);
    });

    function updateTotalPriceAndTime(totalPrice,totalTime){
        // set price and time for the page :
        $('#totalPrice').html('$'+totalPrice);
        $('#totalPriceForm').html('$'+totalPrice);
        var time = 'месяца' ;
        if(totalTime == 1 ){
            time = 'месяц';
        }else if(totalTime>4){
            time = 'месяцев' ;
        }

        // set time and price on the form :
        $('#totalTime').html(totalTime+' '+time);
        $('#totalTimeForm').html(totalTime+' '+time);

        // change the value of the input field in the form :
        $('#input-cost').val('$'+totalPrice);
        $('#input-date').val(totalTime+' '+time);

    }

    /* Записать данные, которые выбрал пользователь на форме */

    function updateFormOptions(options){
        var arrValues = Object.values(options);
        var additionalOptions =  $('#additionalOptions');
        additionalOptions.html('- ');
        additionalOptions.append(arrValues.join('<br/>- '));

        // options input value :
        $('#input-options').val(arrValues);
    }

    function updateTariff(id){
        // update tariff on the form
        tariffName = $('#'+id).attr('name');
        $('#mainTariff').html(tariffName);

        // tariff input value :
        $('#input-tariff').val(tariffName);
    }





    /*Animation*/
    $("#cost, #feature, #why-us, #promotion").animated("slideInUp", "slideOutUp");
    $(".options, .wrap-cost, .home-button").animated("slideInUp", "slideOutUp");


});


// $(window).load(function() {
//
//     $(".title-center h1").animated("slideInUp", "slideOutUp");
//
// });