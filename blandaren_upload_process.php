<?php
include_once("functions_imageresize.php");
include_once("functions_common.php");

$link = connectToDB();


$pdf_dir = "images/uploads/blandaren/pdfs/";
$frontpage_dir = "images/uploads/blandaren/frontpages/";

// var_dump($_FILES);

if (isset($_FILES['files'], $_POST['name'])) {

  $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);

  if ($_FILES['files']['error'][0] > 0) {
    echo "Det gick inte att ladda upp pdfen.<br/>Error: " . $_FILES['files']['error'][0];
    exit();
  }

  if ($_FILES['files']['error'][1] > 0) {
    echo "Det gick inte att ladda upp bilden.<br/>Error: " . $_FILES['files']['error'][1];
    exit();
  }

  $pdfid = uniqid();
  $frontpageid = uniqid();

  $ext = pathinfo($_FILES['files']['name'][1], PATHINFO_EXTENSION);


  $pdfdir = $pdf_dir . $pdfid . '.pdf';
  $frontpagedir = $frontpage_dir . $frontpageid . '.' . $ext;

  if(!move_uploaded_file($_FILES['files']['tmp_name'][0], $pdfdir)) {
    echo "Det gick inte att flytta pdfen.";
    exit();
  }

  if(!move_uploaded_file($_FILES['files']['tmp_name'][1], $frontpagedir)) {
    echo "Det gick inte att flytta bilden.";
    exit();
  }

  $date = date("Y-m-d H:i:s");
  $pdfpath = $pdfid . '.pdf';
  $frontpagepath = $frontpageid . '.' . $ext;

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
