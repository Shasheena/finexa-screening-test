# Playwright Automation Screening Task

This repository contains an end-to-end automated test suite built with **Playwright Test** and **TypeScript** as part of the screening task.

## Sites Under Test
- **Playwright Docs:** `https://playwright.dev`
- **TodoMVC Demo App:** `https://demo.playwright.dev/todomvc`

---

## Project Structure

```text
├── .github/
│   └── workflows/
│       └── playwright.yml       # GitHub Actions workflow (CI)
├── pages/
│   └── TodoPage.ts              # Page Object Model for TodoMVC
├── tests/
│   ├── playwright-docs.spec.ts  # Part 1: Docs site test suite
│   └── todo-mvc.spec.ts         # Part 2: TodoMVC test suite (Data-driven)
├── playwright.config.ts         # Playwright configuration file
├── package.json                 # Project dependencies & scripts
└── README.md                    # Project documentation
```

---

## Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## Installation Setup

1. **Clone or extract** the project into your local directory.
2. Open the project directory in **IntelliJ IDEA** (or terminal).
3. Install the project dependencies:
   ```bash
   npm install
   ```
4. Install the Chromium browser binary required by Playwright:
   ```bash
   npx playwright install chromium
   ```

---

## Running the Tests

### 1. Run all tests in headless mode (Default)
Runs all test files in the background:
```bash
npx playwright test
```

### 2. Run tests in Interactive UI Mode
Opens Playwright's interactive UI for step-by-step debugging:
```bash
npx playwright test --ui
```

### 3. Run a specific test suite
To run only the Playwright Docs tests:
```bash
npx playwright test tests/playwright-docs.spec.ts
```

To run only the TodoMVC tests:
```bash
npx playwright test tests/todo-mvc.spec.ts
```

---

## Test Reports & Traces

- **HTML Report:** After running tests, open the generated HTML report by executing:
  ```bash
  npx playwright show-report
  ```
- **Trace Viewer:** Traces are automatically recorded on the first retry of a failed test as per project configuration (`trace: 'on-first-retry'`).

---

## Standards & Best Practices Followed
- **Locators:** Exclusively used user-centric, semantic locators (`getByRole`, `getByPlaceholder`, `getByText`). Zero XPath or brittle CSS selectors used.
- **Auto-waiting:** Relies entirely on Playwright's built-in web-first assertions and auto-waiting—no `waitForTimeout` or hard sleeps.
- **Page Object Model:** All TodoMVC application interactions are encapsulated inside `pages/TodoPage.ts`.
- **Data-Driven Testing:** Integrated array iteration for adding multiple TODO items dynamically.
- **Continuous Integration:** Configured `.github/workflows/playwright.yml` for automated GitHub Actions pipeline runs.