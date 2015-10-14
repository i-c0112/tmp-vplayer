(function() {
  videojs.plugin("tracker", function(options) {
    console.log("[tracker] video src: " + this.src() + "; options: " + options);

    var sendData, timeupdate,
    // Events to track: play, pause, start, end, seek, percents played
    play, pause, start, end, seek, percentsPlayed,
    // If user is seeking manually?
    seeking,
    // plugin-wide variable recording change of currentTime
    seekStart, seekEnd,
    percentsPlayedInterval, percentsTracked;

    percentsPlayedInterval = options.percentsPlayedInterval | 10;
    seekStart = seekEnd = 0;
    percentsTracked = [];

    play = function() {
      var currentTime;
      currentTime = Math.round(this.currentTime());
      sendData("play", Math.round(currentTime));
      // the pause events caused by seeking should happen no more
      seeking = false;
    }
    pause = function() {
      var currentTime, duration;
      currentTime = Math.round(this.currentTime());
      duration = Math.round(this.duration());
      if (currentTime !== duration && !seeking) {
        sendData("pause", currentTime);
      }
    }
    end = function() {
      sendData("end");
    }
    sendData = function(event, value) {
      // send tracked data to back-end
      console.log("Tracking event: " + event + ", value: " + value);
    }
    timeupdate = function() {
      // in charge of tracking start, seek, and percentsPlayed events
      var currentTime, duration, percentsPlayed, percent;
      currentTime = Math.round(this.currentTime());
      duration = Math.round(this.duration());
      percentsPlayed = Math.round(currentTime / duration * 100);
      for (percent = 0; percent <= percentsPlayed; percent += percentsPlayedInterval) {
        if (percentsTracked.indexOf(percent) < 0) {
          if (percent === 0 && percentsPlayed > 0) {
            sendData("start");
            continue;
          }
          if (percent > 0){
            sendData("percentsPlayed", percent);
          }
          percentsTracked.push(percent);
        }
      }

      seekStart = seekEnd;
      seekEnd = currentTime;
      if (Math.abs(seekEnd - seekStart) > 1) {
        seeking = true;
        sendData("seek start", seekStart);
        sendData("seek end", seekEnd);
      }
    }

    this.ready(function() {
      this.on("play", play);
      this.on("pause", pause);
      this.on("end", end);
      this.on("timeupdate", timeupdate);
    });
  });
})();
