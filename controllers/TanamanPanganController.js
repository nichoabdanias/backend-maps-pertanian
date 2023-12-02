// import tanamanPanganModel from '../models/tanamanPanganModel.js';
import Tanaman_pangan from '../models/tanamanPanganModel.js';
import { Op } from 'sequelize';

// Get Tanaman Pangan with Pagination
export const getTanamanPangan = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || '';
    const offset = limit * page;
    const totalRows = await Tanaman_pangan.count({
      where: {
        [Op.or]: [
          {
            jenis_komoditas: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            kecamatan: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            desa: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            total: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            tahun: {
              [Op.like]: '%' + search + '%',
            },
          },
        ],
      },
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Tanaman_pangan.findAll({
      where: {
        [Op.or]: [
          {
            jenis_komoditas: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            kecamatan: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            desa: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            total: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            tahun: {
              [Op.like]: '%' + search + '%',
            },
          },
        ],
      },
      offset: offset,
      limit: limit,
      order: [['id', 'DESC']],
    });
    res.json({
      result: result,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    console.log(error);
  }
};

// menambah Data Tanaman Pangan
export const postTanamanPangan = async (req, res) => {
  const { jenis_komoditas, kecamatan, desa, total, tahun } = req.body;

  try {
    // Validasi input
    if (!jenis_komoditas || !kecamatan || !desa || !total || !tahun) {
      return res.status(400).json({ error: 'Harap isi semua field.' });
    }

    // Simpan data tanaman pangan ke database
    const newTanamanPangan = await Tanaman_pangan.create({
      jenis_komoditas,
      kecamatan,
      desa,
      total,
      tahun,
    });

    res.status(201).json({
      message: 'Data tanaman pangan berhasil ditambahkan.',
      data: newTanamanPangan,
    });
  } catch (error) {
    console.error('Error adding tanaman pangan:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat menambahkan data tanaman pangan.',
    });
  }
};

// Mencari tanaman pangan by Id
export const getTanamanPanganById = async (req, res) => {
  const { id } = req.params;

  try {
    const tanaman_pangan = await Tanaman_pangan.findByPk(id, {
      attributes: [
        'id',
        'jenis_komoditas',
        'kecamatan',
        'desa',
        'total',
        'tahun',
      ],
    });

    if (tanaman_pangan) {
      res.json(tanaman_pangan);
    } else {
      res.status(404).json({ error: 'Data tanaman pangan tidak ditemukan.' });
    }
  } catch (error) {
    console.error('Error fetching tanaman pangan by ID:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat mengambil data tanaman pangan.',
    });
  }
};

// Memperbarui data  by Id
export const updateTanamanPangan = async (req, res) => {
  const { id } = req.params; // Menggunakan req.params untuk mendapatkan ID

  // Dapatkan nilai yang ingin Anda perbarui dari body request
  const { jenis_komoditas, kecamatan, desa, total, tahun } = req.body;

  try {
    const updateTanamanPangan = await Tanaman_pangan.findByPk(id);

    if (updateTanamanPangan) {
      await updateTanamanPangan.update({
        jenis_komoditas,
        kecamatan,
        desa,
        total,
        tahun,
      });

      res.json({ message: 'Data tanaman pangan berhasil diperbarui.' });
    } else {
      res.status(404).json({ error: 'Data tanaman pangan tidak ditemukan.' });
    }
  } catch (error) {
    console.error('Error updating tanaman pangan:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat memperbarui data tanaman pangan.',
    });
  }
};

// Menghapus data by Id
export const deleteTanamanPanganById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Tanaman_pangan.destroy({
      where: {
        id: id,
      },
    });

    if (deletedRows === 1) {
      res.json({ message: 'Data tanaman pangan berhasil dihapus.' });
    } else {
      res.status(404).json({ error: 'Data tanaman pangan tidak ditemukan.' });
    }
  } catch (error) {
    console.error('Error deleting tanaman pangan by ID:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat menghapus data tanaman pangan.',
    });
  }
};
