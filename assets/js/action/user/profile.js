$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
$('.select2').select2();

$.when(loadkota()).then(loaduser());

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
          console.log(result[0].kotaKab)
          $('#name').val(result[0].name);
          $('#username').val(result[0].username);
          $('[name="notelp"]').text(result[0].no_telp);
          $('#notelp').val(result[0].no_telp);
          $('[name="email"]').text(result[0].email);
          $('#email').val(result[0].email);
          $('#kategori').text(result[0].kategori);
          $('#kota_kab').val(result[0].kotaKab).trigger('change');
        }
      });
    }

    function loadkota(){
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: 'loadkota',
            data : {
                    param      : '',
             },
            success: function(result){
              $('#kota_kab').empty();
              var option ='<option value="0">-Pilih-</option>';
              for (var i = 0; i < result.length; i++) {
                option += '<option value="'+result[i].id+'">'+result[i].nama+'</option>';
              }
              $('#kota_kab').append(option);
            }
          });
        };
