describe("TypeScript spec", () => {
	it("works", () => {
		expect(true).toEqual(true)
	})
	it("Does load home page", () => {
		cy.visit("http://localhost:3000").get("h1").should("have.text", "Gi en digital julekalender til noen du er glad i")
	})
})
