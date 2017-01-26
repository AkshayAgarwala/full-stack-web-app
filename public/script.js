window.setTimeout(function(){
  $(document).ready(function(){
      $("#weatherStart").fadeTo(2000, .8, function(){
        $("#weatherEnd").fadeTo(1000, .8, function(){
            $("#weatherMessage").animate({
              opacity: '.7',
              left: '40%'
            }, 2000);
        });
      })
  })
}, 3000);
