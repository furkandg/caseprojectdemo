<?php

/**
 * Akismet
 * @author alex
 */
class ctAkismet
{
    /**
     * API KEY
     * @var string
     */

    protected $key;

    public function __construct($key)
    {
        $this->key = $key;
    }

    public function isSpam($site, $authorName, $authorEmail, $content)
    {
        $data = array(
                'blog' => $site,
                'user_ip' => isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null,
                'user_agent' => isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : null,
                'referrer' => isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : null,
                'comment_author' => $authorName,
                'comment_author_email' => $authorEmail,
                'comment_content' => $content
        );

        return $this->checkComment($data);
    }

    protected function checkComment($data)
    {
        $request = 'blog=' . urlencode($data['blog']) .
                '&user_ip=' . urlencode($data['user_ip']) .
                '&user_agent=' . urlencode($data['user_agent']) .
                '&referrer=' . urlencode($data['referrer']) .
                '&comment_author=' . urlencode($data['comment_author']) .
                '&comment_author_email=' . urlencode($data['comment_author_email']) .
                '&comment_content=' . urlencode($data['comment_content']);
        $host = $http_host = $this->key . '.rest.akismet.com';
        $path = '/1.1/comment-check';
        $port = 80;
        $akismet_ua = "WordPress/3.8.1 | Akismet/2.5.9";
        $content_length = strlen($request);
        $http_request = "POST $path HTTP/1.0\r\n";
        $http_request .= "Host: $host\r\n";
        $http_request .= "Content-Type: application/x-www-form-urlencoded\r\n";
        $http_request .= "Content-Length: {$content_length}\r\n";
        $http_request .= "User-Agent: {$akismet_ua}\r\n";
        $http_request .= "\r\n";
        $http_request .= $request;
        $response = '';
        if (false != ($fs = @fsockopen($http_host, $port, $errno, $errstr, 10))) {

            fwrite($fs, $http_request);

            while (!feof($fs)) {
                $response .= fgets($fs, 1160);
            } // One TCP-IP packet
            fclose($fs);

            $response = explode("\r\n\r\n", $response, 2);
        }

        if ('true' == $response[1]) {
            return true;
        } else {
            return false;
        }
    }
}
