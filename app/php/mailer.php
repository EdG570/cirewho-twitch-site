<?php
  $to = 'cole570@hotmail.com';

  $subject = "New Mail from CIREWHO";

  $first_name = $_REQUEST['userFirstName'];
  $last_name = $_REQUEST['userLastName'];
  $full_name = $first_name." ".$last_name;
  $email = $_REQUEST['user_email'];
  $message = $_REQUEST['user_message'];

  $msg_body = "Name: " . $full_name . "\r\n";
  $msg_body .= "\r\n";
  $msg_body .= "Email: " . $email . "\r\n";
  $msg_body .= "\r\n";
  $msg_body .= "Message: " . $message . "\r\n";

  $SpamErrorMessage = "No URLs are permitted";

  if (preg_match("/http/i", "$full_name")) { 
    echo "$SpamErrorMessage"; exit(); 
  }
  if (preg_match("/http/i", "$email")) { 
    echo "$SpamErrorMessage"; exit(); 
  }
  if (preg_match("/http/i", "$message")) { 
    echo "$SpamErrorMessage"; exit(); 
  }

  mail( $to, $subject, $msg_body );

  if ( mail( $to, $subject, $msg_body ) ) {
        header("Location: /thanks.html");
  } else {
        header("Location: http://jenmertz.com/error.html");
  }

  exit();

?>