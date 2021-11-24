"use strict";

const { UnauthorizedError } = require("../expressError")
const db = require("../db.js")
const User = require("./user.js")
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	newUser,
	user1,
} = require("./_testCommon")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

/************************************** */

describe("user authenticate", function() {
    test("works with username/password", async function() {
        const user = await User.authenticate("u1", "password1")
        expect(user).toEqual(user1) 
    })

	test("unauthorized if no user", async function () {
		try {
			await User.authenticate("nope", "password")
			fail()
		} catch (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy()
		}
	})

	test("unauthorized if wrong password", async function () {
		try {
			await User.authenticate("c1", "wrong")
			fail()
		} catch (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy()
		}
	})
})

describe("register new user", function() {
    test("successfully registers new user", async function() {
        let user = await User.register({
            ...newUser, 
            password: "password"
        })
        expect(user).toEqual(newUser) 
    })

    test("registers an admin", async function() {
        let user = await User.register({
            ...newUser, 
            password: "password", 
            isAdmin: true
        })
        expect(user).toEqual({...newUser, isAdmin:true})
    })
})

describe("find all users", function() {
    test("displays all users", async function() {
        let users = await User.findAll()
        expect(users).toEqual([user1])
    })
})

describe("find a user by username", function() {
    test("display correct user", async function() {
        let user = await User.get("u1")
        expect(user).toEqual(user1)
    })
})

describe("update a user", function() {
    // initialize with updateData
    const updateData = {
        firstName: "TestUser", 
        lastName: "Fake", 
        email: "test@gmail.com", 
        isAdmin: false 
    }

    test("updates the profile information", async function() {
        let user = await User.update("u1", updateData)
        expect(user).toEqual({
            username: "u1", 
            firstName: "TestUser", 
            lastName: "Fake", 
            email: "test@gmail.com", 
            isAdmin: false
        })
    })
})

describe("remove user from database", function() {
    test("deletes a user", async function() {
        await User.remove("u1")
        const res = await db.query(`DELETE FROM users WHERE username='u1'`)
        expect(res.rows.length).toEqual(0)
    })
})