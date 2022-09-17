import { beforeAll } from 'vitest'

describe('Signup', () => {
  describe('should navigate to signup', () => {
    it('should show the homepage', () => {
      cy.visit('/')
      cy.contains(/pink/i).should('be.visible')
    })
    it('should navigate to signup', () => {
      cy.visit('/')
      cy.contains(/signup/i).click()
      cy.url().should('include', '/signup')
      cy.contains(/lage ny konto/i).should('be.visible')
    })
  })
  describe('when filling out the form', () => {
    beforeEach(() => {
      cy.visit('/signup')
    })
    it('should show success message when created user', () => {
      cy.intercept('POST', '/api/users', (req) => {
        expect(req.body).to.include({
          email: 'test@test.no',
          password: '123456',
        })
        req.reply({
          statusCode: 201,
          body: {
            success: true,
            data: {
              id: '1',
              email: 'test@test.no',
              password: '123456',
            },
          },
        })
      }).as('createUser')
      cy.clock()

      cy.get('form').within(() => {
        cy.get('input[name=email]').type('test@test.no')
        cy.get('input[name=password]').type('123456')
        cy.get('button').click()
      })
      cy.wait('@createUser')
      cy.contains(/sendt/i).should('be.visible')
      cy.get('.toast').should('be.visible')
      cy.tick(5000)
      cy.get('.toast').should('not.exist')
    })
    it('should show error if user exist (server)', () => {
      cy.intercept('POST', '/api/users', (req) => {
        expect(req.body).to.include({
          email: 'test@test.no',
          password: '123456',
        })
        req.reply({
          statusCode: 409,
          body: {
            success: false,
            error: 'User exist',
          },
        })
      }).as('createUser')
      cy.get('form').within(() => {
        cy.get('input[name=email]').type('test@test.no')
        cy.get('input[name=password]').type('123456')
        cy.get('button').click()
      })
      cy.get('.toast').should('not.exist')
      cy.contains(/user exist/i).should('be.visible')
    })

    it('should show error if email validation fails (server)', () => {
      cy.intercept('POST', '/api/users', (req) => {
        expect(req.body).to.include({
          email: 'test@test.no',
          password: '123456',
        })
        req.body.email = ''
        req.continue((res) => {
          expect(res.body).to.have.property('success')
          expect(res.body).to.include({ success: false })

          res.send({
            statusCode: 400,
            body: {
              success: false,
              error: 'Email not valid',
            },
          })
        })
      }).as('createUser')
      cy.get('form').within(() => {
        cy.get('input[name=email]').type('test@test.no')
        cy.get('input[name=password]').type('123456')
        cy.get('button').click()
      })
      cy.contains(/email not valid/i).should('be.visible')
    })
    it('should show error if password validation fails (server)', () => {
      cy.intercept('POST', '/api/users', (req) => {
        expect(req.body).to.include({
          email: 'test@test.no',
          password: '123456',
        })
        req.body.password = ''
        req.continue((res) => {
          expect(res.body).to.have.property('success')
          expect(res.body).to.include({ success: false })

          res.send({
            statusCode: 400,
            body: {
              success: false,
              error: 'Password not valid',
            },
          })
        })
      }).as('createUser')
      cy.get('form').within(() => {
        cy.get('input[name=email]').type('test@test.no')
        cy.get('input[name=password]').type('123456')
        cy.get('button').click()
      })
      cy.contains(/password not valid/i).should('be.visible')
    })
    it('should show error if server fails', () => {
      cy.intercept('POST', '/api/users', {
        statusCode: 500,
        body: {
          success: false,
          error: 'Error creating user',
        },
      }).as('createUser')
      cy.get('form').within(() => {
        cy.get('input[name=email]').type('test@test.no')
        cy.get('input[name=password]').type('123456')
        cy.get('button').click()
      })
      cy.contains(/error creating user/i).should('be.visible')
    })
    it('should show error if email not valid (client)', () => {
      cy.get('form').within(() => {
        cy.get('input[name=email]').type('test')
        cy.get('input[name=password]').type('123456')
        cy.get('button').click()
      })
      cy.get('[data-testid="form-error"]').should('be.visible')
    })
    it('should show error if password not valid (client)', () => {
      cy.get('form').within(() => {
        cy.get('input[name=email]').type('test@test.no')
        cy.get('input[name=password]').type('1')
        cy.get('button').click()
      })
      cy.get('[data-testid="form-error"]').should('be.visible')
    })
    it('should remove error if password got valid (client)', () => {
      cy.intercept('POST', '/api/users', {
        statusCode: 201,
        body: {
          success: true,
          data: {
            id: '1',
            email: 'test@test.no',
            password: '123456',
          },
        },
      }).as('createUser')
      cy.signup('test@test.no', '1')
      cy.get('[data-testid="form-error"]').should('be.visible')
      cy.signup('test@test.no', '123456')
      cy.get('[data-testid="form-error"]').should('not.exist')
    })
  })
})
