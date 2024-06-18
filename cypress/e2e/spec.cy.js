import * as credentials from '../support/credentials.js'
describe('First test suite', () => {
    it('Add/Remove Elements', () => {
      cy.visit('https://the-internet.herokuapp.com/add_remove_elements/');
      cy.get('#content').find('h3').should('have.text', 'Add/Remove Elements');
      cy.get('button').contains('Add Element').click();
      cy.get('button').contains('Delete').should('be.visible').click();
      cy.get('button').contains('Delete').should('not.exist')
    })
  
  it('Checkboxes', () => {
    cy.visit('https://the-internet.herokuapp.com/checkboxes');
    cy.get('#content').find('h3').should('have.text', 'Checkboxes');
    cy.get('#checkboxes').children().first().click().should('be.checked')
    cy.get('#checkboxes').children().last().click().should('not.be.checked')
  })

  it('Dropdown', () => {
    cy.visit('https://the-internet.herokuapp.com/dropdown');
    cy.get('#content').find('h3').should('have.text', 'Dropdown List');
    cy.get('select').select('Option 1').should('have.value', '1');
    cy.get('select').select('Option 2')
    cy.get('select').find('option').contains('Option 2').should('have.attr', 'selected');
  })
  
  it('Form Authentication', () => {
    cy.visit('https://the-internet.herokuapp.com/login');
    cy.get('#content').find('h2').as('titleH2').should('have.text', 'Login Page');
    cy.get('#username').type(credentials.adminCredentials.username);
    cy.get('#password').type(credentials.adminCredentials.password);
    cy.get('button').click();
    cy.get('@titleH2').should('have.text', ' Secure Area');
    cy.get('#flash').should('be.visible')
    cy.get('a').find('i').contains(' Logout').should('be.visible').click()
    cy.get('@titleH2').should('have.text', 'Login Page');
  })

  it('Horizontal slider', () => {
    cy.visit('https://the-internet.herokuapp.com/horizontal_slider');
    cy.get('#content').find('h3').should('have.text', 'Horizontal Slider');
    cy.get('#range').should('have.text', '0');
    cy.get('input[type=range]').as('range').invoke('val', 5).trigger('change');
    cy.get('#range').should('have.text', '5');
    cy.get('@range').invoke('val', 2.5).trigger('change');
  })

  it('Hovers', () => {
    cy.visit('https://the-internet.herokuapp.com/hovers');
    cy.get('#content').find('h3').should('have.text', 'Hovers');
    cy.get('.example').find('.figure').as('image').first().realHover()
    cy.get('h5').contains('name: user1').should('be.visible')
    cy.get('@image').last().realHover()
    cy.get('h5').contains('name: user3').should('be.visible')
  })

  it('Inputs', () => {
    cy.visit('https://the-internet.herokuapp.com/inputs');
    cy.get('#content').find('h3').should('have.text', 'Inputs');
    cy.get('input[type=number]').type('10').should('have.value', '10')
    cy.get('input[type=number]').type('{upArrow}{upArrow}{upArrow}').should('have.value', '13')
    cy.get('input[type=number]').type('{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}').should('have.value', '8')
  })
})