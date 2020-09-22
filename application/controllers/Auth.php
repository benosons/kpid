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
		$this->logs = $this->session->all_userdata();
		$this->logged = $this->session->userdata('userLogged');
		$this->kategori = $this->session->userdata('kategori');
		$this->content = array(
			"base_url" => base_url(),
			"logs" => $this->session->all_userdata(),
		);

	}


	public function index()
	{
		if ( $this->logged)
		{
			redirect("/");
		}
		else
		{
			if($_POST)
			{
				$params = (object)$this->input->post();
				$valid = $this->Model_auth->loginAuth($params->username, $params->password);

				if ($valid)
					redirect("dashboard");
				else
					// jang status muncul alert
					redirect("logout");
			}

			$this->twig->display("admin/login.html", $this->content);
		}

	}

	public function logout()
	{
		$valid = $this->session->sess_destroy();
		// session_destroy();
		redirect("/");
	}



}
