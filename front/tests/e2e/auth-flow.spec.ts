import { test, expect } from "@playwright/test";
import {
	selectors,
	login,
	register,
	expectToBeOnPhotosPage,
	expectToBeOnLoginPage,
	clearLocalStorage,
} from "./utils";

test.describe("Complete Authentication Flow", () => {
	test("should complete full auth flow: register -> login -> logout", async ({
		page,
	}) => {
		await page.goto("/register");
		await clearLocalStorage(page);

		await expect(page.locator(selectors.headerTitle)).toContainText(
			"Create an account",
		);

		const testEmail = `new_test${Date.now()}@example.com`;
		await page.fill(selectors.registerUsername, testEmail);
		await page.fill(selectors.registerPassword, "testpassword123");
		await page.click(selectors.registerSubmit);

		// Step 2: Login with the new user
		await login(page, testEmail, "testpassword123");
		await expectToBeOnPhotosPage(page);

		// Step 3: Logout
		await page.click(selectors.logoutButton);
		await expectToBeOnLoginPage(page);
	});

	test("should protect routes when not authenticated", async ({ page }) => {
		// Try to access photos page without authentication
		await page.goto("/photos");

		// Should be redirected to login page
		await expectToBeOnLoginPage(page);

		// Try to access register page
		await page.goto("/register");
		await expect(page).toHaveURL("/register");

		// Try to access login page
		await page.goto("/login");
		await expectToBeOnLoginPage(page);
	});

	test("should maintain authentication state across page refreshes", async ({
		page,
	}) => {
		const user_email = `refresh_test${Date.now()}@example.com`;
		const user_password = "testpassword123";

		await register(page, user_email, user_password);

		// Login
		await login(page, user_email, user_password);
		await expectToBeOnPhotosPage(page);

		// Refresh the page
		await page.reload();

		// Should still be on photos page and authenticated
		await expectToBeOnPhotosPage(page);
	});

	test("should handle authentication token expiration", async ({ page }) => {
		const user_email = `experiation_test${Date.now()}@example.com`;
		const user_password = "testpassword123";

		await register(page, user_email, user_password);

		// Login
		await login(page, user_email, user_password);
		await expectToBeOnPhotosPage(page);

		// Simulate token expiration by clearing localStorage
		await page.evaluate(() => {
			localStorage.removeItem("accessToken");
		});

		// Refresh the page
		await page.reload();

		// Should be redirected to login page
		await expectToBeOnLoginPage(page);
	});
});
