<?php


if((isset($_POST['Username'])&&$_POST['Username']!="")&&(isset($_POST['Phone'])&&$_POST['Phone']!="")&&(isset($_POST['select'])&&$_POST['select']!="")){//Проверка отправилось ли наше поля name и не пустые ли они
    $to = 'sergeydem24@gmail.com'; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = 'Обратная связь с сайта WeDo'; //Загаловок сообщения
    $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$_POST['Username'].'</p>
                        <p>Телефон: '.$_POST['Phone'].'</p>
                        <p>Вопрос: '.$_POST['select'].'</p>
                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
    $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $send = mail($to, $subject, $message, $headers);

    $message = '<b>Имя: </b>'.$_POST['Username'] . "\n";
    $message .= '<b>Фамилия: </b>'.$_POST['Phone'] . "\n";
    $message .= '<b>Вопрос: </b>'.$_POST['select'] . "\n";

    require 'Telegram.php';
    $tg = new Telegram();
    $tg->sendMessage($message);
}
?>