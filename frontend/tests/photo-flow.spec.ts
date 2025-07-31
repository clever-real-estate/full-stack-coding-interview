import { test, expect } from "@playwright/test";

test.describe("Photo flow", () => {
	test("should open and close the photo details", async ({ page }) => {
		await page.goto("/app");

		// Click on the first photo
		const firstImageDiv = page.locator("div[aria-description='photo-list-grid']").first();

		console.log("First image div:", await firstImageDiv.innerHTML());
		const image = firstImageDiv.locator("img").first();
		await image.click();

		// Check if the dialog is visible
		await expect(page.locator("div[role='dialog']")).toBeVisible();

		// Close the dialog
		await page.locator("button[data-slot='dialog-close']").click();

		// Check if the dialog is hidden
		await expect(page.locator("div[role='dialog']")).toBeHidden();
	});

	test("should like and dislike a photo", async ({ page }) => {
		page.goto("/app");
		// Click on the first photo
		const firstImageDiv = page.locator("div[aria-description='photo-list-grid']").first();

		// Click on the like button
		const likeButton = firstImageDiv.locator('button[aria-description="like-button"]').first();
		const isLiked = await likeButton.getAttribute("data-liked");
		// check if the photo is liked
		if (isLiked === "true") {
			await likeButton.click();
			await expect(likeButton).toHaveAttribute("data-liked", "false");
		} else {
			await likeButton.click();

			await expect(likeButton).toHaveAttribute("data-liked", "true");
		}
	});
});
