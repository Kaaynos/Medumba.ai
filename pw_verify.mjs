const {chromium} = require('playwright');
const {mkdirSync} = require('fs');

mkdirSync('C:/tmp',{recursive:true});
const BASE='http://localhost:5173';
const VP={width:375,height:667};

(async()=>{
  const browser=await chromium.launch({headless:true});
  const page=await browser.newPage();
  await page.setViewportSize(VP);

  const shot=async(name)=>{
    await page.waitForTimeout(700);
    await page.screenshot({path:`C:/tmp/${name}.png`});
    console.log(`✓ ${name}`);
  };

  const checkBtn=async(label)=>{
    const btn=page.getByRole('button',{name:/continuer|continue/i});
    const box=await btn.boundingBox().catch(()=>null);
    const ok=box&&(box.y+box.height)<=667;
    console.log(`[${label}] Continue btn y=${box?.y?.toFixed(0)} bottom=${box?(box.y+box.height).toFixed(0):'?'} visible=${ok}`);
    return ok;
  };

  // 1. Landing
  await page.goto(BASE);
  await page.waitForTimeout(2500);
  await page.getByText('Commencer gratuitement',{exact:false}).first().click();
  await shot('01_lang_select');

  // 2. Select French then continue
  await page.locator('select').first().selectOption({index:1});
  await page.waitForTimeout(300);
  await page.getByRole('button',{name:/continue/i}).click();
  await shot('02_proficiency');

  // 3. ProficiencyPage — click first option, check button visibility
  await page.locator('div[style*="cursor: pointer"]').filter({hasText:/heard|entendu/i}).first().click();
  await page.waitForTimeout(300);
  await shot('03_proficiency_selected');
  await checkBtn('ProficiencyPage');

  await page.getByRole('button',{name:/continuer|continue/i}).click();
  await shot('04_reason');

  // 4. ReasonPage — click first option, check button visibility
  await page.locator('div[style*="cursor: pointer"]').filter({hasText:/parents|grands-parents/i}).first().click();
  await page.waitForTimeout(300);
  await shot('05_reason_selected');
  await checkBtn('ReasonPage');

  await page.getByRole('button',{name:/continuer|continue/i}).click();
  await shot('06_dailygoal');

  // 5. DailyGoalPage — click first option, check button visibility
  await page.locator('div[style*="cursor: pointer"]').first().click();
  await page.waitForTimeout(300);
  await shot('07_dailygoal_selected');
  await checkBtn('DailyGoalPage');

  await browser.close();
  console.log('Done.');
})().catch(e=>{ console.error(e.message); process.exit(1); });
