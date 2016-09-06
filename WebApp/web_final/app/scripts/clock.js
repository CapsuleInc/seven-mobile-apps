(function ($) {

  var namespaces = $.app.namespaces,
    tzManager = namespaces.managers.TimeZoneManager;
  var isTwelveHourFormat;
  
  var Clock = {
    start: function () {
      this.loadSavedLocalTimeFormat();
      this.tick();
      var tickFunction = _.bind(this.tick, this);
      setInterval(tickFunction, 1000);
    },

    storeTimeFormatLocally : function(value) {
      localStorage.isTwelveHourFormat = JSON.stringify(value);
    },

     loadSavedLocalTimeFormat : function() {
      var timeFormat = localStorage.isTwelveHourFormat;
      if (timeFormat) {
        isTwelveHourFormat =  JSON.parse(timeFormat);
      }
      else{
        isTwelveHourFormat = true;
      } 
    },

    tick: function () {
      var date = new Date(),
        zones = tzManager.savedZones(true);
      var updateClockAtIndex = function (index, element) {
        var zone = zones[index],
          formattedTime = this.convertAndFormatDate(zone.offset, date);
        $(element).text(formattedTime);
      };
      updateClockAtIndex = _.bind(updateClockAtIndex, this);
      $(".clock-time").each(updateClockAtIndex);
    },

    convertAndFormatDate: function (offset, date) {
      var convertedSeconds = date.getUTCMinutes() * 60 +
        date.getUTCHours() * 3600 + offset,
        hour = Math.floor(convertedSeconds / 3600),
        minutes = Math.abs(
          Math.floor((convertedSeconds - (hour * 3600)) / 60)
        );
      if (hour < 0) {
        hour = hour + 24;
      } else if (hour >= 24) {
        hour = hour - 24;
      }
      return this.formatTime(hour, minutes);
    },
    formatTime: function (hour, minutes) {
      var formattedTime = this.zeroPad(hour) + ":" + this.zeroPad(minutes);

      if (isTwelveHourFormat == false) {
        return formattedTime;
      }
      else{
        var amOrpm = " am";
        if(hour == 24){
          hour = 0;
        }
        else if( hour > 12){
          hour = hour - 12;
          amOrpm = " pm";
        }
        formattedTime = this.zeroPad(hour) + ":" + this.zeroPad(minutes) + amOrpm; 
        return formattedTime;
      }
    },
    zeroPad: function (number) {
      var s = number.toString();
      var formattedNumber = (s.length > 1) ? s : "0" + s;
      return formattedNumber;
    },
    toggleTimeFormat: function(){
      isTwelveHourFormat = !isTwelveHourFormat;
      this.storeTimeFormatLocally(isTwelveHourFormat);
    }
  };

  $.app.register("models.Clock", Clock);

})(jQuery);

