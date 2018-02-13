const fs = require('fs')
const _ = require('lodash')
const path = require('path')


function pushValuesToObjWithArrayKeys(obj, key, value) {

    if (!!obj[key] && typeof obj[key] == 'Array') {
        obj[key].push(value)
    } else {
        obj[key] = [value]
    }

    return obj
}


function getFilesInFolder(folderPath, options = {}) {

    const foldersNFiles = fs.readdirSync(folderPath)
    let allFiles = []
    if (!options.whitelist) options.whitelist = []
    if (!options.blacklist) options.blacklist = []
    if (!options.blacklistFolder) options.blackListFolder = []


    _.forEach(foldersNFiles, folderOrFile => {
        let thisFileStat = fs.statSync(path.resolve(folderPath, folderOrFile))

        if (thisFileStat.isDirectory() && options.blacklistFolder.indexOf(path.basename(folderOrFile)) === -1) {

            const filesWithinSubFolder = getFilesInFolder(path.resolve(folderPath, folderOrFile), options)
            allFiles.push(...filesWithinSubFolder)
        } else {

            if (thisFileStat.isFile()) {
                const thisFileEnding = _.last(folderOrFile.split('.'))

                if ((_.isEmpty(options.whitelist) || options.whitelist.indexOf(thisFileEnding) !== -1) && options.blacklist.indexOf(thisFileEnding) === -1) {

                    allFiles.push(path.resolve(folderPath, folderOrFile))
                }
            }
        }
    })
    
    return allFiles
}


function grabAllRegExpMatches(regexp, string) {

    let foundVal
    let findings = []
    let somethingFound = true;

    while (somethingFound) {
        foundVal = regexp.exec(string)
        if (foundVal) {
            findings.push(foundVal)
        } else {
            somethingFound = false
        }
    }

    return findings
}



module.exports = {
    pushValuesToObjWithArrayKeys,
    getFilesInFolder,
    grabAllRegExpMatches
}