describe("Testing form inputs", () => {
    beforeEach(function () {
        cy.visit("http://localhost:3000/");
    });

    it("input name into name input", () => {
        cy.get('input[name="name"]')
        .type("Tasha Marie")
        .should("have.value", "Tasha Marie");
    });

    it("input email into email input", () => {
        cy.get('input[name="email"]')
        .type("tashingsworth@gmail.com")
        .should("have.value", "tashingsworth@gmail.com")
        .clear();
        cy.get('input[name="email"]')
        .type("tash")
        cy.contains("Must be a valid email address")
    });

    it("input password into password input", () => {
        cy.get('input[name="password"]')
        .type("cjso3ofg");
    });

    it("check if user can check checkbox", () => {
        cy.get('input[type="checkbox"]').check().should("be.checked")
        cy.get('input[type="checkbox"]').uncheck();
    });

    it("check submit", () => {
        cy.get('form').submit();
    });
    
})

