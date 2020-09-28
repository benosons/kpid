<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sys extends CI_Controller {

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
		$this->load->model('Model_sys');
		$this->logs = $this->session->all_userdata();
		$this->logged = $this->session->userdata('userLogged');
		$this->kategori = $this->session->userdata('kategori');
		$this->role = $this->session->userdata('role');
		$this->username = $this->session->userdata('username');
		$this->kotaKab = $this->session->userdata('kotaKab');
		$this->content = array(
			"base_url" => base_url(),
			"logs" => $this->session->all_userdata(),
			"username" => $this->username,
			"role" => $this->role
		);

	}


	public function dashboard()
	{
		if ( $this->logged)
		{
			if( $this->role == '10' || $this->role == '20' || $this->role == '30'){
				$this->twig->display('admin/index.html', $this->content);
			}else{
				redirect("/");
			}
		}else{
			redirect("logout");
		}
	}

	public function loadkota(){

			$params = $columns = $totalRecords = $data = array();
			$params = $_REQUEST;
			$postData = $this->input->post('param');

			$query = $this->Model_sys->loadkota($postData);
			$x = 0;
			$i=0;
			foreach ($query as $proses) {
				$x++;
				$row = array();
				$row['id'] = (!empty($proses->id) ? $proses->id : "NULL");
				$row['id_provinsi'] = (!empty($proses->id_provinsi) ? $proses->id_provinsi : "NULL");
				$row['nama'] = (!empty($proses->nama) ? $proses->nama : "NULL");

				$data[] = $row;
			}
			header('Content-Type: application/json');
			echo json_encode($data);
	}

	public function listUser()
	{
		if ($this->logged) {
			if($this->role == '10'){
				$this->twig->display('admin/listUser.html', $this->content);
			}else{
				redirect("dashboard");
			}
		}else{
			redirect("logout");
		}
	}

	public function listDataUser()
	{
		if ($this->logged && $this->role == '10')
		{
			$params = $columns = $totalRecords = $data = array();
			$params = $_REQUEST;
			$postData = $this->input->post('param');

			$query = $this->Model_sys->listDataUsers($postData);
			$x = 0;
			$i=0;
			foreach ($query as $proses) {
				$x++;
				$row = array();
				$row['id'] = (!empty($proses->id) ? $proses->id : "NULL");
				$row['username'] = (!empty($proses->username) ? $proses->username : "NULL");
				$row['kategori'] = (!empty($proses->kategori) ? $proses->kategori : "NULL");
				$row['kotaKab'] = (!empty($proses->kotaKab) ? $proses->kotaKab : "NULL");
				$row['nama_kotakab'] = (!empty($proses->nama_kotakab) ? $proses->nama_kotakab : "NULL");
				$row['status'] = (!empty($proses->status) ? $proses->status : "NULL");
				$row['islogin'] = (!empty($proses->islogin) ? $proses->islogin : "NULL");
				$row['role'] = (!empty($proses->role) ? $proses->role : "NULL");
				$row['role_desc'] = (!empty($proses->role_desc) ? $proses->role_desc : "NULL");

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

	public function saveUser()
	{
		$params = (object)$this->input->post();
		$data = $this->Model_sys->save($params);
		header('Content-Type: application/json');
		echo json_encode(array("status" => TRUE));

	}

	public function updateUser()
	{
		$params = (object)$this->input->post();
		$data = $this->Model_sys->update($params);
		header('Content-Type: application/json');
		echo json_encode(array("status" => TRUE));

	}

	public function deleteUser()
	{

		$params = (object)$this->input->post();
		$this->Model_sys->delete($params);
		header('Content-Type: application/json');
		echo json_encode(array("status" => TRUE));
	}


}
