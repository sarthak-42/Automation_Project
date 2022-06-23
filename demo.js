let puppeteer = require('puppeteer')

let broserwillbelaunchedpromise = puppeteer.launch({
    headless : false,  // property to show broswer
    defaultViewport : false,
    rgs: ['--start-maximized']

}) //we made a promise ki browser launch hoga (abi pending me hai)

broserwillbelaunchedpromise.then(function(broswerInstance){
    let newtabpromise = broswerInstance.newPage()   //newPage is used for launching new tab
       return newtabpromise   //browser will launch new tab here 
}).then(function(newtab){
    console.log('New tab is Launched')
    let pagetobeopend = newtab.goto('https://www.pepcoding.com/')   //that new tab will go to the given address 
    return pagetobeopend // and the page to be opened is returned 


}).then(function(webpage){
    console.log('Website Launched')
})
