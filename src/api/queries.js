const Pool = require("pg").Pool;
const pool = new Pool({
  user: "ceph",
  host: 'localhost',
  database: "cephs_citchen",
  password: "ceph",
  port: 5433,
});

const getUnits = (req, res) => {
  const { typeID } = req.query;
  if (typeID) {
    pool.query("SELECT * FROM tbl_units WHERE unit_type_id = $1", [typeID], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    })
  } else {
    pool.query("SELECT * FROM tbl_units", (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }
};

module.exports = {
  getUnits,
};
