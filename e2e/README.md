# UI Tests (Playwright)

These end-to-end tests verify that the application loads and functions correctly in a real browser environment. They catch issues that unit tests can't, such as:

- **Build/bundler errors** (like the "Cannot access 'P' before initialization" issue)
- **JavaScript runtime errors** that only occur in production builds
- **Navigation and routing** working correctly
- **Content loading** properly
- **User interactions** functioning as expected

## Running UI Tests

### Prerequisites
Make sure Playwright browsers are installed:
```bash
npx playwright install chromium
```

### Run Tests

**Headless mode (default):**
```bash
npm run test:e2e
```

**With visible browser (headed mode):**
```bash
npm run test:e2e:headed
```

**Interactive UI mode:**
```bash
npm run test:e2e:ui
```

**Run all tests (unit + e2e):**
```bash
npm run test:all
```

## How It Works

1. Playwright connects to the Vite dev server on port 3000 (or starts one if not running)
2. Tests run against the live application
3. Any JavaScript errors are captured and cause test failures
4. Screenshots are taken on test failures for debugging

## Test Files

- **homepage.spec.js** - Tests homepage content loading, chatbot display, and basic functionality
- **navigation.spec.js** - Tests routing, navigation between pages, and hash scrolling

## Why These Tests Are Important

Unit tests run in Node.js with mocked browser APIs. They don't catch:
- Module bundling/initialization issues
- Circular dependency problems
- Production build optimizations that break code
- Browser-specific JavaScript errors

UI tests run the actual built application in a real browser, catching these issues before deployment.

## Viewing Test Reports

After a test run, view the HTML report:
```bash
npx playwright show-report
```

## Debugging Failed Tests

Run in headed mode to see what's happening:
```bash
npm run test:e2e:headed
```

Or use the interactive UI mode:
```bash
npm run test:e2e:ui
```
