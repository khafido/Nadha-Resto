//inisialisasi variabel lokal
const beranda = 'dasbor/beranda';
const monitoring = 'monitoring';
const menu = 'menu';
const pelanggan = 'pelanggan/1';
const meja = 'meja';
const promo = 'promo';
const pesanan = 'pesanan';
const pesananBaru = 'pesanan/pesananBaru';
const pengaturanUmum = 'setting/setting';
const bahanBaku = 'bahanBaku';
const pembelianBahanBaku = 'pembelianBb/pembelianBahanBaku';
const mitra = 'mitra';
const pengeluaran = 'pengeluaran';
const arusKas = 'arusKas';
const laporanTransaksi = 'laporanTransaksi';
const bantuan = 'bantuan';

const d = new Date();
const tahun = d.getFullYear();
var halaman;
var socket = io('http://localhost:2501');
NProgress.configure({ showSpinner: false });

// fungsi pertama kali dijalankan
renderMenu(beranda);

//objek vue footer
var divFooter = new Vue({
  el: '#divFooter',
  data: {
    author: "NadhaMedia",
    tahun: tahun
  }
});

var divJudul = new Vue({
  el :'#capUtama',
  data : {
    judulForm : 'Beranda'
  }
});

//objek vue menu
var divMenu = new Vue({
  el: '#divMenu',
  data: {
    
  },
  methods: {
    berandaAct : function()
    {
      renderMenu(beranda); 
      divJudul.judulForm = "Beranda";
    },
    monitoringAtc : function()
    {
      renderMenu(monitoring);
      divJudul.judulForm = "Monitoring Restoran";
    },
    menuAtc : function()
    {
      renderMenu(menu);
      divJudul.judulForm = "Menu Restoran";
    },
    pelangganAtc : function()
    {
      renderMenu(pelanggan);
      divJudul.judulForm = "Daftar Pelanggan";
    },
    mejaAtc : function()
    {
      renderMenu(meja);
      divJudul.judulForm = "List Meja";
    },
    promoAtc : function()
    {
      renderMenu(promo);
      divJudul.judulForm = "Promo";
    },
    pesananBaruAtc : function()
    {
      renderMenu(pesananBaru);
      divJudul.judulForm = "Pesanan baru";
    },
    pesananAtc : function()
    {
     renderMenu(pesanan);
     divJudul.judulForm = "Daftar Pesanan"; 
    },
    pengaturanUmumAtc : function()
    {
      renderMenu(pengaturanUmum);
      divJudul.judulForm = "Pengaturan Resto";
    },
    bahanBakuAtc : function()
    {
      renderMenu(bahanBaku);
      divJudul.judulForm = "Bahan Baku";
    },
    mitraAtc : function()
    {
      renderMenu(mitra);
      divJudul.judulForm = "Daftar Mitra";
    },
    pembelianBahanBakuAtc : function()
    {
      renderMenu(pembelianBahanBaku);
      divJudul.judulForm = "Pembelian bahan baku";
    },
    pengeluaranAtc : function()
    {
      renderMenu(pengeluaran);
      divJudul.judulForm = "Pengeluaran Resto";
    },
    arusKasAtc : function()
    {
      renderMenu(arusKas);
      divJudul.judulForm = "Arus Kas";
    },
    bantuanAtc : function()
    {
      renderMenu('bantuan/tesServerSide');
      divJudul.judulForm = "Bantuan";
    }
  }
});
 
function renderMenu(halaman) {
  NProgress.start();
  $('#divUtama').html("Memuat form ..");
  $('#divUtama').load(halaman);
  NProgress.done();
}

function pesanUmumApp(icon, title, text)
{
  Swal.fire({
    icon : icon,
    title : title,
    text : text
  });
}

socket.on('status', function(data){
  pesanUmumApp('info', 'Pesanan baru', 'Ada pesanan baru masuk ...');
  $('#capNotif').addClass('beep');
});