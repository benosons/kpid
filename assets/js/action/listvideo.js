$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);

  $('#video-tutor > a').attr('class','nav-link active');
  $('#add-video').on('click', function(){
    $('#modal-add-video').modal({
      show: true
    });
    $("[name='video-input']").val('');
  });


  $('#btn-simpan-video').on('click', function(){
    simpanvideo();
  });

    loadvideo();
  });

  function simpanvideo(){

    if($('#id').val()){
      var act = 'updatevideo';
    }else{
      var act = 'addvideo';
    }

    $.ajax({
        type: 'post',
        dataType: 'json',
        url: act,
        data : {
                id        : $('#id').val(),
                judul     : $('#judul').val(),
                url       : $('#url').val(),
                desc      : $('#desc').val(),
         },
        success: function(result){
          $("[name='video-input']").val('');
          loadvideo();
        }
      });
  }

    function loadvideo(){
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: 'listDataVideo',
            data : {
                    param      : '',
             },
            success: function(result){
                    var dt = $('#list-video').DataTable({
                        responsive: true,
                        bDestroy: true,
                        processing: true,
                        autoWidth : true,
                        pageLength: 10,
                        lengthChange: true,
                        aaData: result,
                        aoColumns: [
                            { 'mDataProp': 'id'},
                            { 'mDataProp': 'judul'},
                            { 'mDataProp': 'url'},
                            { 'mDataProp': 'desc'},
                            { 'mDataProp': 'path'},
                        ],
                        order: [[0, 'ASC']],
                        aoColumnDefs:[
                            {
                                mRender: function (data, type, row){
                                    var $rowData = '';
                                        $rowData += `
                                                  <div class="row">
                                                    <div class="col-md-4">
                                                      <button onclick="autoPlayYouTubeModal('`+row.url+`')" type="button" class="btn btn-block btn-success btn-sm"><i class="far fa-eye"></i></button>
                                                    </div>
                                                    <div class="col-md-4">
                                                      <button onclick="editvideo(`+row.id+`,'`+row.judul+`','`+row.url+`','`+row.desc+`')" type="button" class="btn btn-block btn-warning btn-sm"><i class="far fa-edit"></i></button>
                                                    </div>
                                                    <div class="col-md-4">
                                                      <button onclick="deletevideo(`+row.id+`)" type="button" class="btn btn-block btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                                                    </div>
                                                  </div>
                                                    `;

                                    return $rowData;
                                },
                                aTargets: [4]
                            },
                        ],

                        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
                            var index = iDisplayIndexFull + 1;
                            $('td:eq(0)', nRow).html(' '+index);
                            return  ;
                        },

                        fnInitComplete: function () {
                            var that = this;
                            var td ;
                            var tr ;

                            this.$('td').click( function () {
                                td = this;
                            });
                            this.$('tr').click( function () {
                                tr = this;
                            });


                            $('#listproj_filter input').bind('keyup', function (e) {
                                return this.value;
                            });

                        }
                    });

                }
        });
    }

  function deletevideo(id){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'deletevideo',
        data : {
                param      : id,
         },
        success: function(result){
          loadvideo();
        }
      });
  }

  function editvideo(id, judul, url, desc){
    $('#add-video').trigger('click');
    $('#id').val(id);
    $('#judul').val(judul);
    $('#url').val(url);
    $('#desc').val(desc);

  }

//FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG
function autoPlayYouTubeModal(url) {

  $('#videoModal').modal({
    show: true
  });


  $('#iframe-video').attr('src', 'http://www.youtube.com/embed/'+url.split('?v=')[1]+'?autoplay=1');
  // $('#iframe-video').html('<iframe id="iframe-video" width="100%" height="350" src="http://www.youtube.com/embed/'+url.split('?v=')[1]+'?autoplay=1"></iframe>');
}