beforeEach(() =>{
  cy.login()
  cy.intercept('https://dev.omni-dispatch.com/api/v1/trucks?page=1&page_size=10&archived=false').as('trucks')
})
describe('Second test suite', () => {
    it('Smoke', () => {
      cy.get('span').contains('Test User').should('be.visible')
      cy.get('.v-table__wrapper').find('table').contains('Truck and Trailer').should('be.visible')
      cy.get('form[role=presentation]').should('be.visible')
      cy.wait('@trucks').then(({response}) =>{
        expect(response.body.items[0].driver.name).to.equal('Test_Driver1')
      })
      })

    it('Dims & payload validation', () => {
      cy.wait('@trucks').then(({response}) =>{
        const dimsAndPayload = `${response.body.items[0].trailer.length}″${response.body.items[0].trailer.door_height}″${response.body.items[0].trailer.door_width}″`
        cy.get('[data-qa=truck-trailer-dims]').eq(0).then((theElement) => {
          let article = theElement.text();
          article = article.slice(0, -1).replace(' х ', "").replace(' x ', "");
          expect(dimsAndPayload).to.equal(article)
        });
        const lbs = `${response.body.items[0].trailer.payload} lbs`
        cy.get('[data-qa=truck-trailer-dims]').eq(0).next().should('have.text', `${lbs}`)
      })
    })

    it('Filter functional test', () => {
      cy.get('[data-qa=search-results]').should('have.text', '5 results found ')
      cy.get('[data-qa=truck-status]').eq(0).click()
      cy.get('div').contains('On hold').click()
      cy.get('#search--apply-btn').click()
      cy.get('[data-qa=search-results]').should('have.text', '0 results found ')
      cy.get('#search--reset-btn').click()
      cy.get('[data-qa=search-results]').should('have.text', '5 results found ')
    })
    })