<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller {

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
		$this->load->model('Model_auth');
		$this->load->model('Model_sys');
		$this->logs = $this->session->all_userdata();
		$this->logged = $this->session->userdata('userLogged');
		$this->kategori = $this->session->userdata('kategori');
		$this->role = $this->session->userdata('role');
		$this->content = array(
			"base_url" => base_url(),
			"logs" => $this->session->all_userdata(),
			"role" => $this->role
		);

	}


	public function index()
	{
		if ($this->logged)
		{
			if($this->role == '10' || $this->role = '20'){
				redirect("dashboard");
			}else if ($this->role == '30'){
				redirect("/");
			}
		} else {
			if($_POST){
				$params = (object)$this->input->post();
				$valid = $this->Model_auth->loginAuth($params->username, $params->password);
				if ($valid->valid){
					if($valid->role == '10' || $valid->role == '20'){
						redirect("dashboard");
					}else if($valid->role == '30'){
						redirect("/");
					}
				}else{
					// jang status muncul alert
					redirect("/");
				}
			}

			$this->twig->display("admin/login.html", $this->content);
		}

	}

	public function register()
	{
			if($_POST){
				$params = (object)$this->input->post();
				$data = $this->Model_sys->saveRegis($params);
				if($data){
					redirect("auth");
				}
			}

	}

	public function cekusername()
	{

				$params = (object)$this->input->post();
				$valid = $this->Model_auth->cekUname($params->username);
				header('Content-Type: application/json');
				echo json_encode($valid);

	}

	public function logout()
	{
		$this->Model_auth->updateislogin($this->session->userdata('id'));
		$valid = $this->session->sess_destroy();
		// session_destroy();
		redirect("/");
	}



}
