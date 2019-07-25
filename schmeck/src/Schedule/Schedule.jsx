import React, { Component } from "react";
import "./Schedule.css";

class Schedule extends Component {
  //Check if the user is admin, if --> they can upload and delete, should this be here??
  state = {};
  render() {
    return (
      <div className='page'>
        <h1 className='view_header'>Schedule</h1>
        <div className='schedule'>
          <div className='schedule-time-column'>
            <p className='schedule-time'>08:00</p>
            <p className='schedule-time'>09:00</p>
            <p className='schedule-time'>10:00</p>
            <p className='schedule-time'>11:00</p>
            <p className='schedule-time'>12:00</p>
            <p className='schedule-time'>13:00</p>
            <p className='schedule-time'>14:00</p>
            <p className='schedule-time'>15:00</p>
            <p className='schedule-time'>16:00</p>
            <p className='schedule-time'>17:00</p>
            <p className='schedule-time'>18:00</p>
            <p className='schedule-time'>19:00</p>
            <p className='schedule-time'>20:00</p>
            <p className='schedule-time'>21:00</p>
            <p className='schedule-time'>22:00</p>
            <p className='schedule-time'>23:00</p>
            <p className='schedule-time'>00:00</p>
          </div>
          <div className='schedule-week swiper-container'>
            <div className='swiper-wrapper'>
              <div className='swiper-slide'>
                <h3 className='schedule-current-day'>toWeekDay @key</h3>
                <div className='schedule-day schedule-day-today'>
                  <h3>12</h3>
                  <div className='schedule-day'>
                    <div
                      className='schedule-filler'
                      style={{ height: "100px" }}
                    />
                    <div
                      className='schedule-item'
                      style={{ height: "1000px" }}
                      data-duration='duration_str'>
                      <p className='schedule-title'>
                        summary <small>fromTime - toTime</small>
                      </p>
                      <p className='schedule-location'>location</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='swiper-scrollbar' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Schedule;
