const fs = require('fs')
const _ = require('lodash')

const { pushValuesToObjWithArrayKeys } = require('./helper.js')

module.exports = appState => {

    const cssModuleCrawler = require('./cssModuleCrawler')(appState)
    
    function readFile(filePath) {

        let data = fs.readFileSync(filePath, 'utf8')

        const basicCssUsed = cssModuleCrawler.crawlBasicCssUsage(data) 
        //other css stuff - or whatever
        
        
        
        if (!_.isEmpty(basicCssUsed)) {
            appState.cssUsedInFile[filePath] = basicCssUsed
            // pushValuesToObjWithArrayKeys(appState.cssUsedInFile, filePath, basicCssUsed)
        }
    }
    




    return {
        readFile
    }
}




