const Pool = require("pg").Pool;
const pool = new Pool({
  user: "ceph",
  host: 'database',
  database: "cephs_citchen",
  password: "ceph",
  port: 5433,
});

const getUnits = (req, res) => {
  pool.query("SELECT * FROM tbl_units", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getUnitsByType = (req, res) => {
  const { id } = req.params;
  if (parseInt(id)) { // if request sent typeID, return filtered units
    pool.query("SELECT * FROM tbl_units WHERE unit_type_id = $1", [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    })
  } else {  // if request sent bad typeID, complain
    res.status(400).send("Malformed unit ID")
  }
}

const getUnitByName = (req, res) => {
  const { unitName } = req.params;
  if (unitName) { // check for malformed params
    pool.query("SELECT * FROM tbl_units WHERE unit_name = $1", [unitName], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {  // if unitName wasn't found in units DB
        res.status(400).send("Measurement not found")
      } else {  
        res.status(200).json(results.rows);
      }
    })
  } else {
    res.status(400);
  }
};

module.exports = {
  getUnits,
  getUnitsByType,
  getUnitByName,
};
