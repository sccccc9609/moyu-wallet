import { test, expect } from '@playwright/test';

test('实时工资会增长，设置会保存', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-08-11T10:00:00+08:00') });
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('#todayMoney')).not.toHaveText('0.00');
  const first = await page.locator('#todayMoney').textContent();
  await page.clock.fastForward('00:00:02');
  await expect(page.locator('#todayMoney')).not.toHaveText(first);

  await page.locator('#openSettings').click();
  await expect(page.locator('#settingsDialog')).toBeVisible();
  await page.locator('#salaryInput').fill('18000');
  await page.locator('.save-button').click();
  await expect(page.locator('#settingsDialog')).not.toBeVisible();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('moyu-wallet-settings-v1')).salary)).toBe(18000);
});

test('手机端没有横向溢出', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const sizes = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(sizes.scroll).toBeLessThanOrEqual(sizes.client);
  await page.locator('#openSettings').click();
  await expect(page.locator('#settingsDialog')).toBeVisible();
});

test('宠物皮肤可以切换并记住', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#openSkins').click();
  await page.locator('[data-skin="blue"]').click();
  await expect(page.locator('body')).toHaveAttribute('data-skin', 'blue');
  await expect(page.locator('#skinName')).toHaveText('蓝莓哭哭');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('body')).toHaveAttribute('data-skin', 'blue');
});

test('午休时暂停计薪并保存两段班次', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-08-11T13:00:00+08:00') });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#workStatus')).toContainText('午休');
  const lunchMoney = await page.locator('#todayMoney').textContent();
  await page.clock.fastForward('00:10:00');
  await expect(page.locator('#todayMoney')).toHaveText(lunchMoney);

  await page.locator('#openSettings').click();
  await page.locator('#startInput').fill('08:30');
  await page.locator('#endInput').fill('12:30');
  await page.locator('#afternoonStartInput').fill('13:30');
  await page.locator('#afternoonEndInput').fill('17:30');
  await page.locator('.save-button').click();
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('moyu-wallet-settings-v1')));
  expect(saved).toMatchObject({ startTime: '08:30', endTime: '12:30', afternoonStartTime: '13:30', afternoonEndTime: '17:30' });
});

test('今日私活可以添加、完成和删除', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#questInput').fill('更新作品集');
  await page.locator('#questForm button[type="submit"]').click();
  await expect(page.locator('#questList li')).toHaveCount(1);
  await page.locator('.quest-check').click();
  await expect(page.locator('#questDone')).toHaveText('1');
  await expect(page.locator('#petSpeech')).toContainText('私活完成 1 件');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('#questList li.done')).toHaveCount(1);
  await page.locator('.quest-delete').click();
  await expect(page.locator('#questList li')).toHaveCount(0);
});

test('整点和半点自动轮换整套品牌文案', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-08-11T10:29:59+08:00') });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const before = await page.locator('#brandName').textContent();
  const beforeKicker = await page.locator('#brandKicker').textContent();
  await page.clock.fastForward(2000);
  await expect(page.locator('#brandName')).not.toHaveText(before);
  await expect(page.locator('#brandKicker')).not.toHaveText(beforeKicker);
});

test('可以选择并永久固定文案主题', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-08-11T10:29:59+08:00') });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#openSettings').click();
  await page.getByText('📌 固定一个主题').click();
  await page.locator('#fixedCopySelect').selectOption('4');
  await page.locator('.save-button').click();
  await expect(page.locator('#brandName')).toHaveText('摸鱼发发站');
  await expect(page.locator('#copyModeBadge')).toHaveText('已固定');
  await page.clock.fastForward(2000);
  await expect(page.locator('#brandName')).toHaveText('摸鱼发发站');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('#brandName')).toHaveText('摸鱼发发站');
});
