import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
	await page.goto("/auth/login");
	await page.getByLabel("Username").fill("Vinicius");
	await page.getByLabel("Password").fill("1234");
	await page.getByRole("button", { name: "Sign in" }).click();

	await page.waitForURL("/app");

	await page.context().storageState({ path: authFile });
});
