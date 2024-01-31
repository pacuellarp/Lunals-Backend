const puppeteer = require('puppeteer');

async function backendLifeTime(email, password) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized', '--incognito'],
  });

  const context = await browser.createIncognitoBrowserContext();

  const page = await context.newPage();

  await page.goto(process.env.EMAIL_LINK);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const inputEmail = '#username';
  const inputPassword = '#password';

  await page.type(inputEmail, email);
  await page.type(inputPassword, password);

  const buttonSelector = 'button.btn-primary';
  await page.waitForSelector(buttonSelector);
  await page.click(buttonSelector);

  // Espera a que la página se cargue completamente
  await new Promise((resolve) => setTimeout(resolve, 10000));

  await page.goto(process.env.BACKEND_LOGIN);

  // Usa un selector más específico para el botón "Continue with Google"
  const secondButtonSelector = 'button.oBs1flyuap61jSHoDDVo'; // Suponiendo que el botón tiene este atributo
  await page.waitForSelector(secondButtonSelector);
  await page.click(secondButtonSelector);

  // Espera a que la página se cargue completamente
  await new Promise((resolve) => setTimeout(resolve, 10000));

  // Usa page.goto() para navegar a la página de configuración
  await page.goto(process.env.BACKEND_PANEL);

  await new Promise((resolve) => setTimeout(resolve, 60000));

  await browser.close();
}

module.exports = backendLifeTime;
