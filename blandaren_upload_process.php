<?php
include_once("functions_imageresize.php");
include_once("functions_common.php");

$link = connectToDB();

$pdf_dir = "images/uploads/blandaren/pdfs/";
$frontpage_dir = "images/uploads/blandaren/frontpages/";

//var_dump($_FILES);

if (isset($_FILES['pdf'], $_POST['frontpage'], $_POST['name'])) {

  $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);

  if ($_FILES['pdf']['error'] > 0) {
    echo "Det gick inte att ladda upp pdfen.<br/>Error: " . $_FILES['pdf']['error'];
    exit();
  }

  $pdfid = uniqid();
  $frontpageid = uniqid();

  $pdfdir = $pdf_dir . $pdfid . '.pdf';
  $frontpagedir = $frontpage_dir . $frontpageid . '.jpg';

  if(!move_uploaded_file($_FILES['pdf']['tmp_name'], $pdfdir)) {
    echo "Det gick inte att flytta pdfen.";
    exit();
  }

  $encodedData = filter_input(INPUT_POST, 'frontpage', FILTER_SANITIZE_STRING);
  $encodedData = str_replace('data:image/jpeg;base64,', '', $encodedData);
  $encodedData = str_replace(' ','+',$encodedData);
  $decodedData = base64_decode($encodedData);
  file_put_contents($frontpagedir, $decodedData);

  $date = date("Y-m-d H:i:s");
  $pdfpath = $pdfid . '.pdf';
  $frontpagepath = $frontpageid . '.jpg';

  if ($stmt = $link->prepare("INSERT INTO blandare (blandarid, blandarpdf, blandarname, frontpage, uploaddate) VALUES (?, ?, ?, ?, ?)")) {
    $stmt->bind_param('sssss', $frontpageid, $pdfpath, $name, $frontpagepath, $date);
    $stmt->execute();
    if ($stmt->error) {
      echo "Error: $stmt->error";
    }
  }

  // echo "ok";
} else {
  echo "Invalid request.";
}

?>
