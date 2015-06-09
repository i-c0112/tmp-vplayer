var jq = jQuery.noConflict();
jq(function(){
  'use strict';
  var track;

  // setup video
  var player = videojs('really-cool-video').ready(function(){
    var p = this;
    track = this.textTracks()[0];
    track.mode="hidden";
    // bugfix: "disabled" will NOT work. Instead, "hidden" works pretty well.
    this.textTracks()[1].mode="hidden";
    this.volume(0.2);

    // How about an event listener?
    this.on('timeupdate', function(){
      try{
        let cues = track.activeCues;
        if (cues && cues.length > 0){
          let vtts = '';
          let vtts2 = "";
          let mute = false;
          let count = 3 - cues.length;
          for (let i=0; i < cues.length; ++i){
            let cue = cues[i];
            let vtt = cue.text;
            vtts += "<br>\n" + vtt;

            // NOTE cue.id starts with value 1
            vtts2 += "<br>\n" +
              p.textTracks()[track.language === "en"? 1: 0]
              .cues.getCueById(cue.id).text;

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
          // diplay preview of inactive cue(s)
          let preview = "";
          let preview2 = "";
          for(let iIt = 0; iIt < count; ++iIt) {
            let iCueId = Number(cues[cues.length - 1].id) + iIt + 1;
            preview += "<br>\n" +
              track.cues.getCueById(iCueId).text;
            preview2 += "<br>\n" +
              p.textTracks()[track.language === "en"? 1: 0].
              cues.getCueById(iCueId).text;
          }

          p.muted(mute);
          jq('#caption-0').html(vtts).addClass('active-cue');
          jq('#preview-0').html(preview);
          jq('#caption-1').html(vtts2).addClass('active-cue');
          jq('#preview-1').html(preview2);
        }else{
          p.muted(false);
          jq('#caption-0, #caption-1').removeClass('active-cue');
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
