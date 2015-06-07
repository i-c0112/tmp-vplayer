var jq = jQuery.noConflict();
jq(function(){
  'use strict';
  var track;
  jq('#transcript-selector').on("change", function(event) {
    
  });

  // setup video
  var player = videojs('really-cool-video').ready(function(){
    var p = this;
    track = this.textTracks()[0];
    track.mode="hidden";
    this.textTracks()[1].mode="disabled";
    this.volume(0.2);

    // How about an event listener?
    this.on('timeupdate', function(){
      try{
        let cues = track.activeCues;
        if (cues && cues.length > 0){
          let vtts = '';
          let mute = false;
          for (let i=0; i < cues.length; ++i){
            let cue = cues[i];
            let vtt = cue.text;
            vtts += '<br>' + vtt;

            // In vtt: '[' + character_name + ']'
            // checkbox id: 'mute-' + character_name
            let end_index = vtt.indexOf(']');
            if (end_index === -1){
              throw "Failed to parse vtt file!";
            }
            let jq_el = jq('#mute-' + vtt.substring(1, end_index));
            if (jq_el.length === 0){
              throw "Character not found in checkbox!";
            }
            // NOTE 'checked' attr is not sync with 'checked' property
            // using jq.prop() instead of jq.attr()
            if (jq_el[0].checked){
              mute = true;
            }
          }
          p.muted(mute);
          jq('#caption-0').html(vtts).addClass('active-cue');
        }else{
          p.muted(false);
          jq('#caption-0').html("").removeClass('active-cue');
        }
      }catch(e){
        console.log('err',e);
      }
    }); // on timeupdate
  }); // videojs(...).ready(...)

  // plugin: videojs-transcript
  try {
    let vjs_transcript = player.transcript({
      showTitle: false
    });
    jq('#transcription').get(0).appendChild(vjs_transcript.el());
  }catch(e){
    console.log(e);
  }
}); // jq(...)
