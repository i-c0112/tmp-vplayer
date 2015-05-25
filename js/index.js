var jq = jQuery.noConflict();
jq(function() {
  'use strict';
  var player = videojs('really-cool-video').ready(function() {
    var p = this;
    var track = this.textTracks()[0];
    track.mode="hidden";

    // How about an event listener?
    this.on('timeupdate', function() {
      try{
        var cues = track.activeCues;
        if (cues && cues.length > 0) {
          var vtt = cues[0].text;
          if (vtt.substring(0,8)=="[George]"){
            console.log('A talk!');
            p.muted(true);
          } else {
            p.muted(false);
          }
          jq('#caption_0').html(vtt).addClass('active-cue');
        }else{
          p.muted(false);
          jq('#caption_0').html("").removeClass('active-cue');
        }
      }catch(e){
        console.log('err',e);
      }
    });
  }); // videojs(...).ready(...)

  // plugin: videojs-transcript
  try {
    var vjs_transcript = player.transcript({
      showTitle: false,
      showTrackSelector: false
    });
    jq('#transcription').get(0).appendChild(vjs_transcript.el());
  }catch(e){
    console.log(e);
  }
}); // jq(...)
