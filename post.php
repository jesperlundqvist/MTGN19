<?php

switch($_GET["action"]){
  case 'news':
    echo'nyhetspost';
    break;
  default:
    echo 'fel';
}
