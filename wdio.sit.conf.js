// merge parent config object + add new config changes in sit config (url/timeout etc)
const merge =require('deepmerge')
const wdioconfig = require('./wdio.conf.js')

exports.config=merge(wdioconfig.config,{

    specs: [
        // './test/specs/**/*.js'
        './test/specs/loginScreenTest.js',
        './test/specs/orderPlaceJourneyTest.js',
        './test/specs/windowsandframes.js'
    ],
    baseUrl: 'https://rahulshettyacademysit.com',
    waitforTimeout: 15000,
    bail: 3,
    logLevel: 'error',
    capabilities: [{
    
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 10,
        //
        browserName: 'chrome',
        'goog:chromeOptions': {
            // to run chrome headless the following flags are required
            // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
            args: ['--headless', '--disable-gpu'],
            },
        acceptInsecureCerts: true
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],
    }],
})