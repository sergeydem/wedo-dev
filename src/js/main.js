$( document ).ready(function() {

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



});
