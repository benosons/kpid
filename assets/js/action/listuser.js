$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
  $('.select2').select2();
  var st = true;
  $("input[data-bootstrap-switch]").each(function(){
    // $(this).bootstrapSwitch('state', $(this).prop('checked'));
    $(this).bootstrapSwitch({
      onSwitchChange: function(e, state) {
        st = state;
      }
    });
  });
  $('.bootstrap-switch-handle-on').html('Aktif');
  $('.bootstrap-switch-handle-off').html('Non Aktif');

  $('#users > a').attr('class','nav-link active');
  $('#add-users').on('click', function(){
    $('#modal-default').modal({
      show: true
    });
    $('.modal-title').html('Tambah User');
    $('#password').attr('disabled', false);
    $("[name='user-input']").val('');
    // $("#kota-kab").select2('data', {}).trigger('change');
    $('#kota-kab').val(0).trigger('change');
  });

  $('#save-user').on('click', function(){
    saveUser(st);
  });

  loadkota();
  loaddatauser();

  $( "#btn-view-pass" ).mousedown(function(e) {
      $('#password').prop('type', 'text');
      $('#btn-view-pass > i').attr('class','far fa-eye-slash');
  });

  $( "#btn-view-pass" ).mouseup(function(e) {
      $('#password').prop('type', 'password');
      $('#btn-view-pass > i').attr('class','far fa-eye');
  });

});

function loadkota(){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'loadkota',
        data : {
                param      : '',
         },
        success: function(result){
          $('#kota-kab').empty();
          var option ='<option value="0">-Pilih-</option>';
          for (var i = 0; i < result.length; i++) {
            option += '<option value="'+result[i].id+'">'+result[i].nama+'</option>';
          }
          $('#kota-kab').append(option);
        }
      });
    };

    function loaddatauser(){
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: 'listDataUser',
            data : {
                    param      : '',
             },
            success: function(result){
                    var dt = $('#listuser').DataTable({
                        responsive: true,
                        bDestroy: true,
                        processing: true,
                        autoWidth : true,
                        pageLength: 10,
                        lengthChange: true,
                        aaData: result,
                        aoColumns: [
                            { 'mDataProp': 'id'},
                            { 'mDataProp': 'username'},
                            { 'mDataProp': 'role_desc'},
                            { 'mDataProp': 'nama_kotakab'},
                            { 'mDataProp': 'status'},
                            { 'mDataProp': 'islogin'},
                            { 'mDataProp': 'kotaKab'},
                            // { 'mDataProp': 'role'},
                        ],
                        order: [[0, 'ASC']],
                        aoColumnDefs:[
                          // {
                          //   targets: [7],
                          //   visible: false
                          // },
                            {
                                mRender: function (data, type, row){
                                    var $rowData = '';
                                        $rowData += `
                                                  <div class="row">
                                                    <div class="col-md-4">
                                                      <button onclick="modaldetail('`+row.id+`','`+row.username+`','`+row.role+`','`+row.kotaKab+`','`+row.status+`')" type="button" class="btn btn-block btn-success btn-sm"><i class="far fa-eye"></i></button>
                                                    </div>
                                                    <div class="col-md-4">
                                                      <button onclick="edituser('`+row.id+`','`+row.username+`','`+row.password+`','`+row.kotaKab+`','`+row.status+`','`+row.role+`')" type="button" class="btn btn-block btn-warning btn-sm"><i class="far fa-edit"></i></button>
                                                    </div>
                                                    <div class="col-md-4">
                                                      <button onclick="deleteData(`+row.id+`)" type="button" class="btn btn-block btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                                                    </div>
                                                  </div>
                                                    `;

                                    return $rowData;
                                },
                                aTargets: [6]
                            },
                            {
                                mRender: function (data, type, row){
                                  var $rowData = '';
                                  if(row.islogin == 1){
                                        $rowData +=`<span class="badge badge-success right">Online</span>`;
                                      }else{
                                        $rowData +=`<span class="badge badge-default right">Offline</span>`;
                                      }

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
                                        $rowData +=`<span class="badge badge-warning right">Non Aktif</span>`;
                                      }

                                    return $rowData;
                                },
                                aTargets: [4]
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

    function saveUser(st){
      var stat;
        switch (st) {
          case false:
              stat = '0';
            break;
          default:
              stat = '1'
        }

        if($('#id').val()){
          var baseurl = 'updateUser';
        }else{
          var baseurl = 'saveUser';
        }

        $.ajax({
            type: 'post',
            dataType: 'json',
            url: baseurl,
            data : {
                    id            : $('#id').val(),
                    username      : $('#username').val(),
                    password      : $('#password').val(),
                    status        : stat,
                    kotaKab       : $("#kota-kab option:selected").val(),
                    role          : $("input[name='role']:checked").val(),
             },
            success: function(result){
              loaddatauser();
            }
          });
        };

function edituser(id, username, password, kotakab, status, role){
  $('#add-users').trigger('click');
  $('.modal-title').html('Edit User');
  $('#id').val(id);
  $('#username').val(username);
  $('#password').val(password);
  $('#password').attr('disabled', true);
  $('#kota-kab').val(kotakab).trigger('change');
  $("#stat").bootstrapSwitch('state', status == '1' ? true : false);

  if(role == '10'){
    $("#super-admin").attr('checked', true).trigger('click');
  }else{
    $("#admin").attr('checked', true).trigger('click');
  }
}

function deleteData(id)
{
  $.ajax({
    type: 'post',
    dataType: 'json',
    url: 'deleteUser',
    data : {
            id    : id,
          },
    success: function(data)
    {
      loaddatauser();
    }
  });

}
