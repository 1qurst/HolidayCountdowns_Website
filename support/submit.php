<?php
// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Sanitize user input to prevent XSS attacks
  $name = htmlspecialchars($_POST["name"]);
  $email = htmlspecialchars($_POST["email"]);
  $subject = htmlspecialchars($_POST["subject"]);
  $message = htmlspecialchars($_POST["message"]);
  
  // Validate email
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<p>Please enter a valid email address.</p>";
    exit();
  }

  // Process file uploads
  $uploadDir = "uploads/"; // Directory for file uploads
  $uploadedFiles = [];
  foreach ($_FILES["attachments"]["tmp_name"] as $key => $tmpName) {
    $fileName = basename($_FILES["attachments"]["name"][$key]);
    $targetPath = $uploadDir . $fileName;
    if (move_uploaded_file($tmpName, $targetPath)) {
      $uploadedFiles[] = $targetPath;
    } else {
      echo "<p>Failed to upload file: $fileName</p>";
    }
  }

  // Send email with form data
  $to = "support@holidaycountdowns.xyz";
  $from = $email;
  $headers = "From: $from";
  $messageBody = "Name: $name\n";
  $messageBody .= "Email: $email\n";
  $messageBody .= "Subject: $subject\n";
  $messageBody .= "Message: $message\n";
  foreach ($uploadedFiles as $file) {
    $messageBody .= "Attachment: $file\n";
  }

  // Debugging: Print email content to screen
  echo "<p>To: $to</p>";
  echo "<p>Subject: $subject</p>";
  echo "<p>Headers: $headers</p>";
  echo "<p>Message: $messageBody</p>";

  // Attempt to send email
  if (mail($to, $subject, $messageBody, $headers)) {
    echo "<p>Thank you! Your support request has been submitted successfully.</p>";
  } else {
    echo "<p>Failed to submit your support request. Please try again later.</p>";
  }
}
?>
