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
        let cues = track.activeCues;
        if (cues && cues.length > 0) {
          let vtts = '';
          for (let i=0; i < cues.length; ++i) {
            let cue = cues[i];
            let vtt = cue.text;
            vtts += '<br>' + vtt;
            if (vtt.substring(0,8)=="[George]"){
              p.muted(true);
            }
          }
          jq('#caption-0').html(vtts).addClass('active-cue');
        }else{
          p.muted(false);
          jq('#caption-0').html("").removeClass('active-cue');
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
