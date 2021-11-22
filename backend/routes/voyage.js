"use strict"

/** Routes for voyage */

const jsonschema = require("jsonschema")
const express = require("express")
const { BadRequestError } = require("../expressError")
const { ensureCorrectUserOrAdminVoyage } = require("../middleware/auth")
const { ensureCorrectUserOrAdmin } = require("../middleware/auth")
const Voyage = require("../models/voyage")
const voyageNewSchema = require("../schemas/voyageNew.json")
const voyageUpdateSchema = require("../schemas/voyageUpdate.json")
const router = express.Router({ mergeParams: true })

/** POST / { voyage } => { voyage }
 * voyage should be { startPoint, endPoint, sailorUsername }
 * returns { id, startPoint, endPoint, sailorUsername }
 * Authorization required: pending
 */

router.post("/new", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, voyageNewSchema)
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack)
      throw new BadRequestError(errs)
    }

    const voyage = await Voyage.create(req.body)
    return res.status(201).json({ voyage })
  } catch (err) {
    return next(err)
  }
});

/** GET / =>
 *   { voyage: [ { id, startPoint, endPoint, sailorUsername }, ...] }
 * Authorization required: pending
 */

router.get("/", async function (req, res, next) {
  try {
    const voyage = await Voyage.findAll()
    return res.json({ voyage })

  } catch (err) {
    return next(err)
  }
});

/** GET /voyage/id => { voyage + user }
 * Returns { id, startPoint, endPoint, sailorUsername }
 *   where user is { username, first_name, last_name, email }
 * Authorization required: pending
 */

router.get("/:id", async function (req, res, next) {
  try {
    const voyage = await Voyage.get(req.params.id)
    return res.json({ voyage })
  } catch (err) {
    return next(err)
  }
});

/** PATCH /voyage/id/edit
 * Data can include: { startPoint, endPoint }
 * Returns { id, startPoint, endPoint, sailorUsername }
 * Authorization required: pending
 */

router.patch("/:id/edit", ensureCorrectUserOrAdminVoyage, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, voyageUpdateSchema)
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack)
      throw new BadRequestError(errs)
    }

    const voyage = await Voyage.update(req.params.id, req.body)
    return res.json({ voyage })
  } catch (err) {
    return next(err)
  }
});

/** DELETE /voyage/id/delete  =>  { deleted: id }
 * Authorization required: pending
 */

router.delete("/:id/delete", ensureCorrectUserOrAdminVoyage, async function (req, res, next) {
  try {
    await Voyage.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router