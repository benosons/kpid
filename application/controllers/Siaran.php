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
		$this->role = $this->session->userdata('role');
		$this->kotaKab = $this->session->userdata('kotaKab');
		$this->name = $this->session->userdata('name');
		$this->foto = $this->session->userdata('foto');
		$this->content = array(
			"base_url" => base_url(),
			"logs" => $this->session->all_userdata(),
			"username" => $this->username,
			"role" => $this->role,
			"name" => $this->name,
			"foto" => $this->foto
		);

	}

	public function listtelevisi()
	{
		if ( $this->logged)
		{
			if($this->role == '10' || $this->role == '20'){
				$this->twig->display('admin/listtelevisi.html', $this->content);

			}
		}else{
			redirect("dashboard");
		}
	}

	public function listradio()
	{
		if ( $this->logged)
		{
			if($this->role == '10' || $this->role == '20'){

				$this->twig->display('admin/listradio.html', $this->content);
			}
		}else{
			redirect("dashboard");
		}
	}


	public function listDataSiaran()
	{


		if ($this->logged){
			if($this->role == '10' || $this->role == '20' || $this->role == '30'){
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
					$row['koor'] = (!empty($proses->koor) ? $proses->koor : "NULL");

					$data[] = $row;
				}
				header('Content-Type: application/json');
				echo json_encode($data);
			}
		}else{
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
				$row['sebutanDiUdara'] = (!empty($proses->sebutanDiUdara) ? $proses->sebutanDiUdara : "NULL");
				$row['pimpinan'] = (!empty($proses->pimpinan) ? $proses->pimpinan : "NULL");
				$row['alamat'] = (!empty($proses->alamat) ? $proses->alamat : "NULL");
				$row['email'] = (!empty($proses->email) ? $proses->email : "NULL");
				$row['frekuensi'] = (!empty($proses->frekuensi) ? $proses->frekuensi : "NULL");
				$row['wilayahLayanan'] = (!empty($proses->wilayahLayanan) ? $proses->wilayahLayanan : "NULL");
				$row['kontak'] = (!empty($proses->kontak) ? $proses->kontak : "NULL");
				$row['koor'] = (!empty($proses->koor) ? $proses->koor : "NULL");

				$data[] = $row;
			}
			header('Content-Type: application/json');
			echo json_encode($data);
		}
	}

}
