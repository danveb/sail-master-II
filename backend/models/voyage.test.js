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

describe("create a new voyage", function () {
	test("creates new voyage successfully", async function () {
		let voyage = await Voyage.create(newVoyage) 
		expect(voyage).toEqual({
			...newVoyage,
			id: expect.any(Number)
		});
	});
});

describe("find all voyage in the database", function () {
	test("finds all voyage in db", async function () {
		let voyage = await Voyage.findAll();

		expect(voyage).toEqual([
			{ ...voyage1, id: testVoyageIds[0] }
		]);
	});
});