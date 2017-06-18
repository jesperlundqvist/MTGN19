<?php
function sec_session_start() { //Start this function before each session of php
  session_start();
}
function login($username, $password, $link) {
  // Prepare är säkrast tydliden.
  if ($stmt = $link->prepare("SELECT username, password, salt, admin FROM users WHERE username = ? LIMIT 1")) {
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->bind_result($username, $db_password, $salt, $admin);
    $stmt->store_result();
    $stmt->fetch();

    // hash the password with the unique salt.
    $password = hash('sha512', $password . $salt);
    if ($stmt->num_rows == 1) {
      if ($db_password == $password) { // Rätt lösenord
        $user_browser = $_SERVER['HTTP_USER_AGENT'];
        // $user_id = preg_replace("/[^0-9]+/", "", $user_id);
        // $_SESSION['user_id'] = $user_id;
        $username = preg_replace("/[^a-zA-Z0-9_\-]+/", "", $username);
        $_SESSION['username'] = $username;
        // setcookie('username', $username, time() + (86400 * 45), "/");
        $_SESSION['login_string'] = hash('sha512', $password . $user_browser);
        if ($admin == '1') {
          $_SESSION['admin'] = true;
        } else {
          $_SESSION['admin'] = false;
        }
        return true;
      } else {
        // Fel lösenord
        return false;
      }
    } else {
      // Användaren finns inte
      return false;
    }
  }
}

function login_check($link) {
  if (session_status() == PHP_SESSION_NONE) {
      sec_session_start();
  }
  // sec_session_start();

  // Kolla först om alla sessionsvariabler är satta
  if (isset($_SESSION['username'], $_SESSION['login_string'])) {
    // $user_id = $_SESSION['user_id'];
    $login_string = $_SESSION['login_string'];
    $username = $_SESSION['username'];

    // info om webläsaren
    $user_browser = $_SERVER['HTTP_USER_AGENT'];

    if ($stmt = $link->prepare("SELECT password FROM users WHERE username = ? LIMIT 1")) {
      $stmt->bind_param('s', $username);
      $stmt->execute();
      $stmt->store_result();

      if ($stmt->num_rows == 1) {
        $stmt->bind_result($password);
        $stmt->fetch();
        $login_check = hash('sha512', $password . $user_browser);

        if ($login_check == $login_string) {
          // Inloggad
          return true;
        } else {
          // Ej inloggad
          return false;
        }
      } else {
        // Ej inloggad
        return false;
      }
    } else {
      // Ej inloggad
      return false;
    }
    return true;
  } else {
    // Ej inloggad
    return false;
  }
}

function getprofilename($link) {
  if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
    if ($stmt = $link->prepare("SELECT name FROM users WHERE username = ? LIMIT 1")) {
      $stmt->bind_param('s', $username);
      $stmt->execute();
      $stmt->store_result();

      $stmt->bind_result($name);
      $stmt->fetch();

      return $name;
    }
  } else {
    return null;
  }

}

function getprofilepicpath($link) {
  if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];

    if ($stmt = $link->prepare("SELECT imagename FROM users WHERE username = ? LIMIT 1")) {
      $stmt->bind_param('s', $username);
      $stmt->execute();
      $stmt->store_result();

      $stmt->bind_result($imagename);
      $stmt->fetch();

      $path = "images/uploads/profile_pictures/" . $imagename;

      return $path;
    }
  }
  return "images/uploads/profile_pictures/nope.png";
}

function getGalleryLink($year = null, $week = null, $weekday = null) {
  if ($year == null) {
    $year = date("Y");
  }

  if ($week == null) {
    $week = date("W");
  }

  if ($weekday !== null) {
    return "gallery.php?week=".urlencode($week)."&day=".urlencode($weekday);
  } else {
    return "gallery.php?week=".urlencode($week);
  }
}

function getTheDate($year, $week, $day) {
  $dto = new DateTime();
  $dto->setISODate($year, $week, $day);
  $ret = $dto->format('Y-m-d');
  return $ret;
}
function getTheDayString($year, $week, $day) {
  setlocale(LC_ALL, 'sv_SE.ISO8859-1');
  $dto = new DateTime();
  $dto->setISODate($year, $week, $day);
  $ret = utf8_encode(strftime("%A", $dto->getTimeStamp()));
  return $ret;
}

function getStartAndEndDate($year, $week) {
  $dto = new DateTime();
  $dto->setISODate($year, $week);
  $ret['weekstart'] = $dto->format('Y-m-d');
  $dto->modify('+6 days');
  $ret['weekend'] = $dto->format('Y-m-d');
  return $ret;
}

function closestWeek() {
  $week = date("W");
  if ($week < 34) {
    return 34;
  } elseif ($week >= 34 && $week <= 37) {
    return $week;
  } else {
    return 37;
  }
}
function getImageLink($message, $imageType){
  $img = "<img class='messageImage' src='";
  $offset = strlen($imageType);
  if (strpos($message, $imageType)!==FALSE){
    if (strpos($message, 'http')!==FALSE){
      $pos = strpos($message, 'http');
      $endPos = strpos($message, $imageType);
      $img .= substr($message, $pos, $endPos+$offset);
      $img .= "' alt='Sad face :('></img>";
      $newMessage = substr($message, 0, $pos);
      $newMessage .= $img;
      $newMessage .= substr($message, $endPos+$offset);
    } else {
      $img .= $message;
      $img .= "' alt='Sad face :('></img>";
      $message = $img;
    }
    return $newMessage;
  } else {
    return $message;
  }
}
function convertEmoji($message, $emoji, $replacement){
  $uniEmoji = "&#x";
  $uniEmoji .= $replacement;
  if (strpos($message, $emoji)!==FALSE){
    $emo .= str_replace($emoji, $uniEmoji, $message);
    return $emo;
  }
  return $message;
}
function time2str($ts)
{
    if(!ctype_digit($ts))
        $ts = strtotime($ts);

    $diff = time() - $ts;
    if($diff == 0)
        return 'nu';
    elseif($diff > 0)
    {
        $day_diff = floor($diff / 86400);
        if($day_diff == 0)
        {
            if($diff < 60) return 'precis nu';
            if($diff < 120) return 'En minut sedan';
            if($diff < 3600) return floor($diff / 60) . ' minuter sedan';
            if($diff < 7200) return 'En timme sedan';
            if($diff < 86400) return floor($diff / 3600) . ' timmar sedan';
        }
        if($day_diff == 1) return 'Igår';
        if($day_diff < 7) return $day_diff . ' dagar sedan';
        if($day_diff < 31) return ceil($day_diff / 7) . ' veckor sedan';
        if($day_diff < 60) return 'senaste månaden';
        return date('F Y', $ts);
    }
    else
    {
        $diff = abs($diff);
        $day_diff = floor($diff / 86400);
        if($day_diff == 0)
        {
            if($diff < 120) return 'in a minute';
            if($diff < 3600) return 'in ' . floor($diff / 60) . ' minutes';
            if($diff < 7200) return 'in an hour';
            if($diff < 86400) return 'in ' . floor($diff / 3600) . ' hours';
        }
        if($day_diff == 1) return 'Tomorrow';
        if($day_diff < 4) return date('l', $ts);
        if($day_diff < 7 + (7 - date('w'))) return 'next week';
        if(ceil($day_diff / 7) < 4) return 'in ' . ceil($day_diff / 7) . ' weeks';
        if(date('n', $ts) == date('n') + 1) return 'next month';
        return date('F Y', $ts);
    }
}

function connectToDB() {
  // Logga in på databasen
  $host = 'localhost';
  $user = '166397_xb73815';
  $password = 'AlltLuktarKorv';
  $db = '10.209.2.44';
  $port = 8889;

  $link = mysqli_connect(
    $host,
    $user,
    $password
  );

  if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
  }

  $link->set_charset('utf8'); //Fixar åäö


  return $link;
}

function execQuery($link, $query) {
  if (($result = mysqli_query($link, $query)) === false) {
    printf("Query failed: %s\n%s", $query, mysqli_error($link));
    return null;
  }

  return $result;
}


?>
