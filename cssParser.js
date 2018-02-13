const argv = require('yargs').argv

const appState = {
    cssUsedInFile: {},
}

const app = require('./modules/index.js')

appState.crawlFolder = argv.folder

app(appState);


// console.log(getFilesInFolder('G:\\Proj\\CSSparser', { 
//     blacklistFolder: ['node_modules'],
//     whitelist: ['js', 'jsx'],
//     // blacklist: ['js']
// }))