<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$config = Array(
    'protocol' => 'smtp',
    'smtp_host' => 'gmail.com', //your smtp host
    'smtp_port' => 21, //default port smtp
    'smtp_user' => 'name@domain.com',
    'smtp_pass' => 'password',
    'mailtype' => 'html',
    'charset' => 'iso-8859-1',
    'wordwrap' => TRUE
);

$name = '';
$email = '';
$message = '';
$error_msg = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    function died($error)
    {

        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error . "<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }

    if (empty($_POST['name']) && empty($_POST['email']) && empty($_POST['message'])) {
        echo "Molim popunite sva polja ^_^ ";
        return;
    } else {

        if (empty($_POST['name'])) {

            echo "Molim popunite ";
            return;

        } else {
            $name = $_POST['name'];

        }

        if (empty($_POST['email'])) {
            echo "Molim popunite ";
            return;

        } else {
            filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
        }


        if (empty($_POST['message'])) {

            echo "Molim popunite ";
            return;

        } else {
            $message = $_POST['message'];
        }
    }

    $email_from = 'Personal website';
    $email_subject = 'New message on your website!';
    $email_body = "User name: $name.\n" .
        "User email: $email.\n" .
        "User message: $message.\n";

    $to = 'lucyborntodie@gmail.com';
    $headers = 'From: ' . $email_from . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    mail($to, $email_subject, $email_body, $headers);
    echo "Hvala što ste ostavili svoj komentar " . $name;

    //unset($_POST['submit']);


}
