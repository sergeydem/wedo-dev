<?php
/**
 * Created by PhpStorm.
 * User: korns
 * Date: 19.09.2017
 * Time: 12:05
 */


class Telegram {
    protected $token;
    protected $api = "https://api.telegram.org/bot";
    protected $idChat;

    public function __construct($idChat = '-273748238'){
        $this->token = '482639937:AAG9_aTPp05xQ5NTilu0PIG4TtFjaBjTuLA';
        $this->api .= $this->token;
        $this->idChat = $idChat;
    }

    protected function getUrl($command, array $params= []) {
        $res = $this->api . '/' . $command;
        if (!empty($params)) {
            $res .= '?' . http_build_query($params);
        }
        return $res;
    }
    protected function getResult($command, array $params= []) {
        try {
            return file_get_contents($this->getUrl($command, $params));
        } catch (Exception $e) {
            return '';
        }
    }

    public function setIdChat($idChat) {
        $this->idChat = $idChat;
    }
    public function sendMessage($message) {
        $dataGet = array(
            'chat_id' => $this->idChat,
            'text' => $message,
            'parse_mode' => 'HTML',
        );
        return $this->getResult('sendMessage', $dataGet);
    }
    public function getUpdates() {
        return $this->getResult('getUpdates');
    }
}