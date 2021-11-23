const bcrypt = require("bcrypt")
const db = require("../db.js")
const { BCRYPT_WORK_FACTOR } = require("../config")

/** Common tests for models. */

const testVoyageIds = [];

const newVoyage = {
	startPoint: "Newport Harbor Yacht Club",
	endPoint: "Ox Bow Yacht Club",
    sailorUsername: "testadmin"	
}

const voyage1 = {
    startPoint: "Seattle Yacht Club",
	endPoint: "San Francisco Yacht Club",
    sailorUsername: "testadmin"
}

const newUser = {
    username: "new",
	firstName: "Test",
	lastName: "Tester",
	email: "test@test.com",
	isAdmin: false
}

const user1 = {
	username: "u1",
	firstName: "U1F",
	lastName: "U1L",
	email: "u1@email.com",
	isAdmin: false
}

async function commonBeforeAll () {
	await db.query("DELETE FROM users")
	await db.query("DELETE FROM voyage")

	await db.query(
		`INSERT INTO users (username, password, first_name, last_name, email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com')
        RETURNING username`,
		[await bcrypt.hash("password1", BCRYPT_WORK_FACTOR)]
	)

	const resultsVoyage = await db.query(
		`INSERT INTO voyage (start_point, end_point, sailor_username) 
        VALUES ('Seattle Yacht Club', 'San Francisco Yacht Club', 'testadmin')
        RETURNING id`
	);
	testVoyageIds.splice(0, 0, ...resultsVoyage.rows.map((r) => r.id));
}

async function commonBeforeEach() {
	await db.query("BEGIN")
}

async function commonAfterEach() {
	await db.query("ROLLBACK")
}

async function commonAfterAll() {
	await db.end()
}

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testVoyageIds,
	newVoyage,
	voyage1,
	newUser,
	user1
};