# Playwright API Test Suite 

This test suite contains Playwright tests to validate six API tests 

1) Get list of all objects.
2) Add an object using POST.
3) Get a single object using the above added ID
4) Update the object added in Step 2 using PUT
5) Partially update the object using PATCH
6) Delete the object using DELETE.

## Prerequisites
- Latest version of Node.js 18, 20 or 22.
- https://playwright.dev/ installed. You can install it using the command `npm init playwright@latest`. It will install the latest version. 

## Running the Tests

1. Clone this repository:
   `git clone <repository-url>`
2. Navigate to the project directory `cd <project-directory>`
3. npx playwright test tests/api.spec.ts