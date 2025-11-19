# 🧪 Playwright Smoke Tests for SauceDemo

This project contains a set of **smoke tests** written using  
**Playwright + JavaScript** for the web application:  
https://www.saucedemo.com/

The tests cover essential end-to-end flows such as login, product browsing, cart operations, and checkout.

🔁 CI/CD Automation

Tests run automatically on GitHub Actions whenever you push to the main branch.

[![Playwright Tests](https://github.com/Aleksandr2302/playwright-smoke-tests-saucedemo/actions/workflows/ci.yml/badge.svg)](https://github.com/Aleksandr2302/playwright-smoke-tests-saucedemo/actions/workflows/ci.yml)

## 📁 Project Structure

```bash
saucedemo-tests-playwright-js/
│
├── allure-report/ 
├── allure-results/ 
├── playwright-report/ 
├── test-results/ 
│
├── tests/
│ ├── helpers/ 
│ │ ├── basketHelpers.js
│ │ ├── checkoutHelpers.js
│ │ ├── loginHelpers.js
│ │ └── productHelpers.js
│ │
│ ├── basketPage.spec.js
│ ├── checkoutPage.spec.js
│ ├── loginPage.spec.js
│ └── productPage.spec.js
│
├── .prettierrc 
├── .prettierignore
├── playwright.config.js 
├── package.json
├── README.md
└── package-lock.json
```

## 🚀 Tech Stack

- **Playwright** — UI automation framework  
- **JavaScript**  
- **Allure** — advanced test reporting  
- **Prettier** — project auto-formatter  


## 📦 Install Dependencies

```bash
npm install
```

▶️ Run Tests
Run all tests

```bash
npx playwright test
```
Run a specific test

```bash
npx playwright test tests/loginPage.spec.js
```


Open Playwright HTML report
```bash
npx playwright show-report
```

📊 Generate Allure Report
1. Run tests
```bash
npx playwright test
```

2. Generate Allure report
(Windows + Scoop installation)
```bash

~\scoop\apps\allure\current\bin\allure.bat generate allure-results --clean
```

3. Open Allure report

```bash
~\scoop\apps\allure\current\bin\allure.bat open
```

🎨 Code Formatting (Prettier)
```bash
npm run format
```

