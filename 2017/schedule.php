   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Mottagningen</title>
    <link rel="stylesheet" href="css/swiper.min.css" />
    <script src="js/schedule.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js"></script>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper">
   <!--    <div class="buttons">
        <div class="button" id="button_week_back"><span class="ion-ios-arrow-thin-left"></span> Föregående vecka</div>
        <div class="button" id="button_week_forward">Nästa vecka <span class="ion-ios-arrow-thin-right"></span></div>
      </div> -->
        <div id="schedule">
          <table>
            <tr class="toprow">
              <th colspan="8">
                <h2 class="week-title">
                  <div class="button" id="button_week_back"><i class='fa fa-arrow-left' aria-hidden='true'></i></div>
                  Schema, <div id="week"></div>
                <div class="button" id="button_week_forward"><i class='fa fa-arrow-right' aria-hidden='true'></i></div>
              </h2>
              <div class="toprow-bg"></div>
              </th>
            </tr>
            <tr class="toprow">
              <td class="week_container top-day0">
              </td>
              <td class="day_container">
                <p class="weekday">Mån<span class="complete_day">dag</span></p>
                <p id="date_0" class="date"></p>
              </td>
              <td class="day_container">
                <p class="weekday">Tis<span class="complete_day">dag</span></p>
                <p id="date_1" class="date"></p>
              </td>
              <td class="day_container">
                <p class="weekday">Ons<span class="complete_day">dag</span></p>
                <p id="date_2" class="date"></p>
              </td>
              <td class="day_container">
                <p class="weekday">Tor<span class="complete_day">sdag</span></p>
                <p id="date_3" class="date"></p>
              </td>
              <td class="day_container">
                <p class="weekday">Fre<span class="complete_day">dag</span></p>
                <p id="date_4" class="date"></p>
              </td>
              <td class="day_container">
                <p class="weekday">Lör<span class="complete_day">dag</span></p>
                <p id="date_5" class="date"></p>
              </td>
              <td class="day_container top-day7">
                <p class="weekday">Sön<span class="complete_day">dag</span></p>
                <p id="date_6" class="date"></p>
              </td>
            </tr>
            <tr>
              <td class="timecell">08:00</td>
              <td class="day day0" id="0" rowspan="20"></td>
              <td class="day day1" id="1" rowspan="20"></td>
              <td class="day day2" id="2" rowspan="20"></td>
              <td class="day day3" id="3" rowspan="20"></td>
              <td class="day day4" id="4" rowspan="20"></td>
              <td class="day day5" id="5" rowspan="20"></td>
              <td class="day day6" id="6" rowspan="20"></td>
            </tr>
            <?php // skriver ut resten av tiderna i tabellen
              $startHour = 9;
              for ($i = 0; $i < 19; $i++) {
                echo "<tr class='timerow'>";
                echo "<td class='timecell'>";
                if ($startHour < 10) {
                  echo "0$startHour:00";
                } elseif ($startHour >= 10 && $startHour < 24) {
                  echo "$startHour:00";
                } else {
                  $startHour -= 24;
                  echo "0$startHour:00";
                }

                echo "</td>";
                echo "</tr>";
                $startHour++;
              }
            ?>
          </table>
          <div id="popup_container"></div>
        </div>
        <div id="schedule_mobile">
          <!-- Slider main container -->
          <div class="swiper-container">
            <!-- Additional required wrapper -->
            <div id="slider" class="swiper-wrapper">
              <!-- Slides -->
            </div>
          </div>
        </div>
        <br /><br />
        <a class="button-primary" id="subscribe-link">Lägg till i egen kalender</a>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>
    <div id="schedule-subscribe-modal">
        <div id="schedule-subscribe-modal-content">
            <p id="schedule-subscribe-modal-x">x</p>
            <p style="font-size: 16px;">Prenumerera på kalender</p>
            <p>För att prenumerera på en Mac, iPhone, eller iPad, tryck på WebCal-knappen.</p>
            <br>
            <p>För att lägga till i din Google Kalender, tryck på "Google Kalender"-knappen och sedan på plus-tecknet i hörnet.</p>
            <br>
            <a id="schedule-subscribe-caldav-link" class="button-primary">WebCal</a>
            <a id="android-link" class="button-primary">Google Kalender</a>
            <br><br><br>
            <p>Annars går det bra att manuellt prenumerera genom att kopiera länken nedan och klistra in den i ditt kalenderprogram.</p>
            <br>
            <input type="text" id="schedule-subscribe-field" value="" readonly />
            <br><br>
            <a id="schedule-subscribe-copy-link" class="button-primary" data-clipboard-target="#schedule-subscribe-field">Kopiera länk</a>
        </div>
    </div>
  <script src="js/swiper.jquery.min.js"></script>
  </body>
</html>
