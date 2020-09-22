<?php
class Model_auth extends CI_Model {
    
    function __construct(){
        parent::__construct();
    }

     public function loginAuth($username, $password)
    {
        $valid = false;         
        $password = md5($password);
        
        $check = $this->db->get_where("muser", array("username" => $username,"password" => $password));
            
            if ($check->num_rows() > 0) {            
            $data = $check->row();
                $session = array(
                    'id' => $data->id,
                    'username' => $data->username,
                    'kategori' => $data->kategori,
                    'password' => $data->password,
                    'kotaKab' => $data->kotaKab,
                    'userLogged' => TRUE
                );
                $valid = TRUE;
                $this->session->set_userdata($session);
        }   
        
        return $valid;      
    }   


    
}