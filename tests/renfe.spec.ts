import { test, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { TopMenuPage } from '../pages/top-menu-page';
import { expect } from '@playwright/test';

const URL = 'https://renfe.com';
let homePage: HomePage;
let topMenuPage: TopMenuPage;
const pageUrl = /.*intro/;

test.beforeEach(async ({page}) => {
    await page.goto(URL);
    homePage = new HomePage(page);
});

async function clickGetStarted(page: Page) {
    await homePage.clickGetStarted();
    topMenuPage = new TopMenuPage(page);
}

test.describe('Renfe website', () => {

    test('page is up', async () => {
        await homePage.assertPageTitle();
    });
    

    test('buy ticket from Valencia to Bilbao', async ({ page }) => {
        // Act
        await homePage.assertPageTitle();
        await page.getByRole('button', { name: 'Aceptar todas las cookies' }).click();
        await page.getByText('Viajar', { exact: true }).click();
        await page.getByRole('link', { name: 'Billetes Ave y Larga Distancia' }).click();
        await page.getByPlaceholder('Estación de origen').click();
        await page.getByPlaceholder('Estación de origen').fill('valencia');
        await page.getByRole('option', { name: 'VALENCIA (TODAS)' }).click();
        await page.getByPlaceholder('Estación de destino').click();
        await page.getByPlaceholder('Estación de destino').fill('bilbao');
        await page.getByRole('option', { name: 'BILBAO (TODAS)' }).click();
        await page.getByRole('button', { name: 'Buscar billete' }).click();
        await page.waitForTimeout(5000); // Because Renfe be Renfe
                
        // Assert
        await expect(page.locator('.tab-content')).toContainText('no existe conexión directa');
    });
  
    test('buy ticket test using POM', async ({ page }) => {
        // Act
        await homePage.assertPageTitle();
        await homePage.acceptAllCookies(page);
        await homePage.navigateToTripSelector(page);
        await homePage.selectOrigin(page);
        await homePage.selectDestination(page);
        await homePage.searchForTrainTicket(page)
             
        // Assert
        await expect(page.locator('.tab-content')).toContainText('no existe conexión directa');
    });

});