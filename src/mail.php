<?php


if((isset($_POST['Username'])&&$_POST['Username']!="")&&(isset($_POST['Phone'])&&$_POST['Phone']!="")&&(isset($_POST['comment'])&&$_POST['comment']!="")){//Проверка отправилось ли наше поля name и не пустые ли они
    $to = 'sergeydem24@gmail.com'; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = 'WeDo Интернет магазины обратный звонок'; //Загаловок сообщения
    $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$_POST['Username'].'</p>
                        <p>Телефон: '.$_POST['Phone'].'</p>
                        <p>Комментарий: '.$_POST['comment'].'</p>
                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
    $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $send = mail($to, $subject, $message, $headers);

    $message = '<b>Интернет магазины </b>'. "\n";
    $message .= '<b>Имя: </b>'.$_POST['Username'] . "\n";
    $message .= '<b>Фамилия: </b>'.$_POST['Phone'] . "\n";
    $message .= '<b>Комментарий: </b>'.$_POST['comment'] . "\n";

    require 'Telegram.php';
    $tg = new Telegram();
    $tg->sendMessage($message);
}

if((isset($_POST['Username-com'])&&$_POST['Username-com']!="")&&(isset($_POST['Phone-com'])&&$_POST['Phone-com']!="")){//Проверка отправилось ли наше поля name и не пустые ли они
    $to = 'sergeydem24@gmail.com'; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = 'WeDo Интернет магазины. Коммерческое предложение'; //Загаловок сообщения
    $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$_POST['Username-com'].'</p>
                        <p>Телефон: '.$_POST['Phone-com'].'</p>
                        <p>Тариф: '.$_POST['tariff'].'</p>
                        <p>Опции: '.$_POST['options'].'</p>  
                        <p>Стоимость: '.$_POST['cost-val'].'</p>
                        <p>Сроки: '.$_POST['date'].'</p>
                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
    $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $send = mail($to, $subject, $message, $headers);

    $message = '<b>Коммерческое предложение </b>'. "\n";
    $message .= '<b>Имя: </b>'.$_POST['Username-com'] . "\n";
    $message .= '<b>Фамилия: </b>'.$_POST['Phone-com'] . "\n";
    $message .= '<b>Тариф: </b>'.$_POST['tariff'] . "\n";
    $message .= '<b>Опции: </b>'.$_POST['options'] . "\n";
    $message .= '<b>Стоимость: </b>'.$_POST['cost-val'] . "\n";
    $message .= '<b>Сроки: </b>'.$_POST['date'] . "\n";

    require 'Telegram.php';
    $tg = new Telegram();
    $tg->sendMessage($message);
}
?>