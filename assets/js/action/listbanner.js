$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
  $('.select2').select2();
  var st = true;
  window.img = '';
  $("input[data-bootstrap-switch]").each(function(){
    // $(this).bootstrapSwitch('state', $(this).prop('checked'));
    $(this).bootstrapSwitch({
      onSwitchChange: function(e, state) {
        st = state;
      }
    });
  });
  $('.bootstrap-switch-handle-on').html('Aktif');
  $('.bootstrap-switch-handle-off').html('Tidak');

  $('#setting').attr('class','menu-open nav-item');
  $('#setting > a').attr('class','nav-link active');
  $('#data-info').attr('class','nav-link active');
  $('#data-info > i').attr('class','far fa-circle nav-icon text-danger');

  $('#add-banner').on('click', function(){
    $('#modal-default').modal({
      show: true
    });
    $('#id').val('');
    $('.modal-title').html('Tambah Banner');
    $("[name='banner-input']").val('');
    $('#blah').attr('src', 'assets/dokumen/gambar/user/default.jpg');
    $('label[for="foto-user"]').text('Pilih Foto');
  });

  $('#save-banner').on('click', function(){
    $(this).attr('disabled');
      savebanner();
  });

  loadbanner();
  loadsetting();

  $( "#btn-view-pass" ).mousedown(function(e) {
      $('#password').prop('type', 'text');
      $('#btn-view-pass > i').attr('class','far fa-eye-slash');
  });

  $( "#btn-view-pass" ).mouseup(function(e) {
      $('#password').prop('type', 'password');
      $('#btn-view-pass > i').attr('class','far fa-eye');
  });

  $("#foto-user").change(function() {
    readURL(this);
  });

  $("#simpan-perubahan").on('click', function(){
    rubahsetting();
  });

});

    function loadbanner(){

        $.ajax({
            type: 'post',
            dataType: 'json',
            url: 'listdatabanner',
            data : {
                    param      : '',
             },
            success: function(result){
                    var dt = $('#listbanner').DataTable({
                        responsive: true,
                        bDestroy: true,
                        processing: true,
                        autoWidth : false,
                        pageLength: 10,
                        lengthChange: true,
                        aaData: result,
                        aoColumns: [
                            { 'mDataProp': 'id'},
                            { 'mDataProp': 'foto'},
                            { 'mDataProp': 'judul'},
                            { 'mDataProp': 'deskripsi'},
                            { 'mDataProp': 'status'},
                            { 'mDataProp': 'status'},
                            // { 'mDataProp': 'role'},
                        ],
                        order: [[0, 'ASC']],
                        aoColumnDefs:[
                            { "width": "30%", "targets": 3 },
                            { "width": "20%", "targets": 2 },
                            { "width": "10%", "targets": 2 },
                            {
                                mRender: function (data, type, row){
                                    var $rowData = '';
                                        $rowData += `
                                                  <div class="row">
                                                    <div class="col-md-4">
                                                      <button onclick="editbanner(`+row.id+`,'`+row.judul+`','`+row.deskripsi+`','`+row.status+`','`+row.foto+`')" type="button" class="btn btn-block btn-warning btn-sm"><i class="far fa-edit"></i></button>
                                                    </div>
                                                    <div class="col-md-4">
                                                      <button onclick="deleteData(`+row.id+`,'`+row.foto+`')" type="button" class="btn btn-block btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                                                    </div>
                                                  </div>
                                                    `;

                                    return $rowData;
                                },
                                aTargets: [5]
                            },
                            {
                                mRender: function (data, type, row){
                                  var $rowData = '';
                                  if(row.status == 1){
                                        $rowData +=`<span class="badge badge-primary right">Aktif</span>`;
                                      }else{
                                        $rowData +=`<span class="badge badge-default right">Tidak</span>`;
                                      }

                                    return $rowData;
                                },
                                aTargets: [4]
                            },
                            {
                                mRender: function (data, type, row){
                                  var $rowData = '<img src="'+row.foto+'" style="width: 35px;"></img>';
                                    return $rowData;
                                },
                                aTargets: [1]
                            }
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

    function loadsetting(){
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: 'loadsetting',
            data : {
                    param      : '',
             },
            success: function(result){
              $('#set-id').val(result[0].id);
              $('#set-nama').val(result[0].nama);
              $('#set-deskripsi').val(result[0].deskripsi);
              $('#set-alamat').val(result[0].alamat);
              $('#set-email').val(result[0].email);
              $('#set-notelp').val(result[0].notlp);
              $('#set-ig').val(result[0].instagram);
              $('#set-twit').val(result[0].twitter);
              $('#set-fb').val(result[0].facebook);

            }
          });
        }

    function savebanner(){
      var img = window.img;
        if($('#id').val()){
          var url = 'updatebanner';
          var msg = 'Update';
        }else{
          var url = 'savebanner';
          var msg = 'Tambah';
        }
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: url,
            data : {
                    id            : $('#id').val(),
                    judul         : $('#judul').val(),
                    deskripsi     : $('#deskripsi').val(),
                    status        : ($("#stat").bootstrapSwitch('state') === true ? '1' : '0'),
                    img           : img,
             },
            success: function(result){
              Swal.fire({
                title: 'Sukses!',
                text: msg + ' Banner',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              });

              $('#modal-default').modal('hide');
              loadbanner();
            }
          });
        };

function editbanner(id, judul, deskripsi, status, foto){
  $('#add-banner').trigger('click');
  $('.modal-title').html('Edit Banner');
  $('#id').val(id);
  $('#judul').val(judul);
  $('#deskripsi').val(deskripsi);
  let fot = foto.split("/");
  $('label[for="foto-user"]').text(fot[fot.length - 1]);
  $('#blah').attr('src', foto);
  $("#stat").bootstrapSwitch('state', status == '1' ? true : false);

}

function deleteData(id,path)
{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Anda Yakin, hapus Banner?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '<i class="fas fa-check"></i> Ya',
    cancelButtonText: '<i class="fas fa-times"></i> Tidak',
    reverseButtons: true
  }).then((result) => {
  if (result.isConfirmed) {
    $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'deletebanner',
      data : {
              id    : id,
              path : path
            },
      success: function(data)
      {
        Swal.fire({
          title: 'Sukses!',
          text: 'Hapus Banner',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        loadbanner();
      }
    });
  }
})

}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#blah').attr('src', e.target.result);
      window.img = e.target.result;
    }
    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}

function modaldetail(id,username,role,kotaKab,status,name,foto, nama_kotakab){
    $('#modal-detail').modal({
      show: true
    });

    $('.modal-title').html('Detail');

    var stt = '';
    if(status == 1){
      stt +=`<span class="badge badge-primary right">Aktif</span>`;
    }else{
      stt +=`<span class="badge badge-warning right">Non Aktif</span>`;
    }

    $('#detail-foto').attr('src', foto);
    $('#detail-name').text(name);
    $('#detail-username').html('username: <i>'+username+'</i>');
    $('#detail-kotakab').text(nama_kotakab);
    $('#detail-status').html(stt);
    $('#detail-role').text(role);
}

    function rubahsetting(){
      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'simpansetting',
          data : {
                  id : $('#set-id').val(),
                  nama : $('#set-nama').val(),
                  deskripsi : $('#set-deskripsi').val(),
                  alamat : $('#set-alamat').val(),
                  email : $('#set-email').val(),
                  notlp : $('#set-notelp').val(),
                  ig : $('#set-ig').val(),
                  twit : $('#set-twit').val(),
                  fb : $('#set-fb').val()
           },
          success: function(result){
            Swal.fire({
              title: 'Sukses!',
              text: 'Informasi diperbaharui',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            });

            setTimeout(function(){ window.location.href = $('#baseurl').val()+"infodata"; }, 2500);

          }
    });
  };
