(function () {
  window.fileChangeListener = function(files) {
    for(var i = 0; i < files.length; i++){
      var file = files[i];
      var p = window.player = Player.fromFile(file);
      player.on('ready', dance);
      p.on('error', function(err){
        console.log(err);
      });
      p.on('progress', function(err){
        console.log(err);
      });
      p.on('metadata', function(err){
        console.log(err);
      });
      p.play();
    }
  }
  function dance() {
    var
        waveform = document.getElementById( 'waveform' ),
        ctx = waveform.getContext( '2d' ),
        dancer, kick;

      /*
       * Dancer.js magic
       */
      Dancer.setOptions({
        flashSWF : '../../lib/soundmanager2.swf',
        flashJS  : '../../lib/soundmanager2.js'
      });

      dancer = new Dancer();
      kick = dancer.createKick({
        onKick: function () {
          ctx.strokeStyle = '#ff0077';
        },
        offKick: function () {
          ctx.strokeStyle = '#666';
        }
      }).on();

      dancer
        .load( player.device )
        .waveform( waveform, { strokeStyle: '#666', strokeWidth: 2 });

      Dancer.isSupported() || loaded();
      !dancer.isLoaded() ? dancer.bind( 'loaded', loaded ) : loaded();

      /*
       * Loading
       */

      function loaded () {
        var
          loading = document.getElementById( 'loading' ),
          anchor  = document.createElement('A'),
          supported = Dancer.isSupported(),
          p;

        anchor.appendChild( document.createTextNode( supported ? 'Play!' : 'Close' ) );
        anchor.setAttribute( 'href', '#' );
        loading.innerHTML = '';
        loading.appendChild( anchor );

        if ( !supported ) {
          p = document.createElement('P');
          p.appendChild( document.createTextNode( 'Your browser does not currently support either Web Audio API or Audio Data API. The audio may play, but the visualizers will not move to the music; check out the latest Chrome or Firefox browsers!' ) );
          loading.appendChild( p );
        }

        anchor.addEventListener( 'click', function () {
          dancer.play();
          document.getElementById('loading').style.display = 'none';
        });
      }

      // For debugging
      window.dancer = dancer;
  }

})();
