$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
    
	    var tabel;        
          tabel = $('#dataTables').DataTable({
            "processing": true, //Feature control the processing indicator.
            "serverSide": true, //Feature control DataTables' server-side processing mode.
            "order": [], //Initial no order.
            // Load data for the table's content from an Ajax source
            "ajax": {
                "url": "listDataUser" ,
                "type": "POST"
            },
            //Set column definition initialisation properties.
                 "columnDefs": [
            { 
                "targets": [ -1 ], //last column
                "orderable": false, //set not orderable
            },
               ],
              "responsive": true,
              "pageLength": 50,
              "language": {
                      "emptyTable":     "Tidak ada data.."
                  }
            });

            function deleteData(id)
            {
                if(confirm('Are you sure delete this data?'))
                {
                    // ajax delete data to database
                    
                    $.ajax({
                        url : "{{ base_url }}deleteUser/" + id,
                        type: "POST",
                        dataType: "JSON",
                        success: function(data)
                        {
                            window.location = "{{ base_url }}listUser";
                        },
                        error: function (jqXHR, textStatus, errorThrown)
                        {
                            alert('Error deleting data');
                        }
                    });
        
                }
            }
            
            function view(no){
                $('#modal_detail').modal('show'); // show bootstrap modal when complete loaAirMinum
                $('.modal-title').text('Detail'); // Set title to Bootstrap modal title
        
                jQuery('.itemRow').remove();
                $.ajax({
                    url : "{{ base_url }}dataDetailUser",
                    type: "POST",
                    data:{no:no},
                    dataType: "JSON",
                    success: function(data)
                    {   
                        var x = 1;
                        var nf = new Intl.NumberFormat();
                            for(i in data)
                            {
                                $('#dataDetail').append($('<table width="100%" class=" itemRow table2 table-striped table-bordered table-hover"><tr><td width="100px">Jiwa</td><td width="150px"><input type="text" value="'+data[i].jiwa+'" readonly></td></tr><tr><td width="100px">KK</td><td width="150px"><input type="text" value="'+data[i].kk+'" readonly></td></tr><tr><td width="100px">Rumah</td><td width="150px"><input type="text" value="'+data[i].rumah+'" readonly></td></tr><tr><td width="100px">PDAM</td><td width="150px"><input type="text" value="'+data[i].pdam+'" readonly></td></tr><tr><td width="100px">PAM Desa</td><td width="150px"><input type="text" value="'+data[i].pamDesa+'" readonly></td></tr><tr><td width="100px">Sumur Bor</td><td width="150px"><input type="text" value="'+data[i].sumurB+'" readonly></td></tr><tr><td width="100px">Sumur Terlindungi</td><td width="150px"><input type="text" value="'+data[i].sumurT+'" readonly></td></tr><tr><td width="100px">Sumur Tak Terlindungi</td><td width="150px"><input type="text" value="'+data[i].sumurTT+'" readonly></td></tr><tr><td width="100px">Mata Air Terlindungi</td><td width="150px"><input type="text" value="'+data[i].mataAirT+'" readonly></td></tr><tr><td width="100px">Mata Air Tak Terlindungi</td><td width="150px"><input type="text" value="'+data[i].mataAirTT+'" readonly></td></tr><tr><td width="100px">Sungai/Danau/Kolam</td><td width="150px"><input type="text" value="'+data[i].sungai+'" readonly></td></tr><tr><td width="100px">Air Hujan</td><td width="150px"><input type="text" value="'+data[i].airHujan+'" readonly></td></tr><tr><td width="100px">Tangki/Mobil/Grobak</td><td width="150px"><input type="text" value="'+data[i].tangki+'" readonly></td></tr><tr><td width="100px">Galon</td><td width="150px"><input type="text" value="'+data[i].galon+'" readonly></td></tr><tr><td width="100px">Lain-lain</td><td width="150px"><input type="text" value="'+data[i].lain+'" readonly></td></tr></table>'));
                               
                                x++;
                            }
                    },
                    error: function (jqXHR, textStatus, errorThrown)
                    {
                        notif('danger', 'GAGAL! Error get data from ajax');
                    }
                });
            }
});