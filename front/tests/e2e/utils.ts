import { Page, expect } from "@playwright/test";

export const selectors = {
	// Login page
	loginUsername: "#username",
	loginPassword: "#password",
	loginSubmit: 'button[type="submit"]',
	loginError: ".text-red-500",

	// Register page
	registerUsername: "#username",
	registerPassword: "#password",
	registerSubmit: 'button[type="submit"]',
	registerError: ".text-red-500",

	// Photos page
	logoutButton: 'button:has-text("Logout")',
	photoItems: ".flex.gap-3.p-2",
	likeButton: 'button[aria-label*="like"]',
	likeButtonLiked: 'button[aria-label*="unlike"]',

	// Navigation
	headerTitle: "h2",
};

export async function login(page: Page, username: string, password: string) {
	await page.goto("/login");
	await page.fill(selectors.loginUsername, username);
	await page.fill(selectors.loginPassword, password);
	await page.click(selectors.loginSubmit);
}

export async function register(page: Page, username: string, password: string) {
	await page.goto("/register");
	await page.fill(selectors.registerUsername, username);
	await page.fill(selectors.registerPassword, password);
	await page.click(selectors.registerSubmit);
	await page.waitForTimeout(1000);
}

export async function expectToBeOnPhotosPage(page: Page) {
	await expect(page).toHaveURL("/photos");
	await expect(page.locator(selectors.headerTitle)).toContainText("All photos");
	await expect(page.locator(selectors.logoutButton)).toBeVisible();
}

export async function expectToBeOnLoginPage(page: Page) {
	await expect(page).toHaveURL("/login");
	await expect(page.locator(selectors.headerTitle)).toContainText(
		"Sign in to your account",
	);
}

export async function expectToBeOnRegisterPage(page: Page) {
	await expect(page).toHaveURL("/register");
	await expect(page.locator(selectors.headerTitle)).toContainText(
		"Create an account",
	);
}

export async function clearLocalStorage(page: Page) {
	await page.evaluate(() => {
		localStorage.clear();
	});
}
