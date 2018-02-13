const _ = require('lodash')

const { getFilesInFolder } = require('./helper.js')


module.exports = appState => {

    const fileCrawler = require('./fileCrawler.js')(appState)
    
    const filesToCheck = getFilesInFolder(appState.crawlFolder, {
        blacklistFolder: ['node_modules'],
        whitelist: ['js', 'jsx']
    })

    _.forEach(filesToCheck, fileToCheck => { 
        fileCrawler.readFile(fileToCheck)
    })

    console.log(JSON.stringify(appState, null, 2))

}