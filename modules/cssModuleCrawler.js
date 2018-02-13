const fs = require('fs')
const _ = require('lodash')

const { grabAllRegExpMatches } = require('./helper.js')

module.exports = appState => {


    function crawlBasicCssUsage(fileData) {
        let classes = []
        let classVariables = []
        let ids = []
        let idVariables = []

        const classOrClassNameUsageRegExp = /\<.*?[\s\S]*?(class|className)\s*?=\s*?('|"|{)(.*?)(}|"|')[\s\S]*?.*?\>/gi
        const findings = grabAllRegExpMatches(classOrClassNameUsageRegExp, fileData)

        // console.log(findings)

        _.forEach(findings, finding => {
            if(finding[1].match(/class/i)) {
                if(finding[2].match(/\'|\"/)) {
                    classes.push(...finding[3].split(' '))
                } else {
                    classVariables.push(...finding[3].split(' '))
                }
            }
            if(finding[1].match(/id/i)) {
                if(finding[2].match(/\'|\"/)) {
                    ids.push(...finding[3].split(' '))
                } else {
                    idVariables.push(...finding[3].split(' '))
                }
            }
        })

        return (
            !_.isEmpty(classes) || 
            !_.isEmpty(ids) || 
            !_.isEmpty(classVariables) || 
            !_.isEmpty(idVariables)
        ) ? 
        {
            classes,
            classVariables,
            ids,
            idVariables
        } : 
        null
    }


    function crawlCssModuleUsage(fileData) {

    }





    return {
        crawlBasicCssUsage,
        crawlCssModuleUsage,
    }
}