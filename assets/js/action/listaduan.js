$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
  $('#aduan > a').attr('class','nav-link active');
  loadaduan();

  $('#kirim-balasan').on('click', function(){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'saveBalasan',
        data : {
                id_parent     : $('#id-parent').val(),
                id_admin      : $('#id-admin').val(),
                id_user       : $('#id-pelapor').val(),
                isi           : $('#pesan-balasan').val(),
                status        : $('#status-laporan').val(),
         },
        success: function(result){
            var id_parent = $('#id-parent').val();
            var nama_pelapor = $('#nama-pelapor').val();
            var id_pelapor = $('#id-pelapor').val();
            var id_admin = $('#id-admin').val();
            var isi = $('#isi-laporan').val();
            var date = $('#date-laporan').val();
            var status = $('#status-laporan').val();
            replylaporan(id_parent, nama_pelapor, id_pelapor, isi, date, id_admin, status);
        }

        });
  });
});

function loadaduan(param){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'listDataAduan',
        data : {
                param      : 'all',
         },
        success: function(result){
                var dt = $('#list-aduan').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "searching": true,
                    "ordering": true,
                    "info": false,
                    "autoWidth": false,
                    "responsive": true,
                    "pageLength": 10,
                    "autoWidth": true,
                    aaData: result,
                    aoColumns: [
                        { 'mDataProp': 'id'},
                        { 'mDataProp': 'status'},
                        { 'mDataProp': 'nama_pelapor'},
                        { 'mDataProp': 'judul'},
                        { 'mDataProp': 'nama_kota'},
                        { 'mDataProp': 'create_date'},
                        { 'mDataProp': 'create_date'},

                    ],
                    order: [[0, 'ASC']],
                    aoColumnDefs:[
                      {
                          "mRender": function ( data, type, row ) {
                            var el =
                            `<div class="icheck-primary">
                              <input type="checkbox" value="`+row.id+`" name="aduan" id="check-`+row.id+`">
                              <label for="check-`+row.id+`"></label>
                            </div>`;
                              return el;
                          },
                          "aTargets": [ 0 ]
                      },
                      {
                          "mRender": function ( data, type, row ) {
                            var el = '';
                            if($('#role').val() == '30'){
                              if(row.status == "NULL"){
                                el ='<span class="badge badge-info">belum dibaca</span>';
                              }else if (row.status == "1"){
                                el = '<span class="badge badge-success">dibalas admin</span>';
                              }else if (row.status == "3"){
                                el = '<span class="badge badge-default">sudah dibaca</span>';
                              }else if (row.status == "4"){
                                el = '<span class="badge badge-danger">close</span>';
                              }else if (row.status == "2"){
                                el = '<span class="badge badge-default">terkirim</span>';
                              }
                            }else{
                              if(row.status == "NULL"){
                                el ='<span class="badge badge-info">pesan baru</span>';
                              }else if (row.status == "4"){
                                el = '<span class="badge badge-danger">close</span>';
                              }else if (row.status == "2"){
                                el = '<span class="badge badge-success">dibalas user</span>';
                              }else if(row.status == "3"){
                                el = '<span class="badge badge-default">sudah dibaca</span>';
                              }else if(row.status == "1"){
                                el = '<span class="badge badge-default">terkirim</span>';
                              }
                            }

                              return el;
                          },
                          "aTargets": [ 1 ]
                      },
                      {
                          "mRender": function ( data, type, row ) {
                            var el = `
                                      <div class="row">
                                        <div class="col-md-4">
                                          <button onclick="replylaporan(`+row.id+`,'`+row.nama_pelapor+`','`+row.id_user+`','`+row.isi+`','`+row.create_date+`','`+row.id_admin+`','1')" type="button" class="btn btn-block btn-success btn-sm"><i class="fas fa-reply"></i></button>
                                        </div>
                                        <div class="col-md-4">
                                          <button onclick="closelaporan(`+row.id+`)" type="button" class="btn btn-block btn-danger btn-sm"><i class="fas fa-ban"></i></button>
                                        </div>
                                      </div>
                                        `;
                              if(row.status == "4"){
                                el = 'close';
                              }else{
                                el = el;
                              }

                              return el;
                          },
                          "aTargets": [ 6 ]
                      },
                    ],

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

                    }
                });

            }
    });
}

function replylaporan(id, nama_pelapor, id_pelapor, isi, date, id_admin, status){

  $('#modal-default').modal({
    show: true
  });

  $('#pesan-balasan').val("");
  $('#id-parent').val(id);
  $('#id-pelapor').val(id_pelapor);
  $('#id-admin').val(id_admin);
  $('#nama-pelapor').val(nama_pelapor);
  $('#date-laporan').val(date);
  $('#isi-laporan').val(isi);
  $('#status-laporan').val(status);
  $('#percakapan').empty();
  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'cekBalasan',
      data : {
              id      : id,
       },
      success: function(result){

        $('#pesan-balasan').val("");
        var cakap = "";
        cakap +=
          `<div class="direct-chat-msg">
            <div class="direct-chat-infos clearfix">
              <span class="direct-chat-name float-left">`+nama_pelapor+`</span>
              <span class="direct-chat-timestamp float-right">`+date+`</span>
            </div>
            <!-- /.direct-chat-infos -->
            <img class="direct-chat-img" src="assets/lte/dist/img/user1-128x128.jpg" alt="message user image">
            <!-- /.direct-chat-img -->
            <div class="direct-chat-text">
              `+isi+`
            </div>
            <!-- /.direct-chat-text -->
          </div>`;

          for (var i = 0; i < result.length; i++) {

            if(result[i].rep_admin  == '1'){
              var adm = "right";
              var ids = result[i].id_admin;
              var float_name = 'float-right';
              var float_date = 'float-left';
              var nama = result[i].nama_admin;
            }else{
              var adm = "";
              var ids = result[i].id_user;
              var float_name = 'float-left';
              var float_date = 'float-right';
              var nama = result[i].nama_pelapor;
            }

            cakap +=
            `<div class="direct-chat-msg `+adm+`">
              <div class="direct-chat-infos clearfix">
                <span class="direct-chat-name `+float_name+`">`+nama+`</span>
                <span class="direct-chat-timestamp `+float_date+`">`+result[i].create_date+`</span>
              </div>
              <img class="direct-chat-img" src="assets/lte/dist/img/user3-128x128.jpg" alt="message user image">
              <div class="direct-chat-text">
                `+result[i].isi+`
              </div>
            </div>`;

          }


          $('#percakapan').append(cakap);

      }
    });

}

function closelaporan(id){
  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'closeAduan',
      data : {
              id      : id,
       },
      success: function(result){
        window.location = $('#baseurl').val()+'listaduan';
      }
    });
}
