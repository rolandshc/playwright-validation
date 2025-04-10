# Playwright Boilerplate

A comprehensive boilerplate project for end-to-end testing using Playwright, featuring various testing scenarios and best practices.

## Features

- 🎭 Multi-browser testing (Chromium, Firefox, and WebKit)
- 📸 Visual regression testing with screenshot comparisons
- 🔄 Various interaction testing examples:
  - Form submissions
  - Dialog handling (alerts, confirms, prompts)
  - Keyboard and mouse interactions
  - Dynamic content loading
  - Input handling (checkboxes, radio buttons, dropdowns)
  - Navigation simulation
  - Custom attribute testing
- 🖼️ Screenshot capabilities
- 📊 HTML report generation
- ⚡ Static site testing environment included

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/playwright-boilerplate.git
cd playwright-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Usage

### Starting the Test Server

Run the static test site:
```bash
npm start
```
This will start a local server at http://localhost:3000

### Running Tests

Run all tests:
```bash
npx playwright test
```

Run tests in specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run tests in UI mode:
```bash
npx playwright test --ui
```

View the last HTML report:
```bash
npx playwright show-report
```

## Project Structure

- `/tests` - Main test files
- `/static-site` - Test website for examples
- `/playwright-report` - Generated test reports
- `/__snapshots__` - Visual regression test snapshots
- `/test-results` - Test artifacts (screenshots, traces)

## Included Test Examples

- Login form submission
- Dialog interactions (alert, confirm, prompt)
- Keyboard and mouse events
- Delayed content loading
- Hidden element validation
- Form input handling
- Navigation testing
- Visual regression testing
- Error case handling with screenshots

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC License