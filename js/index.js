'use strict';var jq = jQuery;jq(function(){  var track; // current selected track
  var utils = function() {
    var currentCueId = [0, 0];
    return {
      parseTrack : function (track) {
        let ret = [];
        let cues = track.cues;
        for (let i = 0; i < cues.length; ++i) {
          let s = cues[i].text;
          let pos = -1;
          while (true) {
            pos = s.indexOf('[', pos + 1);
            if (pos === -1) {
              break;
            }
            let leftpos = pos;
            pos = s.indexOf(']', leftpos);
            if (pos === -1) {
              throw "Failed to parse the track!";
            }
            let character = s.substring(leftpos + 1, pos);
            if (ret.indexOf(character) === -1) {
              ret.push(character);
            }
          }
        }
        return ret;
      },
      getTrackNum : function(track_) {
        if (typeof track_.language == "undefined") {
          throw new TypeError(track_ + ' has no property language');
        }
        return track_.language === "en" ? 0 : 1;
      },
      getTrackDisplayText : function(track_) {
        let ret = {
          caption: false,
          preview: ""
        };
        let length = 0;
        if (track_.activeCues && (length = track_.activeCues.length) > 0) {
          ret.caption = "";
          for (let i = 0; i < length; ++i) {
            ret.caption += "<br>\n" + track_.activeCues[i].text;
            currentCueId[utils.getTrackNum(track_)] = Number(track_.activeCues[i].id);
          }
        }
        for (let i = 0; i < 3 - length; ++i) {
          let cue = track_.cues.getCueById(currentCueId[utils.getTrackNum(track_)] + i + 1);
          if (!cue) {
            break;
          }
          ret.preview += "<br>\n" + cue.text;
        }
        return ret;
      }
    };
  }();

  // setup video
  var player = videojs('really-cool-video').ready(function(){
    var p = this;
    track = this.textTracks()[0];
    track.mode="hidden";
    // bugfix: "disabled" will NOT work. Instead, "hidden" works pretty well.
    this.textTracks()[1].mode="hidden";
    this.volume(0.2);
    let characters = [];
    $('#track-en').load(function() {
      characters = utils.parseTrack(this.track);
      console.log(characters);
    });
    // How about an event listener?
    this.on('timeupdate', function(){
      try{
        let mute = false;
        for (let idx = 0; idx < 2; ++idx) {
          let trackIter = p.textTracks()[idx];
          if (typeof trackIter == "undefined") {
            throw new TypeError(trackIter + ' is undefined');
          }

          let textToDisplay = utils.getTrackDisplayText(trackIter);
          let captionJq = jq('#caption-' + utils.getTrackNum(trackIter));
          if (textToDisplay.caption) {
            captionJq.html(textToDisplay.caption).addClass('active-cue');
          } else {
            captionJq.html("").removeClass('active-cue');
          }
          jq('#preview-' + utils.getTrackNum(trackIter)).html(textToDisplay.preview);
        }
      }catch(e){
        console.log('err',e);
      }
    }); // on timeupdate
  }); // videojs(...).ready(...)

  // plugin: videojs-transcript
  try {
    let vjs_transcript = player.transcript({
      showTitle: false,
      showTrackSelector: false    });
    jq('#transcription').get(0).appendChild(vjs_transcript.el());
    // sync transcript-selector and texttrack view
    jq('.transcript-selector').on('change', function(e) {
      // parse "option.text": "label" ("srclang")
      let label = this[this.selectedIndex].text.split(' ')[0];
      track = jq('track[label=' + label + ']').get(0).track;
    });
  }catch(e){
    console.log(e);
  }
}); // jq(...)
