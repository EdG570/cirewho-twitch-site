<?php
  if (isset($_POST['send'])) {
    $to = 'cole570@hotmail.com';
    $subject = 'Feedback from my site';
  }

  $message = 'Name: ' . $_POST['user_name'] . "\r\n\r\n";
  $message = 'Email: ' . $_POST['user_email'] . "\r\n\r\n";
  $message = 'Message: ' . $_POST['user_message'];

  echo $message;
?>

<h1>Thank you!</h1>
<h3>Your email has been sent.</h3>