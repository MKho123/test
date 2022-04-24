/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("http://localhost:3000");
})

describe("Test Case 1: Validate all elements are displayed", function(){
  it("Visit the page and check if all elements are visible on the screen", function(){
    cy.get("label[name=fullNameLbl]").should("be.visible");
    cy.get("input[name=fullName]").should("be.visible");
    cy.get("label[name=emailLbl]").should("be.visible");
    cy.get("input[name=email]").should("be.visible");
    cy.get("input[name=flexibleCheckbox]").should("be.visible");
    cy.get("label[name=daysAvailLbl]").should("be.visible");
    cy.get("input[name=daysAvail]").should("be.visible");
    cy.get("button[name=submitBtn]").should("be.visible");
    cy.screenshot();
  })
})

describe("Test Case 2: Invalid Email Address Validation", function(){
  it("Validation message should display when an invalid email address is entered", function(){
    cy.get("input[name=email]").type("123@.com");
    cy.get("button[name=submitBtn]").click();
    cy.get("div.email-wrapper > p").should("have.text", "This is not a valid email address format");
    cy.screenshot();
  })

  it("Validation message should not be visible when a valid email address is entered", function(){
    cy.get("input[name=email]").type("test@email.com");
    cy.get("button[name=submitBtn]").click();
    cy.get("div.email-wrapper > p").should("not.be.visible");
    cy.screenshot();
  })

  it("Validation message should not be visible when no email address is entered", function(){
    cy.get("input[name=email]").focus().clear();
    cy.get("button[name=submitBtn]").click();
    cy.get("div.email-wrapper > p").should("not.be.visible");
    cy.screenshot();
  })
})

describe("Test Case 3: Required Full Name Validation", function(){
  it("Validation message should display when Full Name is empty", function(){
    cy.get("input[name=fullName]").focus().clear();
    cy.get("button[name=submitBtn]").click();
    cy.get("div.fullName-wrapper > p").should("have.text", "Full name is required");
    cy.screenshot();
  })

  it("Validation message should not be visible when Full Name is populated", function(){
    cy.get("input[name=fullName]").type("Juan Dela Cruz");
    cy.get("button[name=submitBtn]").click();
    cy.get("div.fullName-wrapper > p").should("not.be.visible");
    cy.screenshot();
  })
})

describe("Test Case 4: Correct Format for Days for Availability Validation", function(){
  it("Validation message should display when a non-numerical value is entered in Days for Availability", function(){
    cy.get("input[name=daysAvail]").type("ABCD");
    cy.get("button[name=submitBtn]").click();
    cy.get("div.days-availability-wrapper > p").should("have.text", "Days for Availability only accepts numbers");
    cy.screenshot();
  })

  it("Validation message should not be visible when a numerical value is entered in Days for Availability", function(){
    cy.get("input[name=daysAvail]").type("5");
    cy.get("button[name=submitBtn]").click();
    cy.get("div.days-availability-wrapper > p").should("not.be.visible");
    cy.screenshot();
  })
})

describe("Test Case 5: Max Length for Full Name Validation", function(){
  it("Full name only allows a maximum of 100 characters", function(){
    var longText = "101_CHARACTER_STRING000000000000000000000000000000000000000000000000000000000000000000000000123456789";
    var allowedMaxChar = longText.substring(0, 101);
    cy.log("Long text: " + allowedMaxChar);
    var allowedMaxChar2 = longText.substring(0, 100);
    cy.log("100 characters of long text: " + allowedMaxChar2);

    cy.get("input[name=fullName]").type(longText);
    cy.get("input[name=fullName]").should('have.value', allowedMaxChar2);
    cy.screenshot();
  })
})

describe("Test Case 6: Flexible and Days for Availability Validation", function(){
  it("Days for Availability is not required when Flexible checkbox is ticked", function(){
    cy.get("input[name=flexibleCheckbox]").click();
    cy.get("button[name=submitBtn]").click();
    cy.get("div.days-availability-wrapper > p").should("not.be.visible");
    cy.screenshot();
  })

  it("Days for Availability is required when Flexible checkbox is not ticked", function(){
    cy.get("input[name=flexibleCheckbox]").click();
    cy.get("input[name=flexibleCheckbox]").click();
    cy.get("button[name=submitBtn]").click();
    cy.get("div.days-availability-wrapper > p").should("have.text", "Days for Availability is required");
    cy.screenshot();
  })  
})

describe("Test Case 7: All Error Message Validation", function(){
  it("Full Name = blank\nEmail Address = invalid format\nFlexible = unchecked\nDays for Availability = invalid format", function(){
    cy.get("input[name=fullName]").focus().clear();
    cy.get("input[name=email]").type("emailAddress.com");
    cy.get("input[name=daysAvail]").type("!@#$");
    cy.get("button[name=submitBtn]").click();

    cy.get("div.fullName-wrapper > p").should("have.text", "Full name is required");
    cy.get("div.email-wrapper > p").should("have.text", "This is not a valid email address format");
    cy.get("div.days-availability-wrapper > p").should("have.text", "Days for Availability only accepts numbers");
    cy.screenshot();
  })

  it("Full Name = entered\nEmail Address = invalid format\nFlexible = unchecked\nDays for Availability = invalid format", function(){
    cy.get("input[name=fullName]").type("Jose Rizal");
    cy.get("input[name=email]").type("emailAddress@lalacom");
    cy.get("input[name=daysAvail]").type("QWERTY");
    cy.get("button[name=submitBtn]").click();

    cy.get("div.fullName-wrapper > p").should("not.be.visible");
    cy.get("div.email-wrapper > p").should("have.text", "This is not a valid email address format");
    cy.get("div.days-availability-wrapper > p").should("have.text", "Days for Availability only accepts numbers");
    cy.screenshot();
  })

  it("Full Name = blank\nEmail Address = valid format\nFlexible = unchecked\nDays for Availability = invalid format", function(){
    cy.get("input[name=fullName]").focus().clear();
    cy.get("input[name=email]").type("test@email.com");
    cy.get("input[name=daysAvail]").type(">=<");
    cy.get("button[name=submitBtn]").click();

    cy.get("div.fullName-wrapper > p").should("have.text", "Full name is required");
    cy.get("div.email-wrapper > p").should("not.be.visible");
    cy.get("div.days-availability-wrapper > p").should("have.text", "Days for Availability only accepts numbers");
    cy.screenshot();
  })

  it("Full Name = blank\nEmail Address = invalid format\nFlexible = checked\nDays for Availability = blank", function(){
    cy.get("input[name=fullName]").focus().clear();
    cy.get("input[name=email]").type("@email.com");
    cy.get("input[name=flexibleCheckbox]").click();
    cy.get("input[name=daysAvail]").focus().clear();
    cy.get("button[name=submitBtn]").click();

    cy.get("div.fullName-wrapper > p").should("have.text", "Full name is required");
    cy.get("div.email-wrapper > p").should("have.text", "This is not a valid email address format");
    cy.get("div.days-availability-wrapper > p").should("not.be.visible");
    cy.screenshot();
  })

  it("Full Name = blank\nEmail Address = invalid format\nFlexible = unchecked\nDays for Availability = blank", function(){
    cy.get("input[name=fullName]").focus().clear();
    cy.get("input[name=email]").type("123.com");
    cy.get("input[name=flexibleCheckbox]").click();
    cy.get("input[name=flexibleCheckbox]").click();
    cy.get("input[name=daysAvail]").focus().clear();
    cy.get("button[name=submitBtn]").click();

    cy.get("div.fullName-wrapper > p").should("have.text", "Full name is required");
    cy.get("div.email-wrapper > p").should("have.text", "This is not a valid email address format");
    cy.get("div.days-availability-wrapper > p").should("have.text", "Days for Availability is required");
    cy.screenshot();
  })

  it("Full Name = entered\nEmail Address = invalid format\nFlexible = unchecked\nDays for Availability = blank", function(){
    cy.get("input[name=fullName]").type("Emilio Aguinaldo");
    cy.get("input[name=email]").type("sheep.com");
    cy.get("input[name=flexibleCheckbox]").click();
    cy.get("input[name=flexibleCheckbox]").click();
    cy.get("input[name=daysAvail]").focus().clear();
    cy.get("button[name=submitBtn]").click();
  
    cy.get("div.fullName-wrapper > p").should("not.be.visible");
    cy.get("div.email-wrapper > p").should("have.text", "This is not a valid email address format");
    cy.get("div.days-availability-wrapper > p").should("have.text", "Days for Availability is required");
    cy.screenshot();
  })

  it("Full Name = blank\nEmail Address = valid format\nFlexible = unchecked\nDays for Availability = blank", function(){
    cy.get("input[name=fullName]").focus().clear();
    cy.get("input[name=email]").type("sheep@ya.com");
    cy.get("input[name=flexibleCheckbox]").click();
    cy.get("input[name=flexibleCheckbox]").click();
    cy.get("input[name=daysAvail]").focus().clear();
    cy.get("button[name=submitBtn]").click();
  
    cy.get("div.fullName-wrapper > p").should("have.text", "Full name is required");
    cy.get("div.email-wrapper > p").should("not.be.visible");
    cy.get("div.days-availability-wrapper > p").should("have.text", "Days for Availability is required");
    cy.screenshot();
  })

  it("Full Name = entered\nEmail Address = valid format\nFlexible = unchecked\nDays for Availability = entered", function(){
    cy.get("input[name=fullName]").type("Andres Bonifacio");
    cy.get("input[name=email]").type("hello@world.com");
    cy.get("input[name=flexibleCheckbox]").click();
    cy.get("input[name=flexibleCheckbox]").click();
    cy.get("input[name=daysAvail]").type(100);
    cy.get("button[name=submitBtn]").click();
  
    cy.get("div.fullName-wrapper > p").should("not.be.visible");
    cy.get("div.email-wrapper > p").should("not.be.visible");
    cy.get("div.days-availability-wrapper > p").should("not.be.visible");
    cy.screenshot();
  })
})

