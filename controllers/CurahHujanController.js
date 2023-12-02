import { Op } from 'sequelize';
import Curah_hujan from '../models/curahHujanModel.js';

// Get data Curah Hujan with Pagination
export const getCurahHujan = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || '';
    const offset = limit * page;
    const totalRows = await Curah_hujan.count({
      where: {
        [Op.or]: [
          {
            itensitas_hujan: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            bulan: {
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
    const result = await Curah_hujan.findAll({
      where: {
        [Op.or]: [
          {
            itensitas_hujan: {
              [Op.like]: '%' + search + '%',
            },
          },
          {
            bulan: {
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

// Get Curah Hujan by Id
export const getCurahHujanById = async (req, res) => {
  const { id } = req.params;

  try {
    const curah_hujan = await Curah_hujan.findByPk(id, {
      attributes: ['id', 'itensitas_hujan', 'bulan', 'tahun'],
    });

    if (curah_hujan) {
      res.json(curah_hujan);
    } else {
      res.status(404).json({ error: 'Data Curah Hujan tidak ditemukan.' });
    }
  } catch (error) {
    console.error('Error fetching Curah Hujan by ID:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat mengambil data Curah Hujan.',
    });
  }
};

// Add Data Curah Hujan
export const postCurahHujan = async (req, res) => {
  const { itensitas_hujan, bulan, tahun } = req.body;

  try {
    // Validasi input
    if (!itensitas_hujan || !bulan || !tahun) {
      return res.status(400).json({ error: 'Harap isi semua field.' });
    }

    // Save data curah hujan to database
    const newCurahHujan = await Curah_hujan.create({
      itensitas_hujan,
      bulan,
      tahun,
    });

    res.status(201).json({
      message: 'Data Curah Hujan berhasil ditambahkan.',
      data: newCurahHujan,
    });
  } catch (error) {
    console.error('Error adding Curah Hujan:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat menambahkan data Curah Hujan.',
    });
  }
};

// Update data  by Id
export const updateCurahHujan = async (req, res) => {
  const { id } = req.params; // use req.params to get Id

  // Get the value you want to update from the request body
  const { itensitas_hujan, bulan, tahun } = req.body;

  try {
    const updateCurahHujan = await Curah_hujan.findByPk(id);

    if (updateCurahHujan) {
      await updateCurahHujan.update({
        itensitas_hujan,
        bulan,
        tahun,
      });

      res.json({ message: 'Data Curah Hujan berhasil diperbarui.' });
    } else {
      res.status(404).json({ error: 'Data Curah Hujan tidak ditemukan.' });
    }
  } catch (error) {
    console.error('Error updating Curah Hujan:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat memperbarui data Curah Hujan.',
    });
  }
};

// Delete data by Id
export const deleteCurahHujanById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Curah_hujan.destroy({
      where: {
        id: id,
      },
    });

    if (deletedRows === 1) {
      res.json({ message: 'Data Curah Hujan berhasil dihapus.' });
    } else {
      res.status(404).json({ error: 'Data Curah Hujan tidak ditemukan.' });
    }
  } catch (error) {
    console.error('Error deleting Curah Hujan by ID:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat menghapus data Curah Hujan.',
    });
  }
};
