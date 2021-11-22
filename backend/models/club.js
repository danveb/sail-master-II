"use strict"

const db = require("../db")
const { NotFoundError} = require("../expressError")

/** Related functions for Clubs. */

class Club {
  /** Find all clubs 
   * Returns [{ id, name, address, city, state, zip, lat, lon, tel, url }, ...]
   * */

  static async findAll() {
    let result = await db.query(
      `SELECT id, name, address, city, state, zip, lat, lon, tel, url FROM clubs
      ORDER BY name`
    )
    return result.rows
  }

  /** Given a club id, return data about club
   * Returns { id, name, address, city, state, zip, lat, lon, tel, url }
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const clubRes = await db.query(
        `SELECT id, name, address, city, state, zip, lat, lon, tel, url
        FROM clubs
        WHERE id = $1`, 
        [id]
    );

    const club = clubRes.rows[0]

    if (!club) throw new NotFoundError(`No club: ${id}`)
    return club;
  }
}

module.exports = Club
