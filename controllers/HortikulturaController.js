import Hortikultura from '../models/hortikulturaModel.js';
import { Op } from 'sequelize';

// Get data holtikultura with pagination
export const getHortikultura = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || '';
    const offset = limit * page;
    const totalRows = await Hortikultura.count({
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
    const result = await Hortikultura.findAll({
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

// Get hortikultura by Id
export const getHortikulturaById = async (req, res) => {
  const { id } = req.params;

  try {
    const holtikultura = await Hortikultura.findByPk(id, {
      attributes: [
        'id',
        'jenis_komoditas',
        'kecamatan',
        'desa',
        'total_jumlah',
        'tahun',
      ],
    });

    if (holtikultura) {
      res.json(holtikultura);
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

// Add Hortikultura
export const postHortikultura = async (req, res) => {
  const { jenis_komoditas, kecamatan, desa, total_jumlah, tahun } = req.body;

  try {
    // Validasi input
    if (!jenis_komoditas || !kecamatan || !desa || !total_jumlah || !tahun) {
      return res.status(400).json({ error: 'Harap isi semua field.' });
    }

    // Simpan data hortikultura ke database
    const newHortikultura = await Hortikultura.create({
      jenis_komoditas,
      kecamatan,
      desa,
      total_jumlah,
      tahun,
    });

    res.status(201).json({
      message: 'Data hortikultura berhasil ditambahkan.',
      data: newHortikultura,
    });
  } catch (error) {
    console.error('Error adding hortikultura:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat menambahkan data hortikultura.',
    });
  }
};

// Update data  by Id
export const updateHortukultura = async (req, res) => {
  const { id } = req.params; // Menggunakan req.params untuk mendapatkan ID

  // Dapatkan nilai yang ingin Anda perbarui dari body request
  const { jenis_komoditas, kecamatan, desa, total_jumlah, tahun } = req.body;

  try {
    const updateHortikultura = await Hortikultura.findByPk(id);

    if (updateHortikultura) {
      await updateHortikultura.update({
        jenis_komoditas,
        kecamatan,
        desa,
        total_jumlah,
        tahun,
      });

      res.json({ message: 'Data hortikultura berhasil diperbarui.' });
    } else {
      res.status(404).json({ error: 'Data hortikultura tidak ditemukan.' });
    }
  } catch (error) {
    console.error('Error updating hortikultura:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat memperbarui data hortikultura.',
    });
  }
};

// Menghapus data by Id
export const deleteHortikulturaById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Hortikultura.destroy({
      where: {
        id: id,
      },
    });

    if (deletedRows === 1) {
      res.json({ message: 'Data hortikultura berhasil dihapus.' });
    } else {
      res.status(404).json({ error: 'Data hortikultura tidak ditemukan.' });
    }
  } catch (error) {
    console.error('Error deleting hortikultura by ID:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat menghapus data hortikultura.',
    });
  }
};
