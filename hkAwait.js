const loginLink = "https://www.hackerrank.com/auth/login";
let email = 'sokey36357@tagbert.com';
let password = '@4200Smriti';
let puppeteer = require("puppeteer");
const codeFile = require("./codes");

console.log("Before");

(async function () {
  try {
    let browserWillbeLaunced = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });

    let newTab = await browserWillbeLaunced.newPage();

    await newTab.goto(loginLink);

    await newTab.type("input[id='input-1']", email, {
      delay: 100,
    });

    await newTab.type("input[id='input-2']", password, {
      delay: 100,
    });

    await newTab.click('button[data-analytics="LoginPassword"]', {
      delay: 100,
    });

    await waitAndClick('.topic-card a[data-attr1="algorithms"]', newTab);

    await waitAndClick('input[value="warmup"]', newTab);

    let ChallengesArr = await newTab.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",
      { delay: 100 }
    );

    console.log("Total Question ->" + ChallengesArr.length);

    await questionSolver(newTab, ChallengesArr[0], codeFile.answers[0]);
  } catch (error) {
    console.log(error);
  }
})();



function waitAndClick(selector, cPage) {
  return new Promise(function (resolve, reject) {
    let waitForModalPromise = cPage.waitForSelector(selector);
    waitForModalPromise
      .then(function () {
        let clickModalPromise = cPage.click(selector, { delay: 100 });
        return clickModalPromise;
      })
      .then(function () {
        resolve();
      })
      .catch(function () {
        reject();
      });
  });
}

function questionSolver(page, question, answer) {
  return new Promise(function (resolve, reject) {
    let questionWillBeClickedPromise = question.click();
    questionWillBeClickedPromise
      .then(function () {
        let waitForEditorPromise = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return waitForEditorPromise;
      })
      .then(function () {
        return waitAndClick(".checkbox-input", page);
      })
      .then(function () {
        return page.waitForSelector(".text-area.custominput");
      })
      .then(function () {
        return page.type(".text-area.custominput", answer, { delay: 20 });
      })
      .then(function () {
        let ctrlonHoldPromise = page.keyboard.down("Control");
        return ctrlonHoldPromise;
      })
      .then(function () {
        let AisPressedPromise = page.keyboard.press("A", { delay: 20 });
        return AisPressedPromise;
      })
      .then(function () {
        let XisPressedPromise = page.keyboard.press("X", { delay: 20 });
        return XisPressedPromise;
      })
      .then(function () {
        let ctrlIsReleasedPromise = page.keyboard.up("Control");
        return ctrlIsReleasedPromise;
      })
      .then(function () {
        let waitForEditorPromise = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return waitForEditorPromise;
      })
      .then(function () {
        let ctrlonHoldPromise = page.keyboard.down("Control");
        return ctrlonHoldPromise;
      })
      .then(function () {
        let AisPressedPromise = page.keyboard.press("A", { delay: 20 });
        return AisPressedPromise;
      })
      .then(function () {
        let VisPressedPromise = page.keyboard.press("V", { delay: 20 });
        return VisPressedPromise;
      })
      .then(function () {
        let ctrlIsReleasedPromise = page.keyboard.up("Control");
        return ctrlIsReleasedPromise;
      })
      .then(function () {
        return page.click(".hr-monaco__run-code", { delay: 20 });
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        
        console.log(err);
        reject()
      });
  });
}