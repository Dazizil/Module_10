/// <reference types="cypress" />
describe('App E2E', () => {
    it('should have a form', () => {
        cy.visit('/signUp');
        cy.get('#email-input').type('email@gmail.com').should('have.value', 'email@gmail.com');
        cy.get('#password-input').type('123456').should('have.value', '123456');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/');
        cy.get('[data-testid="post-card"]').should('be.visible');
        cy.get('[data-testid="post-form-container"]').should('be.visible');

        cy.get('.likes-container').invoke('text').then((text) => {
            const initial = parseInt(text.trim(), 10);
            expect(initial).to.be.a('number');

            cy.wrap(initial).as('initialLikes');
        });

        cy.get('[data-testid="like-button"]').first().click();

        cy.get('@initialLikes').then((initialLikes) => {
            const numInitial = Number(initialLikes);
            cy.get('.likes-container').first()
                .invoke('text')
                .should('eq', `${numInitial + 1} likes`);
        });

        cy.get('[data-testid="like-button"]').first().click();

        cy.get('@initialLikes').then((initialLikes) => {
            const numInitial = Number(initialLikes);
            cy.get('.likes-container').first().invoke('text').should('eq', `${numInitial} likes`);
        });

        cy.get('[data-testid="post-card"]').first().within(() => {
            cy.get('[data-testid="open-comments"]').click();

            cy.get('[data-testid="comment-count"]')
                .invoke('text')
                .then((count) => {
                    const initialCount = Number(count);
                    const commentText = 'Test comment';

                    cy.get('textarea.comments-textarea').type(commentText);
                    cy.get('.add-comment-btn').click();

                    cy.get('[data-testid="comment-count"]').should(
                        'have.text',
                        String(initialCount + 1)
                    );

                    cy.get(`[data-testid^="comment-text-"]`)
                        .last()
                        .should('contain.text', commentText);

                    cy.get(`[data-testid^="delete-comment-"]`).last().click();

                    cy.get('[data-testid="comment-count"]').should(
                        'have.text',
                        String(initialCount)
                    );

                    cy.get(`[data-testid^="comment-text-"]`).should(
                        'not.contain.text',
                        commentText
                    );
                });
        });

        cy.get('.header__profile-container').click();
        cy.url().should('include', '/profile');
        cy.get('.profile').should('be.visible');


        cy.get('[data-testid="statistic-button"]').click();

        cy.get('[data-testid="metric-cards-container"]').should('be.visible');

        cy.get('.profile__table-view-container')
            .should('be.visible')
            .and('contain.text', 'Table view')
            .and('contain.text', 'Chart view');

        cy.get('[data-testid="stat-table-block"]').should('be.visible');

        cy.get('[data-testid="profile-info-button"]').click();

        cy.get('html').should('have.class', 'dark');

        cy.get('.profile__theme-switch-container span').first().click();

        cy.get('html').should('have.class', 'light');

        cy.get('.profile__theme-switch-container span').first().click();
        cy.get('html').should('have.class', 'dark');
    })
})

export {};