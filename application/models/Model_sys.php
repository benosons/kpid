<?php
class Model_sys extends CI_Model {

    var $table = 'muser';
    var $column = array('username','kategori','kotaKab'); //set column field database for datatable searchable just firstname , lastname , address are searchable
    var $column_search = array('username','kategori','kotaKab');
    var $order = array('id' => 'desc'); // default order

    function __construct(){
        parent::__construct();
    }


    // server side

    private function _get_datatables_query()
    {
        $id = $this->db->escape_str('admin');
        $this->db->from('muser');
        $this->db->where('kategori',$id);



        $i = 0;

        foreach ($this->column as $item) // loop column
    {
         if($_POST['search']['value']) // if datatable send POST for search
         {

            if($i===0) // first loop
            {
               $this->db->group_start(); // open bracket. query Where with OR clause better with bracket. because maybe can combine with other WHERE with AND.
               $this->db->like($item, $_POST['search']['value']);
            }
            else
            {
               $this->db->or_like($item, $_POST['search']['value']);
            }

            if(count($this->column) - 1 == $i) //last loop
               $this->db->group_end(); //close bracket
         }
         $column[$i] = $item; // set column array variable to order processing
         $i++;
    }

        if(isset($_POST['order'])) // here order processing
        {
            $this->db->order_by($column[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
        }
        else if(isset($this->order))
        {
            $order = $this->order;
            $this->db->order_by(key($order), $order[key($order)]);
        }
    }

    function get_datatables()
    {
        $this->_get_datatables_query();
        if($_POST['length'] != -1)
        $this->db->limit($_POST['length'], $_POST['start']);
        $query = $this->db->get();
        return $query->result();
    }

    function count_filtered()
    {
        $this->_get_datatables_query();
        $query = $this->db->get();
        return $query->num_rows();
    }

    public function count_all()
    {
        $this->db->from($this->table);
        return $this->db->count_all_results();
    }

    public function kotaKab()
    {
        $query = $this->db->query("select * from kabupaten_kota order by nama asc")->result();
        return $query;
    }


    public function save($params = NULL)
    {
        $valid = false;

        $this->db->set("username", $params->username);
        $this->db->set("password", md5($params->password));
        $this->db->set("kotaKab", $params->kotaKab);
        $this->db->set("kategori", 'admin');
        $this->db->set("created_by", $this->session->userdata('username'));
        $this->db->set("created_at", date("Y-m-d H:i:s"));
        $valid = $this->db->insert('muser');

        return $valid;

    }

    public function update($params = NULL)
    {
        $valid = false;

        $pass = $params->password;
        $query = $this->db->query("select password, id from muser where id = '".$params->id."' ")->row();

        if ($pass != $query->password) {
            $this->db->set("password", md5($params->password));
        }
        $this->db->set("username", $params->username);
        $this->db->set("kotaKab", $params->kotaKab);
        $this->db->set("updated_by", $this->session->userdata('username'));
        $this->db->set("updated_at", date("Y-m-d H:i:s"));
        $this->db->where('id', $params->id);
        $valid = $this->db->update('muser');

        return $valid;

    }

    public function delete($id)
    {
        $idx = $this->db->escape_str($id);
        $this->db->where('id', $idx);
        $this->db->delete('muser');
    }

}
