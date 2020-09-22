<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Siaran extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Model_siaran');
		$this->logs = $this->session->all_userdata();
		$this->logged = $this->session->userdata('userLogged');
		$this->kategori = $this->session->userdata('kategori');
		$this->username = $this->session->userdata('username');
		$this->kotaKab = $this->session->userdata('kotaKab');
		$this->content = array(
			"base_url" => base_url(),
			"logs" => $this->session->all_userdata(),
		);

	}

	public function listtelevisi()
	{
		if ( $this->logged && $this->kategori == 'admin' || $this->kategori == 'superAdmin')
		{
			$this->twig->display('admin/listtelevisi.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function formPangan()
	{
		if ( $this->logged && $this->kategori == 'admin' || $this->kategori == 'superAdmin')
		{

			$data = NULL;
			$id = $this->input->get('id');
			$idx = $this->db->escape_str($id);
            $KodeEdit = $idx;
            if (!empty($KodeEdit)) {
                $q = $this->db->get_where("pangan", array("id" => $KodeEdit));
                $data = $q->row();
            }

            $this->content['data'] = $data;
			$this->twig->display('admin/pangan.html', $this->content);
		}else{
			redirect("Dashboard");
		}
	}

	public function savePangan()
	{
		if ( $this->logged && $this->kategori == 'admin' || $this->kategori == 'superAdmin')
		{
			$params = (object)$this->input->post();
 	        $data = $this->Model_pangan->save($params);
 	        echo json_encode(array("status" => TRUE));
		}
		else
		{
			redirect("Dashboard");
		}
	}


	public function updatePangan()
	{
		if ( $this->logged && $this->kategori == 'admin' || $this->kategori == 'superAdmin')
		{
			$params = (object)$this->input->post();
		 	$data = $this->Model_pangan->update($params);
		 	echo json_encode(array("status" => TRUE));
		}
		else
		{
			redirect("Dashboard");
		}
	}

	public function deletePangan($id = NULL)
	{
		$this->Model_pangan->delete($id);
		echo json_encode(array("status" => TRUE));
	}

	public function listDataSiaran()
	{
		if ($this->logged && $this->kategori == 'admin' || $this->kategori == 'superAdmin')
		{
			$params = $columns = $totalRecords = $data = array();
			$params = $_REQUEST;
			$postData = $this->input->post('param');

			$query = $this->Model_siaran->listDataSiaran($postData);
			$x = 0;
			$i=0;
			foreach ($query as $proses) {
				$x++;
				$row = array();
				$row['id'] = (!empty($proses->id) ? $proses->id : "NULL");
				$row['namaBadanHukum'] = (!empty($proses->namaBadanHukum) ? $proses->namaBadanHukum : "NULL");
				$row['noIPP'] = (!empty($proses->noIPP) ? $proses->noIPP : "NULL");
				$row['sebutanDiUdara'] = (!empty($proses->sebutanDiUdara) ? $proses->sebutanDiUdara : "NULL");
				$row['pimpinan'] = (!empty($proses->pimpinan) ? $proses->pimpinan : "NULL");
				$row['alamat'] = (!empty($proses->alamat) ? $proses->alamat : "NULL");
				$row['email'] = (!empty($proses->email) ? $proses->email : "NULL");
				$row['frekuensi'] = (!empty($proses->frekuensi) ? $proses->frekuensi : "NULL");
				$row['wilayahLayanan'] = (!empty($proses->wilayahLayanan) ? $proses->wilayahLayanan : "NULL");
				$row['kontak'] = (!empty($proses->kontak) ? $proses->kontak : "NULL");

				// if ($this->kategori == 'superAdmin') {
					// $row[] = '<a href="'.base_url().'formPangan/?id='.$proses->id.'" class="btn btn-sm btn-info" title="Edit" id="Edit"><i class="fa fa-edit"></i> Edit </a> <a class="btn btn-sm btn-danger" href="javascript:void(0)" title="Hapus" onclick="deleteData('."'".$proses->id."'".')"><i class="fa fa-trash"></i> Delete</a> ';
				// }else{
				// 	$row[] = '<a href="javascript:void(0)" class="btn btn-sm btn-success" title="Hasil" onclick="view('."'".$proses->id."'".')" id="view"><i class="fa fa-eye"></i> View </a> <a class="btn btn-sm btn-danger" href="javascript:void(0)" title="Hapus" onclick="deleteData('."'".$proses->id."'".')"><i class="fa fa-trash"></i> Delete</a> ';
				// }



				//add html for action
				$data[] = $row;
			}

      //           $output = array(
    	// 		                "draw" => $_POST['draw'],
      //                           "recordsTotal" => $this->Model_siaran->count_all(),
      //                           "recordsFiltered" => $this->Model_siaran->count_filtered(),
    	//                          "data" => $data
    	//                          );
			// //output to json format
			header('Content-Type: application/json');
			echo json_encode($data);
		}else{
			redirect("dashboard");
		}


	}

	public function dataDetailPangan()
	{
		if ($this->logged && $this->kategori == 'admin' || $this->kategori == 'superAdmin')
		{
			$no = $_POST['no'];
			$data = $this->Model_pangan->dataDetail($no);
			echo json_encode($data);
		}
		else
		{
			redirect("Dashboard");
		}
	}

}
