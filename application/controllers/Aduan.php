<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Aduan extends CI_Controller {

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
		$this->load->model('Model_aduan');
		$this->logs = $this->session->all_userdata();
		$this->logged = $this->session->userdata('userLogged');
		$this->kategori = $this->session->userdata('kategori');
		$this->username = $this->session->userdata('username');
		$this->kotaKab = $this->session->userdata('kotaKab');
		$this->role = $this->session->userdata('role');
		$this->content = array(
			"base_url" => base_url(),
			"logs" => $this->session->all_userdata(),
			"username" => $this->username,
			"role" => $this->role
		);

	}

	public function listaduan()
	{
		if ( $this->logged)
		{
			if($this->role == '10' || $this->role == '20' || $this->role = '30'){

				$this->twig->display('admin/listaduan.html', $this->content);
			}
		}else{
			redirect("Dashboard");
		}
	}

	public function saveAduan()
	{
		if ( $this->logged){
			if($this->role == '30'){
				$params = (object)$this->input->post();
	 	    $data = $this->Model_aduan->save($params);
				header('Content-Type: application/json');
				echo json_encode(array("status" => TRUE));
			}
		} else {
			redirect("logout");
		}
	}

	public function listDataAduanGlobal()	{
		if ($this->logged){

			$params = $columns = $totalRecords = $data = array();
			$params = $_REQUEST;
			$postData = $this->input->post('param');

			$query = $this->Model_aduan->listDataAduanGlobal($postData);
			$x = 0;
			$i=0;
			foreach ($query as $proses) {
				$x++;
				$row = array();
				$row['id'] = (!empty($proses->id) ? $proses->id : "NULL");
				$row['name'] = (!empty($proses->name) ? $proses->name : "NULL");
				$row['id_user'] = (!empty($proses->id_user) ? $proses->id_user : "NULL");
				$row['judul'] = (!empty($proses->judul) ? $proses->judul : "NULL");
				$row['isi'] = (!empty($proses->isi) ? $proses->isi : "NULL");
				$row['create_date'] = (!empty($proses->create_date) ? $proses->create_date : "NULL");

				$data[] = $row;
			}
			header('Content-Type: application/json');
			echo json_encode($data);
	}
}

public function listDataAduan()	{
	if ($this->logged){

		$params = $columns = $totalRecords = $data = array();
		$params = $_REQUEST;
		$postData = $this->input->post('param');

		$query = $this->Model_aduan->listDataAduan($postData);
		$x = 0;
		$i=0;
		foreach ($query as $proses) {
			$x++;
			$row = array();
			$row['id'] = (!empty($proses->id) ? $proses->id : "NULL");
			$row['nama_pelapor'] = (!empty($proses->nama_pelapor) ? $proses->nama_pelapor : "NULL");
			$row['id_user'] = (!empty($proses->id_user) ? $proses->id_user : "NULL");
			$row['id_admin'] = (!empty($proses->id_admin) ? $proses->id_admin : "NULL");
			$row['judul'] = (!empty($proses->judul) ? $proses->judul : "NULL");
			$row['isi'] = (!empty($proses->isi) ? $proses->isi : "NULL");
			$row['create_date'] = (!empty($proses->create_date) ? $proses->create_date : "NULL");
			$row['nama_kota'] = (!empty($proses->nama_kota) ? $proses->nama_kota : "NULL");
			$row['status'] = (!empty($proses->status) ? $proses->status : "NULL");

			$data[] = $row;
		}
		header('Content-Type: application/json');
		echo json_encode($data);
	}
}

public function cekBalasan()	{
	if ($this->logged){

		$params = $columns = $totalRecords = $data = array();
		$params = $_REQUEST;
		$postData = $this->input->post('id');

		$query = $this->Model_aduan->cekBalasan($postData);

		$x = 0;
		$i=0;
		foreach ($query as $proses) {
			$x++;
			$row = array();
			$row['id'] = (!empty($proses->id) ? $proses->id : "NULL");
			$row['id_parent'] = (!empty($proses->id_parent) ? $proses->id_parent : "NULL");
			$row['id_user'] = (!empty($proses->id_user) ? $proses->id_user : "NULL");
			$row['id_admin'] = (!empty($proses->id_admin) ? $proses->id_admin : "NULL");
			$row['rep_user'] = (!empty($proses->rep_user) ? $proses->rep_user : "NULL");
			$row['rep_admin'] = (!empty($proses->rep_admin) ? $proses->rep_admin : "NULL");
			$row['create_date'] = (!empty($proses->create_date) ? $proses->create_date : "NULL");
			$row['isi'] = (!empty($proses->isi) ? $proses->isi : "NULL");
			$row['nama_pelapor'] = (!empty($proses->nama_pelapor) ? $proses->nama_pelapor : "NULL");
			$row['nama_admin'] = (!empty($proses->nama_admin) ? $proses->nama_admin : "NULL");

			$data[] = $row;
		}
		if(!$data){
			$params['id_parent'] = $this->input->post('id');
			$params['status'] = '3';
			$update = $this->Model_aduan->updateAduan((object)$params);
		}
		header('Content-Type: application/json');
		echo json_encode($data);
	}
}

public function saveBalasan()
{
	if ( $this->logged){
			$params = $this->input->post();
			if($this->session->userdata('role') == '20'){
				$params['id_admin'] = $this->session->userdata('id');
				$params['rep_admin'] = '1';
				$params['rep_user'] = '0';
			}else if ($this->session->userdata('role') == '30'){
				$params['id_user'] = $this->session->userdata('id');
				$params['rep_admin'] = '0';
				$params['rep_user'] = '1';
			}

			$data = $this->Model_aduan->saveBalasan((object)$params);
			if($data){
				$update = $this->Model_aduan->updateAduan((object)$params);
			}
			header('Content-Type: application/json');
			echo json_encode(array("status" => TRUE));
	} else {
		redirect("logout");
	}
}

}
