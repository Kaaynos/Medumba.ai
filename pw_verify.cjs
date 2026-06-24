const {chromium} = require('playwright');
const {mkdirSync} = require('fs');
mkdirSync('C:/tmp',{recursive:true});

(async()=>{
  const b = await chromium.launch({headless:true});
  const p = await b.newPage();
  await p.setViewportSize({width:375,height:667});

  const shot = async (n) => { await p.waitForTimeout(800); await p.screenshot({path:`C:/tmp/${n}.png`}); console.log(`✓ ${n}`); };
  const checkContinue = async (label) => {
    // find Continue button (enabled or disabled)
    const btn = p.locator('button').filter({hasText:/Continuer|Continue/i}).last();
    const box = await btn.boundingBox().catch(()=>null);
    const enabled = await btn.isEnabled().catch(()=>false);
    const bottomY = box ? (box.y + box.height) : null;
    const inView  = bottomY !== null && bottomY <= 667;
    console.log(`[${label}] btn enabled=${enabled} bottom=${bottomY?.toFixed(0)} inViewport=${inView}`);
    return inView;
  };

  // Landing
  await p.goto('http://localhost:5173');
  await p.waitForTimeout(2500);
  await p.getByText('Commencer gratuitement',{exact:false}).first().click();
  await shot('v_01_lang');

  // Language select → pick first non-placeholder option
  const sel = p.locator('select').first();
  await sel.selectOption({index:1});
  await p.waitForTimeout(300);
  // Click the Continue button (enabled now)
  await p.locator('button').filter({hasText:/Continue/i}).click();
  await shot('v_02_proficiency');

  // ProficiencyPage — click the first option (a div with onClick)
  const profCards = p.locator('div').filter({hasText:/heard it at home|l'ai entendu/i}).nth(0);
  await profCards.click({timeout:5000}).catch(async()=>{
    // fallback: click nth option card
    await p.locator('div[style]').filter({hasText:/bars|heard|entendu/i}).first().click();
  });
  await p.waitForTimeout(400);
  await shot('v_03_prof_selected');
  await checkContinue('ProficiencyPage');
  await p.locator('button').filter({hasText:/Continuer|Continue/i}).click();
  await shot('v_04_reason');

  // ReasonPage — click first option
  await p.locator('div').filter({hasText:/parents or grandparents|parents ou grands/i}).first().click();
  await p.waitForTimeout(400);
  await shot('v_05_reason_selected');
  await checkContinue('ReasonPage');
  await p.locator('button').filter({hasText:/Continuer|Continue/i}).click();
  await shot('v_06_dailygoal');

  // DailyGoalPage — click "5 min / day" option
  await p.locator('div').filter({hasText:/5 min/i}).first().click();
  await p.waitForTimeout(400);
  await shot('v_07_goal_selected');
  await checkContinue('DailyGoalPage');

  await b.close();
  console.log('\n=== Verification complete ===');
})().catch(e=>{console.error(e.message);process.exit(1);});
