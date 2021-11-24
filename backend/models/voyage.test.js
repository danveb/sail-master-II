"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Voyage = require("./voyage.js");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testVoyageIds,
	newVoyage,
	voyage1
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** */

describe("create a new voyage", function() {
	test("creates new voyage successfully", async function() {
		let voyage = await Voyage.create(newVoyage) 
		expect(voyage).toEqual({
			...newVoyage,
			id: expect.any(Number)
		})
	})
})

describe("find all voyage in the database", function() {
	test("finds all voyage in db", async function() {
		let voyage = await Voyage.findAll();

		expect(voyage).toEqual([
			{ ...voyage1, id: testVoyageIds[0] }
		])
	})
})

describe("find voyage based on id", function() {
	test("find voyage per id", async function() {
		let voyage = await Voyage.get(testVoyageIds[0])
		expect(voyage).toEqual({
			...voyage1, 
			id: testVoyageIds[0]
		})
	})

	test("did not find voyage per id", async function() {
		try {
			await Voyage.get(0)
			fail()
		} catch(err) {
			expect(err instanceof NotFoundError).toBeTruthy()
		}
	})
})

describe("remove a voyage using id", function() {
	test("works when removing a voyage", async function() {
		await Voyage.remove(testVoyageIds[0])
		const res = await db.query('DELETE FROM voyage WHERE id=$1', [testVoyageIds[0]])
		expect(res.rows.length).toEqual(0) 
	})
})