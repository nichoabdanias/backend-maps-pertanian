import Petani from '../models/petaniModel.js';
import { Op } from 'sequelize';

// Get Data Petani Pagination
// Pagination
export const getPetani = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || '';
    const offset = limit * page;
    const totalRows = await Petani.count({
      where: {
        [Op.or]: [
          {
            jenis_kelamin: {
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
    const result = await Petani.findAll({
      where: {
        [Op.or]: [
          {
            jenis_kelamin: {
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

// Create and Save a new Petani
export const postePetani = async (req, res) => {
  try {
    if (!req.body.jenis_kelamin) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
      return;
    }

    // Create a Petani
    const newPetani = {
      jenis_kelamin: req.body.jenis_kelamin,
      kecamatan: req.body.kecamatan,
      desa: req.body.desa,
      total: req.body.total,
      tahun: req.body.tahun,
    };

    // Save Petani in the database
    Petani.create(newPetani).then((data) => {
      res.send(data);
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: err.message || 'Some error occurred while creating the petani.',
    });
  }
};

// Find a single Petani with an id
export const getPetaniById = async (req, res) => {
  try {
    const id = req.params.id;

    Petani.findByPk(id).then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find petani with id=${id}`,
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error retrieving petani with id=' + id,
    });
  }
};

// Update a Tutorial by the id in the request
export const updatePetani = async (req, res) => {
  try {
    const id = req.params.id;

    Petani.update(req.body, {
      where: { id: id },
    }).then((num) => {
      if (num == 1) {
        res.send({
          message: 'petani was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update petani with id=${id}. Maybe petani was not found or req.body is empty!`,
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error updating petani with id=' + id,
    });
  }
};

// Delete a Petani with the specified id in the request
export const deletePetani = async (req, res) => {
  try {
    const id = req.params.id;

    Petani.destroy({
      where: { id: id },
    }).then((num) => {
      if (num == 1) {
        res.send({
          message: 'petani was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete petani with id=${id}. Maybe petani was not found!`,
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: 'Could not delete petani with id=' + id,
    });
  }
};
