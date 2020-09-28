$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
  loadsiaran();
  loadvideo();
  loadaduan();
  $('#kirim-laporan').on('click', function(){
    var name = $('#name').val();
    var email = $('#email').val();
    var subject = $('#subject').val();
    var message = $('#message').val();
    kirimlaporan(name,email,subject,message)
  });

});

function kirimlaporan(name,email,subject,message){
$.ajax({
    type: 'post',
    dataType: 'json',
    url: 'saveAduan',
    data : {
            name      : name,
            email      : email,
            subject      : subject,
            message      : message,
     },
    success: function(result){

      window.location.href = "/dashboard";

    }
  });
}

function loadsiaran(param){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'listDataSiaran',
        data : {
                param      : 'all',
         },
        success: function(result){
                var dt = $('#data-siaran').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "searching": true,
                    "ordering": true,
                    "info": false,
                    "autoWidth": false,
                    "responsive": true,
                    "pageLength": 5,
                    "dom": '<"top"i>rt<"bottom"flp><"clear">',
                    "autoWidth": true,
                    aaData: result,
                    aoColumns: [
                        { 'mDataProp': 'id'},
                        { 'mDataProp': 'sebutanDiUdara'},
                        // { 'mDataProp': 'frekuensi'},
                        { 'mDataProp': 'alamat'},

                    ],
                    order: [[0, 'ASC']],
                    aoColumnDefs:[
                      {
                          "mRender": function ( data, type, row ) {
                            var el =
                            `<div class="media-left">
    														<div class=""><b class="text-default text-semibold">`+row.sebutanDiUdara+`</b></div>
    														<div class="text-muted text-size-small">
    															<span class="status-mark border-blue position-left"></span>
    															`+row.frekuensi+`
    														</div>
    													</div>`;
                              return el;
                          },
                          "aTargets": [ 1 ]
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

function loadaduan(){

    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'listDataAduanGlobal',
        data : {
                param      : 'all',
         },
        success: function(result){

                var dt = $('#data-aduan').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "searching": true,
                    "ordering": true,
                    "info": false,
                    "autoWidth": false,
                    "responsive": true,
                    "pageLength": 3,
                    "dom": '<"top"i>rt<"bottom"flp><"clear">',
                    "autoWidth": true,
                    aaData: result,
                    aoColumns: [
                        { 'mDataProp': 'id'},
                        { 'mDataProp': 'id_user'},

                    ],
                    order: [[0, 'ASC']],
                    aoColumnDefs:[
                      {
                          "mRender": function ( data, type, row ) {
                            var el =
                            `<div class="direct-chat-msg">
                                <div class="direct-chat-infos clearfix">
                                  <span class="direct-chat-name float-left">`+row.name+`</span>
                                  <span class="direct-chat-timestamp float-right">`+row.create_date+`</span>
                                </div>
                                <!-- /.direct-chat-infos -->
                                <img class="direct-chat-img" src="assets/lte/dist/img/user1-128x128.jpg" alt="message user image">
                                <!-- /.direct-chat-img -->
                                <div class="direct-chat-text">
                                  `+row.isi+`
                                </div>
                                <!-- /.direct-chat-text -->
                              </div>`;
                              return el;
                          },
                          "aTargets": [ 1 ]
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

var current_page = 1;
var records_per_page = 6;
var data = [];

var objJson = [
    { adName: "AdName 1"},
    { adName: "AdName 2"},
    { adName: "AdName 3"},
    { adName: "AdName 4"},
    { adName: "AdName 5"},
    { adName: "AdName 6"},
    { adName: "AdName 7"},
    { adName: "AdName 8"},
    { adName: "AdName 9"},
    { adName: "AdName 10"},
]; // Can be obtained from another source, such as your objJson variable

function loadvideo(){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'listDataVideo',
        data : {
                param      : 'all',
         },
        success: function(result){
          data = result;
          changePage(1);
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
            "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
          ];

          var content = '';
          // for (var i = 0; i < result.length; i++) {
          //   var url = result[i].url.split("?v=")[1];
          //   const d = new Date(result[i].update_date);
          //   content +=
          //   `<div class="col-md-4">
          //     <div class="blog-grid">
          //       <div class="blog-img">
          //         <div class="date">
          //         <span>`+d.getDate()+`</span>
          //         <label>`+monthNames[d.getMonth()]+`</label>
          //         </div>
          //         <a href="#">
          //         <iframe class="tutor" src="//www.youtube.com/embed/`+url+`"></iframe>
          //         </a>
          //         </div>
          //         <div class="blog-info">
          //         <h5><a href="#">`+result[i].judul+`</a></h5>
          //         <p>`+result[i].desc+`.</p>
          //         <div class="btn-bar">
          //         <a href="`+result[i].url+`" class="px-btn-arrow" target="_blank">
          //         <span>Tonton Video</span>
          //         <i class="arrow"></i>
          //         </a>
          //         </div>
          //       </div>
          //     </div>
          //   </div>`;
          // }
          content +=
          `<div class="col-12">
              <ul class="pagination justify-content-center">
                  <li class="page-item disabled">
                      <a class="page-link" href="javascript:prevPage()" id="btn_prev"><i class="fas fa-chevron-left"></i></a>
                  </li>
                  <li class="page-item active"><a class="page-link" href="#">1 <span class="sr-only">(current)</span></a></li>
                  <li class="page-item">
                      <a class="page-link" href="#">2</a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                      <a class="page-link" href="javascript:nextPage()" id="btn_next" ><i class="fas fa-chevron-right"></i></a>
                  </li>
              </ul>
          </div>`;



          // $('#video-grid').append(content);

        }
      });
    };

    function changePage(page)
    {

    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    // var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    // listing_table.innerHTML = "";

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
      "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
    ];

    var content = "";
    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < data.length; i++) {
        var url = data[i].url.split("?v=")[1];
        const d = new Date(data[i].update_date);
        content +=
          `<div class="col-md-4">
            <div class="blog-grid">
              <div class="blog-img">
                <div class="date">
                <span>`+d.getDate()+`</span>
                <label>`+monthNames[d.getMonth()]+`</label>
                </div>
                <a href="#">
                <iframe class="tutor" src="//www.youtube.com/embed/`+url+`"></iframe>
                </a>
                </div>
                <div class="blog-info">
                <h5><a href="#">`+data[i].judul+`</a></h5>
                <p>`+data[i].desc+`.</p>
                <div class="btn-bar">
                <a href="`+data[i].url+`" class="px-btn-arrow" target="_blank">
                <span>Tonton Video</span>
                <i class="arrow"></i>
                </a>
                </div>
              </div>
            </div>
          </div>`;
    }
    page_span.innerHTML = page;
    $('#video-grid').html(content);

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
  }

    function prevPage()
    {
        if (current_page > 1) {
            current_page--;
            changePage(current_page);
        }
    }

    function nextPage()
    {

        if (current_page < numPages()) {

            current_page++;
            changePage(current_page);
        }
    }

    function numPages()
    {
        return Math.ceil(data.length / records_per_page);
    }
