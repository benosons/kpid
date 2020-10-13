$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);

loaduser();
});

function loaduser(){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'loaduser',
        data : {
                id      : '',
         },
        success: function(result){
        }
      });
    }
