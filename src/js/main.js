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
                items: 3
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
        $(this).hover(function(){
            $(".table-container-body tr td:nth-of-type(" + elemIndex + ")").css({"background-color": "rgb(160, 198, 216)",  "transition": "all 0.3s ease-in"});
        },function(){
            $(".table-container-body tr td:nth-of-type(" + elemIndex + ")").css({"background-color": "transparent",  "transition": "all 0.3s ease-in"});
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
            wrapper.css('min-height', content.outerHeight());
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

    // calculating total price and total time:

    var totalPrice;
    var basePrice    = 0 ;
    var optionsPrice = 0 ;

    var totalTime;
    var baseTime    = 0 ;
    var optionsTime = 0 ;

    $('#light').click(function(){
        basePrice = prices.mainPrices.light ;
        baseTime  = times.mainTimes.light ;
        $('input[type=checkbox]').change();
    });

    $('#medium').click(function(){
        basePrice = prices.mainPrices.medium  ;
        baseTime  = times.mainTimes.medium ;
        $('input[type=checkbox]').change();
    });
    $('#premium').click(function(){
        basePrice = prices.mainPrices.premium  ;
        baseTime  = times.mainTimes.premium ;
        $('input[type=checkbox]').change();
    });




    $('input[type=checkbox]').change(function() {
        optionsPrice = 0;
        optionsTime = 0 ;
        $('input[type=checkbox]').each(function () {
            if (this.checked) {
                optionsPrice += prices['optionsPrices'][this.id];
                optionsTime  += times['optionsTimes'][this.id];
            }
        });

        totalPrice = parseInt(basePrice) + parseInt(optionsPrice) ;
        totalTime  = parseInt(baseTime)  + parseInt(optionsTime)  ;

        updateTotalPriceandTime(totalPrice,totalTime);
    });



    function updateTotalPriceandTime(totalPrice,totalTime){
        $('#totalPrice').html('$'+totalPrice);
        $('#totalTime').html(totalTime+'Месяца');
    }




});