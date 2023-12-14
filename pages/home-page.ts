import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly getStartedButton: Locator;
    readonly pageTitle: RegExp;
    readonly cookieButton: String;
    readonly ticketType: String;
    readonly origin:String;
    readonly destination:String;
    readonly originStation: String;
    readonly destinationStation: String;
    readonly originOption:String;
    readonly destinationOption:String;
    readonly searchTicketButton:String;

    constructor(page: Page) {
        this.page = page;
        this.getStartedButton = page.getByRole('link', { name: 'Get started' });
        this.pageTitle = /Renfe/;
        this.cookieButton = "Aceptar todas las cookies";
        this.ticketType = 'Billetes Ave y Larga Distancia';
        this.originStation = 'Estación de origen';
        this.origin = "valencia";
        this.originOption = 'VALENCIA (TODAS)';
        this.destinationStation = 'Estación de destino';
        this.destination = "Bilbao";
        this.destinationOption = 'BILBAO (TODAS)';
        this.searchTicketButton = 'Buscar billete'

    }

    async clickGetStarted() {
        await this.getStartedButton.click();
    }

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.pageTitle);
    }

    async acceptAllCookies(page){
        await page.getByRole('button', { name: this.cookieButton }).click();
    }

    async navigateToTripSelector(page){
        await page.getByText('Viajar', { exact: true }).click();
        await page.getByRole('link', { name: this.ticketType }).click();
    }

    async selectOrigin(page){
        await page.getByPlaceholder(this.originStation).click();
        await page.getByPlaceholder(this.originStation).fill(this.origin);
        await page.getByRole('option', { name: this.originOption }).click();
    }

    async selectDestination(page){
        await page.getByPlaceholder(this.destinationStation).click();
        await page.getByPlaceholder(this.destinationStation).fill('bilbao');
        await page.getByRole('option', { name: this.destinationOption }).click();
    }
    
    async searchForTrainTicket(page){
        await page.getByRole('button', { name: this.searchTicketButton }).click();
        await page.waitForTimeout(5000); // Because Renfe be Renfe
    }
}

export default HomePage;