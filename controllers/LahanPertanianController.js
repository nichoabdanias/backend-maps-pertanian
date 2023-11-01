import Lahan_pertanian from '../models/lahanPertanianModel.js';
import { Op } from 'sequelize';
// import lahanPertanianModel from '../models/lahanPertanianModel.js';

// Mencari total lahan sawah dan bukan lahan sawah
// Pagination
export const getLahanPertanian = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || '';
    const offset = limit * page;
    const totalRows = await Lahan_pertanian.count({
      where: {
        [Op.or]: [
          {
            jenis_lahan: {
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
            total_jumlah: {
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
    const result = await Lahan_pertanian.findAll({
      where: {
        [Op.or]: [
          {
            jenis_lahan: {
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
            total_jumlah: {
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

// export const getLahanPertanian = async (req, res) => {
//   try {
//     const page = req.query.page || 1;
//     const limit = req.query.limit || 10;

//     const { jenis_lahan, kecamatan, desa, total_jumlah, tahun } = req.query;

//     const whereClause = {};
//     if (jenis_lahan) {
//       whereClause.jenis_lahan = jenis_lahan;
//     }
//     if (kecamatan) {
//       whereClause.kecamatan = kecamatan;
//     }
//     if (desa) {
//       whereClause.desa = desa;
//     }
//     if (total_jumlah) {
//       whereClause.total_jumlah = total_jumlah;
//     }
//     if (tahun) {
//       whereClause.tahun = tahun;
//     }

//     const offset = (page - 1) * limit;

//     const lahan_pertanian = await Lahan_pertanian.findAll({
//       attributes: [
//         'id',
//         'jenis_lahan',
//         'kecamatan',
//         'desa',
//         'total_jumlah',
//         'tahun',
//       ],
//       where: whereClause,
//       offset: offset,
//       limit: limit,
//     });
//     res.json(lahan_pertanian);
//   } catch (error) {
//     console.log(error);
//   }
// };

// Input data Lahan pertanian
export const postLahanPertanian = async (req, res) => {
  const { jenis_lahan, kecamatan, desa, total_jumlah, tahun } = req.body;

  try {
    // Validasi input
    if (!jenis_lahan || !kecamatan || !desa || !total_jumlah || !tahun) {
      return res.status(400).json({ error: 'Harap isi semua field.' });
    }

    // Simpan data Lahan pertanian ke database
    const newLahanPertanian = await Lahan_pertanian.create({
      jenis_lahan,
      kecamatan,
      desa,
      total_jumlah,
      tahun,
    });

    res.status(201).json({
      message: 'Data Lahan pertanian berhasil ditambahkan.',
      data: newLahanPertanian,
    });
  } catch (error) {
    console.error('Error adding Lahan pertanian:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat menambahkan data Lahan pertanian.',
    });
  }
};

// Memperbarui data  by Id
export const updateLahanPertanian = async (req, res) => {
  const { id } = req.params; // Menggunakan req.params untuk mendapatkan ID

  // Dapatkan nilai yang ingin Anda perbarui dari body request
  const { jenis_lahan, kecamatan, desa, total_jumlah, tahun } = req.body;

  try {
    const updateLahanPertanian = await Lahan_pertanian.findByPk(id);

    if (updateLahanPertanian) {
      await updateLahanPertanian.update({
        jenis_lahan,
        kecamatan,
        desa,
        total_jumlah,
        tahun,
      });

      res.json({ message: 'Data Lahan Pertanian berhasil diperbarui.' });
    } else {
      res.status(404).json({ error: 'Data Lahan Pertanian tidak ditemukan.' });
    }
  } catch (error) {
    console.error('Error updating Lahan Pertanian:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat memperbarui data Lahan Pertanian.',
    });
  }
};

// Menghapus data by Id
export const deleteLahanPertanianById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Lahan_pertanian.destroy({
      where: {
        id: id,
      },
    });

    if (deletedRows === 1) {
      res.json({ message: 'Data Lahan Pertanian berhasil dihapus.' });
    } else {
      res.status(404).json({ error: 'Data Lahan Pertanian tidak ditemukan.' });
    }
  } catch (error) {
    console.error('Error deleting Lahan Pertanian by ID:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat menghapus data Lahan Pertanian.',
    });
  }
};
