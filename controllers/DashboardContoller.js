import { Sequelize, Op } from 'sequelize';
import petaniModel from '../models/petaniModel.js';
import kelompokTaniModel from '../models/kelompokTaniModel.js';
import lahanPertanianModel from '../models/lahanPertanianModel.js';
import hortikulturaModel from '../models/hortikulturaModel.js';
import tanamanPanganModel from '../models/tanamanPanganModel.js';
import perkebunanModel from '../models/perkebunanModel.js';

// Mentotal jumlah petani
export const getTotalPetani = async (req, res) => {
  try {
    const totalPetani = await petaniModel.sum('total');
    const totalPetaniLakiLaki = await petaniModel.sum('total', {
      where: { jenis_kelamin: 'laki-laki' },
    });
    const totalPetaniPerempuan = await petaniModel.sum('total', {
      where: { jenis_kelamin: 'perempuan' },
    });

    res.json({
      total_petani: totalPetani,
      total_petani_lakilaki: totalPetaniLakiLaki,
      total_petani_perempuan: totalPetaniPerempuan,
    });
    // console.log('Total Seluruh Petani:', totalAllPetani);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Total petani by tahun
export const getTotalPetaniPerTahun = async (req, res) => {
  try {
    // Group the sum of 'total' by year for female farmers
    // Menjumlahkan total by tahun petani laki-laki
    const totalPetaniLakiLakiPerTahun = await petaniModel.findAll({
      attributes: [
        'tahun',
        [Sequelize.fn('SUM', Sequelize.col('total')), 'total laki-laki'],
      ],
      where: { jenis_kelamin: 'laki-laki' },
      group: ['tahun'],
    });

    // Menjumlahkan total by tahun petani laki-laki
    const totalPetaniPerempuanPerTahun = await petaniModel.findAll({
      attributes: [
        'tahun',
        [Sequelize.fn('SUM', Sequelize.col('total')), 'total_perempuan'],
      ],
      where: { jenis_kelamin: 'perempuan' },
      group: ['tahun'],
    });

    res.json({
      petani_laki_laki: totalPetaniLakiLakiPerTahun,
      petani_perempuan: totalPetaniPerempuanPerTahun,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Menjumlahkan kelompok tani
export const getJumlahKelompokTani = async (req, res) => {
  try {
    const jumlahKelompokTani = await kelompokTaniModel.count();
    res.json({ jumlah_kelompok_tani: jumlahKelompokTani });
    // return jumlahKelompokTani;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error while fetching the count of kelompok tani.');
  }
};

// Mentotal lahan pertanian
export const getJumlahLahanPertanian = async (req, res) => {
  try {
    // const totalPetani = await petaniModel.sum('total');
    const jumlahLahanSawah = await lahanPertanianModel.sum('total_jumlah', {
      where: { jenis_lahan: 'lahan sawah' },
    });
    const jumlahBukanLahanSawah = await lahanPertanianModel.sum(
      'total_jumlah',
      {
        where: { jenis_lahan: 'bukan lahan sawah' },
      }
    );

    res.json({
      // total_petani: totalPetani,
      jumlah_lahan_sawah: jumlahLahanSawah,
      jumlah_bukan_lahan_sawah: jumlahBukanLahanSawah,
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getLahanPertanianPerTahun = async (req, res) => {
  try {
    // Menjumlahkan total by tahun lahan sawah
    const lahanSawah = await lahanPertanianModel.findAll({
      attributes: [
        'tahun',
        [Sequelize.fn('SUM', Sequelize.col('total_jumlah')), 'lahan sawah'],
      ],
      where: { jenis_lahan: 'lahan sawah' },
      group: ['tahun'],
    });

    // Menjumlahkan total by tahun bukan lahan sawah
    const bukanLahanSawah = await lahanPertanianModel.findAll({
      attributes: [
        'tahun',
        [
          Sequelize.fn('SUM', Sequelize.col('total_jumlah')),
          'bukan lahan sawah',
        ],
      ],
      where: { jenis_lahan: 'bukan lahan sawah' },
      group: ['tahun'],
    });

    res.json({
      lahan_sawah: lahanSawah,
      bukan_lahan_sawah: bukanLahanSawah,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Menampilkan daftar kelompok tani
export const getKelompokTani = async (req, res) => {
  try {
    const kelompok_tani = await kelompokTaniModel.findAll({
      attributes: [
        'id',
        'nama_kelompok_tani',
        'nomor_register',
        'tahun_berdiri',
        'alamat',
        'nama_ketua',
      ],
    });
    res.json(kelompok_tani);
  } catch (error) {
    console.log(error);
  }
};

// Menampilkan komoditas unggulan
export const getKomoditasUnggulan = async (req, res) => {
  try {
    const tanamanPanganData = await tanamanPanganModel.findAll({
      attributes: [
        'jenis_komoditas',
        [Sequelize.fn('SUM', Sequelize.col('total')), 'total'],
        'tahun',
      ],
      group: ['jenis_komoditas', 'tahun'],
    });

    const hortikulturaData = await hortikulturaModel.findAll({
      attributes: [
        'jenis_komoditas',
        [Sequelize.fn('SUM', Sequelize.col('total_jumlah')), 'total_jumlah'],
        'tahun',
      ],
      group: ['jenis_komoditas', 'tahun'],
    });

    const perkebunanData = await perkebunanModel.findAll({
      attributes: [
        'jenis_komoditas',
        [Sequelize.fn('SUM', Sequelize.col('total_jumlah')), 'total_jumlah'],
        'tahun',
      ],
      group: ['jenis_komoditas', 'tahun'],
    });

    const komoditasUnggulan = [
      ...tanamanPanganData,
      ...hortikulturaData,
      ...perkebunanData,
    ];
    res.json(komoditasUnggulan);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Menampilkan komoditas unggulan berdasarkan tahun
export const getKomoditasUnggulanPertahun = async (req, res) => {
  try {
    const tanamanPanganData = await tanamanPanganModel.findAll({
      attributes: [
        'jenis_komoditas',
        [Sequelize.fn('SUM', Sequelize.col('total')), 'total'],
        'tahun',
      ],
      group: ['jenis_komoditas', 'tahun'],
    });

    const hortikulturaData = await hortikulturaModel.findAll({
      attributes: [
        'jenis_komoditas',
        [Sequelize.fn('SUM', Sequelize.col('total_jumlah')), 'total_jumlah'],
        'tahun',
      ],
      group: ['jenis_komoditas', 'tahun'],
    });

    const perkebunanData = await perkebunanModel.findAll({
      attributes: [
        'jenis_komoditas',
        [Sequelize.fn('SUM', Sequelize.col('total_jumlah')), 'total_jumlah'],
        'tahun',
      ],
      group: ['jenis_komoditas', 'tahun'],
    });

    const komoditasUnggulanPerTahun = {};

    // Group tanamanPanganData by tahun
    tanamanPanganData.forEach((item) => {
      const year = item.dataValues.tahun;
      if (!komoditasUnggulanPerTahun[year]) {
        komoditasUnggulanPerTahun[year] = [];
      }
      komoditasUnggulanPerTahun[year].push({
        jenis_komoditas: item.dataValues.jenis_komoditas,
        total: item.dataValues.total,
      });
    });

    // Group hortikulturaData by tahun
    hortikulturaData.forEach((item) => {
      const year = item.dataValues.tahun;
      if (!komoditasUnggulanPerTahun[year]) {
        komoditasUnggulanPerTahun[year] = [];
      }
      komoditasUnggulanPerTahun[year].push({
        jenis_komoditas: item.dataValues.jenis_komoditas,
        total_jumlah: item.dataValues.total_jumlah,
      });
    });

    // Group perkebunanData by Tahun
    perkebunanData.forEach((item) => {
      const year = item.dataValues.tahun;
      if (!komoditasUnggulanPerTahun[year]) {
        komoditasUnggulanPerTahun[year] = [];
      }
      komoditasUnggulanPerTahun[year].push({
        jenis_komoditas: item.dataValues.jenis_komoditas,
        total_jumlah: item.dataValues.total_jumlah,
      });
    });

    res.json(komoditasUnggulanPerTahun);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
