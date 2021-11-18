"use strict"

const db = require("../db")
const { NotFoundError} = require("../expressError")
const { sqlForPartialUpdate } = require("../helpers/sql")

/** Related functions for Voyage. */

class Voyage {
  /** Create a voyage (from data), update db, return new voyage data.
   * data should be { start_point, end_point, sailor_username }
   * Returns { id, start_point, end_point, sailor_username }
   **/

  static async create(data) {
    const result = await db.query(
      `INSERT INTO voyage (start_point, end_point, sailor_username)
      VALUES ($1, $2, $3) 
      RETURNING id, start_point AS "startPoint", end_point AS "endPoint", sailor_username AS "sailorUsername"`,
      [
        data.startPoint,
        data.endPoint,
        data.sailorUsername
      ]
    )

    let voyage = result.rows[0]
    return voyage;
  }

  /** Find all voyages.
   * Returns [{ id, start_point, end_point, sailor_username }, ...]
   * */

  static async findAll() {
    const result = await db.query(
      `SELECT id, start_point AS "startPoint", end_point AS "endPoint", sailor_username AS "sailorUsername"
      FROM voyage`
    )
    return result.rows
  }

  // /** Given a voyage id, return data about voyage.
  //  * Returns { id, id, start_point, end_point, sailor_username }
  //  *   where sailor is { username, first_name, last_name, email }
  //  * Throws NotFoundError if not found.
  //  **/

  static async get(id) {
    const voyageRes = await db.query(
      `SELECT id, start_point AS "startPoint", end_point AS "endPoint", sailor_username AS "sailorUsername"
      FROM voyage
      WHERE id = $1`,
      [id]
    )
    const voyage = voyageRes.rows[0]
    if(!voyage) throw new NotFoundError(`No voyage found with ID: ${id}`)

    const sailorRes = await db.query(
      `SELECT username, first_name AS "firstName", last_name AS "lastName", email
      FROM users 
      WHERE username = $1`,
      [voyage.sailorUsername]
    )

    voyage.user = sailorRes.rows[0]
    return voyage; 
  }

  // /** Update voyage data with `data`.
  //  * Data can include: { start_point, end_point }
  //  * Returns { id, start_point, end_point, sailor_username }
  //  * Throws NotFoundError if not found.
  //  */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      startPoint: "start_point",
      endPoint: "end_point"
    });
    const idVarIdx = "$" + (values.length + 1)

    const querySql = `UPDATE voyage 
    SET ${setCols} 
    WHERE id = ${idVarIdx} 
    RETURNING id, start_point AS "startPoint", end_point AS "endPoint", sailor_username AS "sailorUsername"`;

    const result = await db.query(querySql, [ ...values, id ])
    const voyage = result.rows[0]
    if (!voyage) throw new NotFoundError(`No voyage: ${id}`)
    return voyage;
  }

  // /** Delete given voyage from database; returns undefined.
  //  * Throws NotFoundError if company not found.
  //  **/

  static async remove(id) {
    const result = await db.query(
      `DELETE
      FROM voyages
      WHERE id = $1
      RETURNING id`, 
      [id]
    );
    const voyage = result.rows[0]
    if (!voyage) throw new NotFoundError(`No voyage: ${id}`)
  }
}

module.exports = Voyage