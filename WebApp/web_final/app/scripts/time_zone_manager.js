(function($) {

  var TimeZoneManager = {

    savedTimeZones : [],

    initialize : function() {
      this.loadSavedTimeZones();
      if (!navigator.onLine) {
        this.loadLocalTimeZones();
      } else {
        var completion = _.bind(function(zones) {
          this.storeTimeZonesLocally(zones);
        }, this);
        this.fetchTimeZones(completion);
      }
    },

    fetchTimeZones : function(completion) {
      var successFunction = _.bind(function(data) {
        this.zonesLoaded(data);
        if (completion) completion(data);
      }, this);
      var errorFunction = _.bind(function() {
        this.loadLocalTimeZones();
      }, this);

      $.ajax({
        url     : "https://sevenmobileappapi.herokuapp.com/clock/time_zones",
        headers : { Accept: "application/json" },
        success : successFunction,
        error   : errorFunction
      });
    },

    loadSavedTimeZones : function(){
      var localSavedZones = localStorage.savedTimeZones;
      if (localSavedZones) {
        this.savedTimeZones = JSON.parse(localSavedZones);
      }
    },

    storeSavedTimeZonesLocally : function() {
      localStorage.savedTimeZones = JSON.stringify(this.savedTimeZones);
    },

    loadLocalTimeZones : function() {
      var localZones = localStorage.allTimeZones;
      if (localZones) {
        this.zonesLoaded(JSON.parse(localZones));
      } else {
        // Inform user that no timezone data is available
      }
    },

    storeTimeZonesLocally : function(zones) {
      localStorage.allTimeZones = JSON.stringify(zones);
    },

    zonesLoaded : function(zones) {
      this.timeZones = zones;
    },

    allZones : function() {
      return this.timeZones;
    },

    saveZoneAtIndex : function(index) {
      var zone = this.timeZones[index];
      this.savedTimeZones.push(zone);
      this.storeSavedTimeZonesLocally();
    },

    deleteZoneAtIndex : function(index) {
      this.savedTimeZones.splice(index, 1);
      this.storeSavedTimeZonesLocally();
    },

    savedZones : function(includeCurrent) {
      var zones = [].concat(this.savedTimeZones);
      if (includeCurrent) {
        var refDate = new Date();
        var offsetMinutes = refDate.getTimezoneOffset();
        zones.unshift({
          name: "Current",
          zone_name: "Current",
          offset: -offsetMinutes * 60,
          formatted_offset: this.formatOffsetMinutes(-offsetMinutes),
          isCurrent : true
        });
      }
      return zones;
    },

    formatOffsetMinutes : function(offsetMinutes) {
      var offsetHours = offsetMinutes / 60;
      offsetHours = Math.abs(offsetHours).toString() + ":00";
      if (offsetMinutes < 600) offsetHours = "0" + offsetHours;
      if (offsetMinutes < 0){ 
        offsetHours = "-" + offsetHours;
      }
      else{
        offsetHours = "+" + offsetHours;
      }

      return offsetHours;
    }

  };

  $.app.register("managers.TimeZoneManager", TimeZoneManager);

})(jQuery);

