$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
  loadsiaran();

});
function loadsiaran(){

    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'listDataSiaran',
        data : {
                param      : param,
         },
        success: function(result){
                var dt = $('#data-televisi').DataTable({
                    responsive: true,
                    bDestroy: true,
                    processing: true,
                    autoWidth : true,
                    pageLength: 10,
                    lengthChange: true,
                    aaData: result,
                    aoColumns: [
                        { 'mDataProp': 'id'},
                        { 'mDataProp': 'sebutanDiUdara'},
                        { 'mDataProp': 'frekuensi'},
                        { 'mDataProp': 'alamat'},
                        { 'mDataProp': 'alamat'},

                    ],
                    order: [[0, 'ASC']],
                    aoColumnDefs:[
                        {
                            mRender: function (data, type, row){
                                var $rowData = '';
                                    $rowData += `
                                              <div class="row">
                                                <div class="col-md-4">
                                                  <button onclick="modaldetail('`+row.namaBadanHukum+`','`+row.pimpinan+`','`+row.alamat+`','`+row.email+`','`+row.frekuensi+`','`+row.wilayahLayanan+`','`+row.kontak+`','`+row.koor+`')" type="button" class="btn btn-block btn-success btn-sm"><i class="far fa-eye"></i></button>
                                                </div>
                                                <div class="col-md-4">
                                                  <button type="button" class="btn btn-block btn-warning btn-sm"><i class="far fa-edit"></i></button>
                                                </div>
                                                <div class="col-md-4">
                                                  <button type="button" class="btn btn-block btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
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
