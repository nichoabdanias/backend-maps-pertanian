import Kelompok_tani from '../models/kelompokTaniModel.js';
import { Op } from 'sequelize';

// Mencari semua data di tabel kelompok tani
//Pagination
export const getDataKelompokTani = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || '';
    const offset = limit * page;
    const totalRows = await Kelompok_tani.count({
      where: {
        [Op.or]: [
          {
            nama_kelompok_tani: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            nomor_register: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            alamat: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            tahun_berdiri: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            nama_ketua: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            kecamatan: {
              [Op.like]: '%' + search + '%',
            },
          },
        ],
      },
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Kelompok_tani.findAll({
      where: {
        [Op.or]: [
          {
            nama_kelompok_tani: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            nomor_register: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            alamat: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            tahun_berdiri: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            nama_ketua: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            kecamatan: {
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

// Mencari data kelompok tani by Id
export const getDataKelompokTaniById = async (req, res) => {
  const { id } = req.params;

  try {
    const newKelompokTani = await Kelompok_tani.findByPk(id, {
      attributes: [
        'id',
        'nama_kelompok_tani',
        'nomor_register',
        'alamat',
        'tahun_berdiri',
        'nama_ketua',
        'kecamatan',
      ],
    });

    if (newKelompokTani) {
      res.json(newKelompokTani);
    } else {
      res.status(404).json({ error: 'Data hortikultura tidak ditemukan.' });
    }
  } catch (error) {
    console.error('Error fetching hortikultura by ID:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat mengambil data Hortikultutra.',
    });
  }
};

// Input data kelompok tani
export const postKelompokTani = async (req, res) => {
  const {
    nama_kelompok_tani,
    nomor_register,
    alamat,
    tahun_berdiri,
    nama_ketua,
    kecamatan,
  } = req.body;

  try {
    // Validasi input
    if (
      !nama_kelompok_tani ||
      !nomor_register ||
      !alamat ||
      !tahun_berdiri ||
      !nama_ketua ||
      !kecamatan
    ) {
      return res.status(400).json({ error: 'Harap isi semua field.' });
    }

    // Simpan data kelompok tani ke database
    const newKelompokTani = await Kelompok_tani.create({
      nama_kelompok_tani,
      nomor_register,
      alamat,
      tahun_berdiri,
      nama_ketua,
      kecamatan,
    });

    res.status(201).json({
      message: 'Data Kelompok Tani berhasil ditambahkan.',
      data: newKelompokTani,
    });
  } catch (error) {
    console.error('Error adding Kelompok Tani:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat menambahkan data kelompok tani.',
    });
  }
};

// Memperbarui data  by Id
export const updateKelompokTani = async (req, res) => {
  const { id } = req.params; // Menggunakan req.params untuk mendapatkan ID

  // Dapatkan nilai yang ingin Anda perbarui dari body request
  const {
    nama_kelompok_tani,
    nomor_register,
    alamat,
    tahun_berdiri,
    nama_ketua,
    kecamatan,
  } = req.body;

  try {
    const updateKelompokTani = await Kelompok_tani.findByPk(id);

    if (updateKelompokTani) {
      await updateKelompokTani.update({
        nama_kelompok_tani,
        nomor_register,
        alamat,
        tahun_berdiri,
        nama_ketua,
        kecamatan,
      });

      res.json({ message: 'Data Kelompok Tani berhasil diperbarui.' });
    } else {
      res.status(404).json({ error: 'Data Kelompok Tani tidak ditemukan.' });
    }
  } catch (error) {
    console.error('Error updating kelompok tani:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat memperbarui data Kelompok Tani.',
    });
  }
};

// Menghapus data by Id
export const deleteKelompokTaniById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Kelompok_tani.destroy({
      where: {
        id: id,
      },
    });

    if (deletedRows === 1) {
      res.json({ message: 'Data Kelompok Tani berhasil dihapus.' });
    } else {
      res.status(404).json({ error: 'Data Kelompok Tani tidak ditemukan.' });
    }
  } catch (error) {
    console.error('Error deleting Kelompok Tani by ID:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat menghapus data Kelompok Tani.',
    });
  }
};
