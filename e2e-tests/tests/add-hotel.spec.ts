import path from 'node:path'
import { test, expect } from '@playwright/test'

const UI_URL = 'http://localhost:5173'

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL)
  await page.getByRole('link', { name: 'Sign In' }).click()

  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible()

  await page.locator('[name="email"]').fill('1@1.com')
  await page.locator('[name="password"]').fill('123123')

  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page.getByText('Sign in Successful!')).toBeVisible()
})

test('should allow the user to add a new hotel', async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`)

  await page.locator('[name="name"]').fill('test hotel')
  await page.locator('[name="city"]').fill('test city')
  await page.locator('[name="country"]').fill('test country')
  await page
    .locator('[name="description"]')
    .fill('test description lorem ipsum dolor sit amet')
  await page.locator('[name="pricePerNight"]').fill('100')

  await page.selectOption("select[name='starsRating']", '4')

  await page.getByText('Budget').click()

  await page.getByLabel('Free WiFi').check()
  await page.getByLabel('Parking').check()

  await page.locator('[name="adultCount"]').fill('2')
  await page.locator('[name="childCount"]').fill('2')

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, 'files', '1.jpg'),
    path.join(__dirname, 'files', '2.jpeg'),
  ])

  await page.getByRole('button', { name: 'Save' }).click()

  await expect(page.getByText('Hotel Saved!')).toBeVisible()
})
