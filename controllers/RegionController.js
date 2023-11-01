import dbw from '../config/dbWilayah.js';

const executeDB = (sql, values) => {
  return new Promise((resolve) => {
    dbw
      .query(sql, { replacements: values, type: dbw.QueryTypes.SELECT })
      .then((result) => {
        resolve({
          status: true,
          code: 200,
          message: 'GET Success',
          data: result,
        });
      })
      .catch((error) => {
        console.error('Database query error:', error);
        resolve({
          status: false,
          code: 500,
          error: 'Internal Server Error',
        });
      });
  });
};

//Provinsi
export const getAllProvinces = async (req, res) => {
  const search =
    req.query.search === '' || req.query.search === undefined
      ? '%%'
      : `%${req.query.search.toLowerCase()}%`;

  const sql = 'SELECT * FROM provinces  WHERE LOWER(prov_name) LIKE ?';
  const values = [search];

  try {
    const response = await executeDB(sql, values);
    res.status(response.code).send(response);
  } catch (error) {
    console.error('Error:', error.message);
    res
      .status(500)
      .json({ status: false, code: 500, error: 'Internal Server Error' });
  }
};

// kota/kab

export const getAllRegency = async (req, res) => {
  const search = req.query.search
    ? `%${req.query.search.toLowerCase()}%`
    : '%%';
  const provId = req.query.province_id || null;

  const sql = `
    SELECT * FROM cities
    WHERE LOWER(city_name) LIKE :search
    AND (:prov_id IS NULL OR prov_id = :prov_id)
  `;

  const values = {
    search,
    prov_id: provId,
  };

  try {
    const response = await executeDB(sql, values);
    res.status(response.code).send(response);
  } catch (error) {
    console.error('Error:', error.message);
    res
      .status(500)
      .json({ status: false, code: 500, error: 'Internal Server Error' });
  }
};

// Kecamatan
export const getAllDistricts = async (req, res) => {
  const search = req.query.search
    ? `%${req.query.search.toLowerCase()}%`
    : '%%';
  const regencyId = req.query.city_id || null;

  const sql = `
    SELECT * FROM districts
    WHERE LOWER(dis_name) LIKE :search
    AND (:city_id IS NULL OR city_id = :city_id)
  `;

  const values = {
    search,
    city_id: regencyId,
  };

  try {
    const response = await executeDB(sql, values);
    res.status(response.code).send(response);
  } catch (error) {
    console.error('Error:', error.message);
    res
      .status(500)
      .json({ status: false, code: 500, error: 'Internal Server Error' });
  }
};

// Desa
export const getAllVillages = async (req, res) => {
  const search = req.query.search
    ? `%${req.query.search.toLowerCase()}%`
    : '%%';
  const districtId = req.query.dis_id || null;

  const sql = `
    SELECT * FROM subdistricts
    WHERE LOWER(subdis_name) LIKE :search
    AND (:dis_id IS NULL OR dis_id = :dis_id)
  `;

  const values = {
    search,
    dis_id: districtId,
  };

  try {
    const response = await executeDB(sql, values);
    res.status(response.code).send(response);
  } catch (error) {
    console.error('Error:', error.message);
    res
      .status(500)
      .json({ status: false, code: 500, error: 'Internal Server Error' });
  }
};
