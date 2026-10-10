import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import { expect } from "playwright/test";

const base = process.env.AUDIT_BASE_URL || "http://127.0.0.1:3003";
const dir = process.env.AUDIT_ARTIFACTS_DIR || "/tmp/atlas-home-tabs";
await mkdir(dir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.route("**/api/climate?*", (route) =>
  route.fulfill({ status: 503, json: { error: "QA weather unavailable" } }),
);
async function noOverflow() {
  await page.evaluate(() => document.fonts.ready);
  assert(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  );
}
try {
  for (const width of [390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(base);
    const territory = page.getByRole("tab", {
      name: "Territorio",
      exact: true,
    });
    const atlas = page.getByRole("tab", { name: "Atlas", exact: true });
    await expect(territory).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#home-panel-atlas")).toBeHidden();
    await expect(page.locator(".geo-map")).toBeVisible();
    assert(
      (await page.locator(".geo-map-wrap").boundingBox()).y < 250,
      "Map is too low on mobile",
    );
    await expect(page.locator("#home-territory-context")).toBeHidden();
    await noOverflow();
    await page.screenshot({
      path: `${dir}/territorio-${width}.png`,
      fullPage: true,
    });
    await page.getByRole("button", { name: "Córdoba", exact: true }).click();
    await expect(page.getByLabel("Provincia", { exact: true })).toHaveValue(
      "Córdoba",
    );
    await territory.focus();
    await page.keyboard.press("ArrowRight");
    await expect(atlas).toBeFocused();
    await expect(atlas).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(".geo-map")).toBeHidden();
    await expect(page.locator(".atlas-editorial-rail")).toBeVisible();
    assert.equal(
      await page.locator(".atlas-editorial-rail-categories a").count(),
      16,
    );
    for (const img of await page
      .locator(".atlas-editorial-rail-categories img")
      .all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate((node) => node.complete && node.naturalWidth > 0),
        )
        .toBe(true);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await noOverflow();
    await page.screenshot({
      path: `${dir}/atlas-${width}.png`,
      fullPage: true,
    });
    await page.keyboard.press("Home");
    await expect(territory).toBeFocused();
    await expect(page.getByLabel("Provincia", { exact: true })).toHaveValue(
      "Córdoba",
    );
    await page
      .getByRole("button", {
        name: "Ver contexto, paisajes y lecturas",
        exact: true,
      })
      .click();
    await expect(page.locator("#home-territory-context")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Paisajes de las provincias",
        exact: true,
      }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Cerrar contexto y lecturas", exact: true })
      .click();
    await expect(page.locator("#home-territory-context")).toBeHidden();
    await atlas.click();
    await page
      .getByLabel("Buscar en el Atlas", { exact: true })
      .fill("heladas");
    await page
      .locator(".home-atlas-search")
      .getByRole("button", { name: "Buscar", exact: true })
      .click();
    await expect(page).toHaveURL(/\/chatbot\?q=heladas/);
    await expect(page.locator(".chatbot-result-card").first()).toBeVisible();
    await page.goto(base);
    await atlas.click();
    await page.locator(".atlas-editorial-rail-categories a").first().click();
    await expect(page).toHaveURL(/\/atlas\//);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  await expect(page.locator(".home-view-tabs")).toBeHidden();
  await expect(page.locator(".geo-map")).toBeVisible();
  await expect(page.locator(".atlas-editorial-rail")).toBeVisible();
  await expect(page.locator("#home-territory-context")).toBeVisible();
  const map = await page.locator(".field-map-panel").boundingBox();
  const rail = await page.locator(".home-atlas-panel").boundingBox();
  assert(
    rail.x >= map.x + map.width,
    "Desktop Atlas column must remain beside territory",
  );
  await noOverflow();
  await page.screenshot({ path: `${dir}/escritorio-1440.png` });
  // Resizing an already selected Atlas view must restore both desktop columns.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("tab", { name: "Atlas", exact: true }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator(".geo-map")).toBeVisible();
  await expect(page.locator(".atlas-editorial-rail")).toBeVisible();
  assert.deepEqual(errors, []);
  console.log(
    "PASS: mobile tabs, keyboard, province persistence, context disclosure, search, category links and desktop columns at 390/768/1440px.",
  );
} finally {
  await browser.close();
}
