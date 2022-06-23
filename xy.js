let puppeteer = require('puppeteer')

const loginLink = "https://www.hackerrank.com/auth/login"
let email = 'sokey36357@tagbert.com'
let password = '@4200Smriti'
const codeFile = require('./codes')
let page


let promisetoopen = puppeteer.launch({
    headless: false,
    defaultViewport: null,
})

promisetoopen.then(function (broswerInstance) {
    let newTab = broswerInstance.newPage();
    return newTab
}).then(function (websitetolaunch) {
    page = websitetolaunch
    let requirepage = websitetolaunch.goto(loginLink)
    return requirepage
}).then(function () {
    let typeEmailpromise = page.type("input[id='input-1']", email, { delay: 100 })
    return typeEmailpromise

}).then(function () {
    let typePasspromise = page.type("input[id = 'input-2']", password, { delay: 100 })
    return typePasspromise
}).then(function () {
    let loginpromise = page.click('button[data-analytics="LoginPassword"]', { delay: 100 })
    return loginpromise
}).then(function () {
    let algowillbeclickedpromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page)    //a new waitandClick funtion must be created to wait till new page html is catched and then slector is searched and rest steps are proceeded
    return algowillbeclickedpromise
}).then(function () {
    let gotowarmuppromise = waitAndClick('input[value="warmup"]', page)
    return gotowarmuppromise
}).then(function () {
    let challengesArrpromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 100 })
    return challengesArrpromise
}).then(function (QuestionArr) {
    console.log('No of question->' + QuestionArr.length)
    let questionWillBeSolvedPromise = questionSolver(page, QuestionArr[0], codeFile.answers[0]);
    return questionWillBeSolvedPromise
})





function waitAndClick(selector, cpage) {
    return new Promise(function (resolve, reject) {
        let waitforhtml = cpage.waitForSelector(selector);
        waitforhtml.then(function () {
            let clickonhtmlpromise = cpage.click(selector, { delay: 100 })
            return clickonhtmlpromise
        }).then(function () {
            resolve()
        }).catch(function () {
            reject()
        })
    })
}

function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionwillbeclickedpromise = question.click()
        questionwillbeclickedpromise.then(function () {
            let waitForEditorPromise = waitAndClick(".monaco-editor.no-user-select.vs", page);
            return waitForEditorPromise;
        }).then(function () {
            return waitAndClick('.checkbox-input', page)
        }).then(function () {
            return page.waitForSelector('.text-area.custominput')                     // cursor fix krne ke liye 
        }).then(function () {
            return page.type('.text-area.custominput', answer, { delay: 5 })         // kha or kya type krna hai
        }).then(function () {
            let ctrlonHoldpromise = page.keyboard.down('Control')
            return ctrlonHoldpromise
        }).then(function () {
            let Aispressedpromise = page.keyboard.press('A', { delay: 10 })
            return Aispressedpromise
        }).then(function () {
            let Xispressedpromise = page.keyboard.press('X', { delay: 10 })
            return Xispressedpromise
        }).then(function () {
            let ctrlisreleasedpromise = page.keyboard.up('Control')
            return ctrlisreleasedpromise
        }).then(function () {
            let waitForEditorPromise = waitAndClick(".monaco-editor.no-user-select.vs", page)
            return waitForEditorPromise
        }).then(function () {
            let ctrlonHoldpromise = page.keyboard.down('Control')
            return ctrlonHoldpromise
        }).then(function () {
            let Aispressedpromise = page.keyboard.press('A', { delay: 10 })
            return Aispressedpromise
        }).then(function () {
            let Vispressed = page.keyboard.press('V', { delay: 5 })
            return Vispressed
        }).then(function () {
            let ctrlisreleasedpromise = page.keyboard.up('Control')
            return ctrlisreleasedpromise
        }).then(function () {
            return page.click('.hr-monaco__run-code', { delay: 20 })
        }).then(function () {
            resolve()
        }).catch(function (err) {
            console.log(err)
        })
    })
}
