<?php 

class arusKasData{
   
    private $st;

    public function __construct()
    {
        $this -> st = new state;
    }

    public function getDataArusKas()
    {
        $this -> st -> query("SELECT * FROM tbl_arus_kas;");
        return $this -> st -> queryAll();
    }

    public function getJlhArusKas()
    {
        $this -> st -> query("SELECT * FROM tbl_arus_kas;");
        return $this -> st -> numRow();
    }

}