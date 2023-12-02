import Perkebunan from '../models/perkebunanModel.js';
import { Op } from 'sequelize';

//Get Data Perkebunan
// Pagination
export const getPerkebunan = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || '';
    const offset = limit * page;
    const totalRows = await Perkebunan.count({
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
    const result = await Perkebunan.findAll({
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

// Create and Save a new Perkebunan
export const postPerkebunan = async (req, res) => {
  try {
    if (!req.body.jenis_komoditas) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
      return;
    }

    // Create a perkebunan
    const newPerkebunan = {
      jenis_komoditas: req.body.jenis_komoditas,
      kecamatan: req.body.kecamatan,
      desa: req.body.desa,
      total_jumlah: req.body.total_jumlah,
      tahun: req.body.tahun,
    };

    // Save Peekebunan in the database
    Perkebunan.create(newPerkebunan).then((data) => {
      res.send(data);
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: err.message || 'Some error occurred while creating the petani.',
    });
  }
};

// Find a single perkebuanan with an id
export const getPerkebunanById = async (req, res) => {
  try {
    const id = req.params.id;

    Perkebunan.findByPk(id).then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find perkebuanan with id=${id}`,
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error retrieving perkebunan with id=',
    });
  }
};

// Update a Perkebunan by the id in the request
export const updatePerkebunan = async (req, res) => {
  try {
    const id = req.params.id;

    Perkebunan.update(req.body, {
      where: { id: id },
    }).then((num) => {
      if (num == 1) {
        res.send({
          message: 'Perkebunan was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Perkebunan with id=${id}. Maybe Perkebunan was not found or req.body is empty!`,
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error updating Perkebunan with id=' + id,
    });
  }
};

// Delete a Perkebunana with the specified id in the request
export const deletePerkebunan = async (req, res) => {
  try {
    const id = req.params.id;

    Perkebunan.destroy({
      where: { id: id },
    }).then((num) => {
      if (num == 1) {
        res.send({
          message: 'Perkebunan was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Perkebunan with id=${id}. Maybe Perkebunan was not found!`,
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: 'Could not delete Perkebunan with id=' + id,
    });
  }
};
