'use strict';
var jq = jQuery.noConflict();
jq(function() {
  var player = videojs('really-cool-video').ready(function() {
    console.log('Good to go!');
    var p = this;
    this.volume(0.25); // debug: need some music when coding
    this.textTracks()[0].mode="hidden";
    // this.play(); // if you don't trust autoplay for some reason

    // How about an event listener?
    this.on('timeupdate', function() {
      try{
        // throws exception if no textTracks nor activeCues
        var cues = p.textTracks()[0].activeCues;
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
  // console.log(player);
  try {
    var vjs_transcript = player.transcript({
      showTitle: false,
      showTrackSelector: false
    });
    console.log(vjs_transcript.el());
    jq('#transcription').get(0).appendChild(vjs_transcript.el());
  }catch(e){
    console.log(e);
  }
}); // jq(...)
