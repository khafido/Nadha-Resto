<?php

class pengeluaran extends Route{

    private $sn = 'pengeluaranData';

    public function pembelianBahanBaku()
    {
        $data['mitra']  = $this -> state($this -> sn) -> getMitra();
        $dataHistory    = $this -> state($this -> sn) -> getHistory();
        foreach($dataHistory as $dh){
            $arrTemp['kdMitra']         = $dh['mitra'];
            $arrTemp['kdPembelian']     = $dh['kd_pembelian'];
            $arrTemp['waktu']           = $dh['waktu'];
            $arrTemp['namaMitra']       = $this -> state($this -> sn) -> getNamaMitra($dh['mitra']);
            $arrTemp['total']           = $dh['total'];
            $data['historyPembelian'][] = $arrTemp; 
        }
        $this -> bind('dasbor/pengeluaran/pembelianBahanBaku', $data);
    }

    public function getDetailPembelian()
    {
        //ambil kode pembelian dari method post
        $kdPembelian = $this -> inp('kdPembelian');
        //ambil query data pembelian
        $qPembelian = $this -> state($this -> sn) ->  getDataPembelian($kdPembelian);
        //ambil data total pembelian dan masukkan ke dalam variabel data
        $data['total'] = $qPembelian['total'];
        //ambil nama resto dan masukkan ke dalam variabel data
        $data['namaResto'] = $this -> state($this -> sn) -> getNamaResto();
        //kode pembelian dimasukkan ke dalam variabel data
        $data['kdPembelian'] = $qPembelian;
        //kirim respon json dari variabel data
        $this -> toJson($data);
    }

    public function detailPembelian($kdPembelian)
    {
        $data['kdPembelian'] = $kdPembelian;
        $this -> bind('dasbor/pengeluaran/detailPembelianBahanBaku', $data);
    }

    public function getDataBahanBakuKategori()
    {
        $kategori           = $this -> inp('kategori');
        $data['bahanBaku']  = $this -> state($this -> sn) -> getDataBahanBakuKategori($kategori);
        $this -> toJson($data);
    }

    public function prosesPembelian()
    {
        $kdPembelian = $this -> rnstr(15);
        $waktu = $this -> waktu();
        $mitra = $this -> inp('mitra');
        $nominal = $this -> inp('nominal');
        $operator = $this -> getses('userSes');
        $nominalClear = str_replace('.','',$nominal);
        $this -> state($this -> sn) -> prosesPembelian($kdPembelian, $mitra, $waktu, $nominalClear, $operator);
        $data['kdPembelian'] = $kdPembelian;
        $this -> toJson($data);
    }

    public function updateTempPembelian()
    {
        // 'kdPembelian':kdPembelian, 'kdItem':itemPesanan[index].kdBahan, 'qt':itemPesanan[index].value
        $kdTemp = $this -> rnstr(20);
        $kdPembelian = $this -> inp('kdPembelian');
        $kdItem = $this -> inp('kdItem');
        $qt = $this -> inp('qt');
        //update temp 
        $this -> state($this -> sn) -> updateTemp($kdTemp, $kdPembelian, $kdItem, $qt);
        //update stok 
        $this -> state($this -> sn) ->  updateStok($kdItem, $qt);
        $data['status'] = 'sukses';
        $this -> toJson($data);
    }

}