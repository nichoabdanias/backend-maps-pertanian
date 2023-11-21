import { Sequelize } from 'sequelize';
import Curah_hujan from '../models/curahHujanModel.js';
import Hortikultura from '../models/hortikulturaModel.js';
import Tanaman_pangan from '../models/tanamanPanganModel.js';
import Perkebunan from '../models/perkebunanModel.js';
import Komoditas_pertanian from '../models/komoditasPertanianModel.js';

// Harga Komoditas Pertanian

export const getHargaKomoditas = async (req, res) => {
  try {
    const komoditas_pertanian = await Komoditas_pertanian.findAll({
      attributes: [
        'id',
        'nama_komoditas',
        'harga_baru',
        'harga_lama',
        'nilai_perubahan',
      ],
    });

    const komoditasWithPercentage = komoditas_pertanian.map((item) => {
      const hargaLama = item.harga_lama;
      const hargaBaru = item.harga_baru;
      const nilaiPerubahan = item.nilai_perubahan;

      // Hitung persentase kenaikan atau penurunan harga
      const persentase = ((nilaiPerubahan / hargaLama) * 100).toFixed(2);

      // Tentukan tanda "+" atau "-"
      const tanda = nilaiPerubahan < 0 ? '-' : '+';

      const formattedPersentase = `${tanda}${Math.abs(persentase)}%`;
      return {
        // id: item.id,
        nama_komoditas: item.nama_komoditas,
        harga: `Rp ${hargaBaru}`,
        // harga_lama: hargaLama,
        persentase: formattedPersentase,
      };
    });

    res.json(komoditasWithPercentage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tanggal
export const tanggal = async (req, res) => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Bulan dimulai dari 0, sehingga perlu ditambah 1
  const year = currentDate.getFullYear();

  // Mendapatkan nama hari dalam bahasa Indonesia
  const options = { weekday: 'long' };
  const dayInIndonesian = currentDate.toLocaleDateString('id-ID', options);

  // Mendapatkan nama bulan dalam bahasa Indonesia
  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const monthInIndonesian = monthNames[currentDate.getMonth()];

  const formattedDate = {
    hari: dayInIndonesian,
    tanggal: day,
    bulan: monthInIndonesian,
    tahun: year,
  };

  res.json({ tanggal: formattedDate });

  // const currentDate = new Date();
  // const day = currentDate.getDate();
  // const month = currentDate.getMonth() + 1; // Bulan dimulai dari 0, sehingga perlu ditambah 1
  // const year = currentDate.getFullYear();

  // // Format tanggal dalam bentuk string dengan format 'hari/bulan/tahun'
  // const formattedDate = `${day}/${month}/${year}`;

  // res.json(`Tanggal hari ini: ${formattedDate}`);
};

// Curah Hujan Per Tahun
// export const getCurahHujanPertahun = async (req, res) => {
//   try {
//     const tahuns = [2022, 2021];
//     const curahHujanPerTahun = {};

//     for (const tahun of tahuns) {
//       const curah_hujan = await Curah_hujan.findAll({
//         attributes: ['bulan', 'itensitas_hujan'],
//         where: {
//           tahun: tahun,
//         },
//       });
//       curahHujanPerTahun[tahun] = curah_hujan;
//     }
//     res.json(curahHujanPerTahun);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const getCurahHujanPertahun = async (req, res) => {
  try {
    const years = await Curah_hujan.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('tahun')), 'tahun']],
    });

    const curahHujanPerTahun = {};

    for (const year of years) {
      const curah_hujan = await Curah_hujan.findAll({
        attributes: [
          'bulan',
          'itensitas_hujan',
          [Sequelize.fn('sum', Sequelize.col('itensitas_hujan')), 'total'],
        ],
        where: {
          tahun: year.tahun,
        },
        group: ['bulan'],
      });

      // Add data to curahHujanPerTahun
      curahHujanPerTahun[year.tahun] = curah_hujan.map((item) => ({
        bulan: item.bulan,
        itensitas_hujan: item.itensitas_hujan,
        total: item.dataValues.total,
      }));
    }

    res.json(curahHujanPerTahun);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Statistik Hortikultura pertahun
export const getHortikulturaPerTahun = async (req, res) => {
  const tahun = req.params.tahun;

  try {
    const totalKomoditas = await Hortikultura.findAll({
      attributes: [
        'jenis_komoditas',
        // 'tahun',
        [Sequelize.fn('sum', Sequelize.col('total_jumlah')), 'total_jumlah'],
      ],
      where: { tahun: tahun },
      group: ['jenis_komoditas', 'tahun'],
    });

    res.json(totalKomoditas);
  } catch (error) {
    console.error('Terjadi kesalahan dalam pengambilan data:', error);
    res
      .status(500)
      .json({ error: 'Terjadi kesalahan dalam pengambilan data.' });
  }
};

// Menampilkan Produksi Pertanian Hortikultura pertahun
export const getProduksiPertanianHortikultura = async (req, res) => {
  // const { tahun } = req.params;
  try {
    const hortikulturaData = await Hortikultura.findAll({
      attributes: [
        'jenis_komoditas',
        'tahun',
        [Sequelize.fn('sum', Sequelize.col('total_jumlah')), 'total'],
      ],
      group: ['tahun', 'jenis_komoditas'],
    });

    const produksiHortikultura = {};
    hortikulturaData.forEach((item) => {
      const { tahun, jenis_komoditas, total } = item.dataValues;

      if (!produksiHortikultura[tahun]) {
        produksiHortikultura[tahun] = [];
      }

      produksiHortikultura[tahun].push({
        jenis_komoditas,
        total: total.toString(),
      });
    });

    res.json(produksiHortikultura);

    // const tanamanPanganData = await Tanaman_pangan.findAll({
    //   attributes: [
    //     'jenis_komoditas',
    //     'tahun',
    //     [Sequelize.fn('sum', Sequelize.col('total_jumlah')), 'total'],
    //   ],
    //   group: ['tahun', 'jenis_komoditas'],
    // });

    // const perkebunanData = await Perkebunan.findAll({
    //   attributes: [
    //     'jenis_komoditas',
    //     'tahun',
    //     [Sequelize.fn('sum', Sequelize.col('total_jumlah')), 'total'],
    //   ],
    //   group: ['tahun', 'jenis_komoditas'],
    // });

    // Menggabungkan ketiga data jenis komditas pertanian
    // const mergedData = [
    //   ...tanamanPanganData,
    //   ...hortikulturaData,
    //   ...perkebunanData,
    // ];

    // Mengatur data ke dalam format yang diinginkan
    // const produksiPertanian = {};
    // tanamanPanganData.forEach((item) => {
    //   const { tahun, jenis_komoditas, total } = item.dataValues;

    //   if (!produksiPertanian[tahun]) {
    //     produksiPertanian[tahun] = [];
    //   }

    //   produksiPertanian[tahun].push({
    //     jenis_komoditas,
    //     total: total.toString(),
    //   });
    // });

    // res.json(produksiPertanian);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Statistik Tanaman Pangan by Tahun
export const getTanamanPanganPerTahun = async (req, res) => {
  const tahun = req.params.tahun;

  try {
    const totalKomoditas = await Tanaman_pangan.findAll({
      attributes: [
        'jenis_komoditas',
        // 'tahun',
        [Sequelize.fn('sum', Sequelize.col('total')), 'total'],
      ],
      where: { tahun: tahun },
      group: ['jenis_komoditas', 'tahun'],
    });

    res.json(totalKomoditas);
  } catch (error) {
    console.error('Terjadi kesalahan dalam pengambilan data:', error);
    res
      .status(500)
      .json({ error: 'Terjadi kesalahan dalam pengambilan data.' });
  }
};

// Menampilkan Produksi Pertanian Tanaman Pangan pertahun
export const getProduksiPertanianTanamanPangan = async (req, res) => {
  // const { tahun } = req.params;
  try {
    const tanamanPanganData = await Tanaman_pangan.findAll({
      attributes: [
        'jenis_komoditas',
        'tahun',
        [Sequelize.fn('sum', Sequelize.col('total')), 'total'],
      ],
      group: ['tahun', 'jenis_komoditas'],
    });

    const produksiTanamanPangan = {};
    tanamanPanganData.forEach((item) => {
      const { tahun, jenis_komoditas, total } = item.dataValues;

      if (!produksiTanamanPangan[tahun]) {
        produksiTanamanPangan[tahun] = [];
      }

      produksiTanamanPangan[tahun].push({
        jenis_komoditas,
        total: total.toString(),
      });
    });

    res.json(produksiTanamanPangan);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Menampilkan Produksi Pertanian Perkebunan pertahun
export const getProduksiPertanianPerkebunan = async (req, res) => {
  // const { tahun } = req.params;
  try {
    const perkebunanData = await Perkebunan.findAll({
      attributes: [
        'jenis_komoditas',
        'tahun',
        [Sequelize.fn('sum', Sequelize.col('total_jumlah')), 'total'],
      ],
      group: ['tahun', 'jenis_komoditas'],
    });

    const produksiPerkebunan = {};
    perkebunanData.forEach((item) => {
      const { tahun, jenis_komoditas, total } = item.dataValues;

      if (!produksiPerkebunan[tahun]) {
        produksiPerkebunan[tahun] = [];
      }

      produksiPerkebunan[tahun].push({
        jenis_komoditas,
        total: total.toString(),
      });
    });

    res.json(produksiPerkebunan);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
