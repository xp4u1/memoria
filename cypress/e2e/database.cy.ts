import { generateReflectionID } from "../../src/data/entry";

const exampleDateNoon = new Date("2024-09-22T14:00:00.000Z");
const exampleDateNight = new Date("2024-09-23T01:00:00.000Z");

const setClock = (date: Date) => {
  cy.clock(date, ["Date"]);
};

describe("Working with database entries", () => {
  it("Creates, saves, edits and deletes a new reflection", () => {
    setClock(exampleDateNoon);
    const reflectionID = generateReflectionID(exampleDateNoon);

    cy.visit("/home");
    cy.get("[data-cy='addReflectionButton']").click();

    cy.url().should("include", "/writer/").and("include", reflectionID);

    cy.get("[data-cy='saveButton']").click();
    cy.url().should("include", "/home");

    cy.visit("/database/");
    cy.get("[data-cy='databaseEntries']")
      .find(`[data-id='${reflectionID}']`)
      .find("[data-cy='editButton']")
      .click();

    cy.url().should("include", "/writer/");

    const newTitle = "Testing new title";
    cy.get("[data-cy='titleInput']").type(newTitle);
    cy.get("[data-cy='saveButton']").click();

    cy.url().should("include", "/database/");
    cy.get("[data-cy='databaseEntries']")
      .find(`[data-id='${reflectionID}']`)
      .within(() => {
        cy.contains(newTitle);
        cy.get("[data-cy='deleteButton']").click();
      });

    cy.get("[data-cy='deletePrompt']").find("button").last().click();

    cy.get("[data-cy='databaseEntries']")
      .find(`[data-id='${reflectionID}']`)
      .should("have.length", 0);
  });

  it("Opens reflection from day before (night)", () => {
    setClock(exampleDateNight);

    cy.visit("/home");
    cy.get("[data-cy='addReflectionButton']").click();

    cy.get("[data-cy='dayPrompt']")
      .find("button.alert-button")
      .should("have.length", 2)
      .first()
      .click();

    // Should open or create the entry from the day before.
    cy.url()
      .should("include", "/writer/")
      .and("include", generateReflectionID(exampleDateNoon));
  });
});
