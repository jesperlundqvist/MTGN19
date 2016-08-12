$( document ).ready(function() {
  if(window.innerWidth <= 1000) {
    $('#schedule').hide();
    $('#button_week_back').hide();
    $('#button_week_forward').hide();
    $('#schedule_mobile').show();
  } else {
    $('#schedule').show();
    $('#button_week_back').show();
    $('#button_week_forward').show();
    $('#schedule_mobile').hide();
  }

  weekdays = [
    'Söndag',
    'Måndag',
    'Tisdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lördag'
  ];


  //globala variabler
  browserKey = 'AIzaSyCsUBinzlYwP-gE74Ls5L9-xSlZbJTIqlM'; // Gustav test
  // calendarid = 'qh3at27vur0f76h63fc37tcd18@group.calendar.google.com'; // Också gustav test
  calendarid = 't1jrb271f5t9pm4gq7vfbs7mek@group.calendar.google.com';
  startTime = new Date();

  startTime.setHours(0,0,0);
  startTime = startTime.addDays(-startTime.getDayOfWeek());
  endTime = startTime.addDays(7);
  startTimeString = startTime.toISOString();
  endTimeString = endTime.toISOString();

  // lyssnare
  $('#button_week_back').click(function() { //-1 = en vecka bakåt
    goOneWeek(-1);
  });
  $('#button_week_forward').click(function() {//1 = en vecka framåt
    goOneWeek(1);
  });

  //Mobile
  var mobileStartDate = new Date(Date.UTC(2016, 7, 1, 0, 0, 0));
  // console.log(mobileStartDate);
  var mobileStartDate2 = new Date();
  // console.log(mobileStartDate2);
  var mobileEndDate = new Date(Date.UTC(2016, 8, 13, 0, 0, 0));
  // var mobileEndDate = mobileStartDate.addDays(14);

  var today = new Date();
  var startSlide = today - mobileStartDate;
  startSlide = startSlide / 1000 / 60 / 60 / 24;
  if (startSlide < 0) {
    startSlide = 0;
  }
  // console.log(startSlide);

  var startTimeString_mobile = mobileStartDate.toISOString();
  var endTimeString_mobile = mobileEndDate.toISOString();

  getEvents(calendarid, browserKey, startTimeString_mobile, endTimeString_mobile, startSlide);

  $(window).resize(function () {
    if(window.innerWidth <= 1000) {
      $('#schedule').hide();
      $('#button_week_back').hide();
      $('#button_week_forward').hide();
      $('#schedule_mobile').show();
    } else {
      $('#schedule').show();
      $('#button_week_back').show();
      $('#button_week_forward').show();
      $('#schedule_mobile').hide();
    }
  });

  getWeekEvents(calendarid, browserKey, startTimeString, endTimeString);
});

function goOneWeek(direction) {
  startTime = startTime.addDays(7 * direction);
  endTime = endTime.addDays(7 * direction);
  startTimeString = startTime.toISOString();
  endTimeString = endTime.toISOString();
  emptySchedule();
  getWeekEvents(calendarid, browserKey, startTimeString, endTimeString);
}


function getWeekEvents(calendarid, browserKey, startTimeString, endTimeString) {
  $.ajax({
    type: 'GET',
    url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendarid + '/events?key=' + browserKey),
    data: {
      timeMin: startTimeString,
      timeMax: endTimeString
    },
    dataType: 'json',
    success: function (data) {
      drawSchedule(data);
    },
    error: function (data) {
      //tell that an error has occurred
    }
  });
}

function getEvents(calendarid, browserKey, startTimeString, endTimeString, startSlide) {
  $.ajax({
    type: 'GET',
    url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendarid + '/events?key=' + browserKey),
    data: {
      timeMin: startTimeString,
      timeMax: endTimeString
    },
    dataType: 'json',
    success: function (data) {
      drawScheduleSliders(data, startSlide);
    },
    error: function (data) {
      //tell that an error has occurred
    }
  });
}

function drawSchedule(data) {
  var schedule = $('#schedule');

  var margin = 1;

  //först uppdaterar vi datumen
  updateDates();

  for (var i in data.items) {
    if (typeof data.items[i].location == 'undefined') {
      data.items[i].location = '';
    }
    var eventDate = new Date(data.items[i].start.dateTime);
    var eventEndDate = new Date(data.items[i].end.dateTime);
    var day = schedule.find('#' + eventDate.getDayOfWeek());
    // console.log(day);
    var startTimeMin = (eventDate.getHours() - 8) * 60 + eventDate.getMinutes();
    var yPos = startTimeMin * (day.height() / 20 / 60);
    //Höjden räknas ut genom att ta skillnaden på sluttiden och starttiden
    var dDays = eventEndDate.getDayOfWeek() - eventDate.getDayOfWeek();
    var dHours = eventEndDate.getHours() - eventDate.getHours();
    var dMinutes = eventEndDate.getMinutes() - eventDate.getMinutes();
    var totalMinutes = dDays * 24 * 60 + dHours * 60 + dMinutes;
    var height = totalMinutes * (day.height() / 20 / 60);
    height -= margin;
    var div = $('<div>');
    div.addClass('event');
    div.css('top', yPos + 'px').css('height', height + 'px');
    div.append('<p class="event-summary">' + data.items[i].summary + '</p>');
    div.append('<p class="event-time-place"><span class="ion-ios-location-outline schedule-icon"></span>' + data.items[i].location + '</p>');
    div.click((function() {
      var summary = data.items[i].summary;
      var location = data.items[i].location;
      var ed = eventDate;
      var eed = eventEndDate;
      return function() {
        $('.site-wrap').css('overflow-y','visible');
        var popup = $("#popup_container");
        popup.append('<div id="popup_container2"></div>');
        var popup_cont = popup.find('#popup_container2');
        popup_cont.append('<div id="eventpopup"></div>');
        var eventpopup = popup_cont.find('#eventpopup');
        popup_cont.append('<div id="black_overlay"></div>');
        eventpopup.append('<h3>' + summary + '</h3>');
        var timeString = getTimeString(ed, eed);
        eventpopup.append('<div class="event-time"><span class="ion-ios-clock-outline schedule-icon"></span> ' + timeString + '</div>');
        eventpopup.append('<div class="event-place"><span class="ion-ios-location-outline schedule-icon"></span> ' + location + '</div>');
        eventpopup.append('<br><button class="event_ok button button-primary">Stäng</button>');
        popup.find("#black_overlay").click(function() {
          popup.empty();
        });
        eventpopup.find('.event_ok').click(function() {
          popup.empty();
        });
        popup.click(function() {
          popup.empty();
          $('.site-wrap').css('overflow-y','auto');
        });
      }
    })());
    // div.append('<p>' + data.items[i].description + '</p>');
    day.append(div);
  }
}

function getTimeString(startTime, endTime) {
  // Starttid
  var hours = "";
  if (startTime.getHours() < 10) {
    hours = "0" + startTime.getHours();
  } else {
    hours = startTime.getHours();
  }
  var minutes = "";
  if (startTime.getMinutes() < 10) {
    minutes = "0" + startTime.getMinutes();
  } else {
    minutes = startTime.getMinutes();
  }

  // Sluttid
  var endHours = "";
  if (endTime.getHours() < 10) {
    endHours = "0" + endTime.getHours();
  } else {
    endHours = endTime.getHours();
  }
  var endMinutes = "";
  if (endTime.getMinutes() < 10) {
    endMinutes = "0" + endTime.getMinutes();
  } else {
    endMinutes = endTime.getMinutes();
  }

  var totalStartTimeMinutes = startTime.getTime() / 1000 / 60;
  var totalEndTimeMinutes = endTime.getTime() / 1000 / 60;
  var deltaMinutes = totalEndTimeMinutes - totalStartTimeMinutes;
  var totalMinutesInADay = 24 * 60;
  var totalMinutesFromStartOfDay = (startTime.getHours() * 60 + startTime.getMinutes()) + deltaMinutes;
  var minutesLeft = totalMinutesFromStartOfDay;

  var nextTime = startTime;

  nextDayString = "";

  while(minutesLeft > totalMinutesInADay) {
    nextTime = nextTime.addDays(1);
    nextDayString = '(' + weekdays[nextTime.getDay()] + ') ';
    minutesLeft -= 24 * 60;
  }

  return hours + ':' + minutes + ' - ' + nextDayString + endHours + ':' + endMinutes;
}

function drawScheduleSliders(data, startSlide) {
  // console.log(data);
  var slider = $('#slider');

  var prevDate = null;
  var eventSlider = null;

  var events = data.items.sort(function(a, b){
    var keyA = new Date(a.start.dateTime),
    keyB = new Date(b.start.dateTime);
    // Compare the 2 dates
    if(keyA < keyB) return -1;
    if(keyA > keyB) return 1;
    return 0;
  });

  var sliderIndexes = [];
  var dayCounter = 0;
  var today = new Date();

  for (var i in events) {

    // Fix undefined location
    if (typeof data.items[i].location == 'undefined') {
      data.items[i].location = '';
    }
    var eventDate = new Date(events[i].start.dateTime);
    var eventEndDate = new Date(events[i].end.dateTime);
    if (prevDate == null || (prevDate.getDate() !== eventDate.getDate() || prevDate.getMonth() !== eventDate.getMonth())) {
      if (eventDate < today) {
        dayCounter++;
      }

      slider.append('<div id="slider_' + i + '" class="swiper-slide"></div>');
      eventSlider = slider.find("#slider_" + i);
      eventSlider.append('<div class="schedule_date"><h3>' + weekdays[eventDate.getDay()] + ' ' + eventDate.getDate() + '/' + (eventDate.getMonth() + 1) + '</h3></div>');
    }
    eventSlider.append('<div id="event_mobile_' + i + '" class="event_mobile"></div>');
    var eventContainer = $('#event_mobile_' + i);
    // Starttid
    var hours = "";
    if (eventDate.getHours() < 10) {
      hours = "0" + eventDate.getHours();
    } else {
      hours = eventDate.getHours();
    }
    var minutes = "";
    if (eventDate.getMinutes() < 10) {
      minutes = "0" + eventDate.getMinutes();
    } else {
      minutes = eventDate.getMinutes();
    }

    // Sluttid
    var endHours = "";
    if (eventEndDate.getHours() < 10) {
      endHours = "0" + eventEndDate.getHours();
    } else {
      endHours = eventEndDate.getHours();
    }
    var endMinutes = "";
    if (eventEndDate.getMinutes() < 10) {
      endMinutes = "0" + eventEndDate.getMinutes();
    } else {
      endMinutes = eventEndDate.getMinutes();
    }


    eventContainer.append('<div class="event-summary">' + events[i].summary + '</div>');
    eventContainer.append('<div class="event-time-place"><span class="ion-ios-clock-outline schedule-icon"></span> ' + hours + ':' + minutes + ' - ' + endHours + ':' + endMinutes + ' <span class="ion-ios-location-outline schedule-icon schedule-location"></span> ' + events[i].location + '</div>');
    prevDate = eventDate;
  }



  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    slidesPerView: 1.2,
    paginationClickable: true,
    spaceBetween: 10,
    centeredSlides: true,
    scrollContainer: true
  });

  startSlide -= startSlide - dayCounter + 1;
  swiper.slideTo(startSlide, 0, false);
}

function updateDates() {
  var schedule = $('#schedule');
  for (var i = 0; i <= 6; i++) {
    var div = schedule.find('#date_' + i);
    div.html(startTime.addDays(i).getDate() + '/' + (startTime.addDays(i).getMonth() + 1));
  }
  $('#week').html('Vecka ' + startTime.getWeekNumber());
}

function emptySchedule() {
  $('.day').each(function() {
    $(this).empty();
  })
}
