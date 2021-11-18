"use strict"

/** Routes for clubs */
const express = require("express")
const Club = require("../models/club")
const router = express.Router({ mergeParams: true })

/** GET / =>
 *   { club: [ { id, name, address, city, state, zip, lat, lon, tel, url }, ...] }
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  try {
    const club = await Club.findAll()
    return res.json({ club })

  } catch (err) {
    return next(err)
  }
});

/** GET /clubs/id
 * Returns { id, id, name, address, city, state, zip, lat, lon, tel, url }
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const club = await Club.get(req.params.id)
    return res.json({ club })
  } catch (err) {
    return next(err)
  }
});

module.exports = router