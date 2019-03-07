#!/usr/bin/env node
const program = require('commander')
const mkdirp = require('mkdirp');
const fs= require('fs')
program
  .version('0.0.1')
  .option('-p, --page <page>', 'added page')
  .parse(process.argv);

function checkInputName(name){
    return /^[A-Za-z0-9_-]+\/[A-Za-z0-9_]+$/.test(name)
}  
if(program.page){
    const path = "src/pages/"
    if(checkInputName(program.page)){
        const pagePath = path+program.page
        fs.exists(pagePath,(exists)=>{
            if(exists){
                console.error("\033[41;30m ERROR: \033[0m \033[40;4m The folder already exists \033[0m")
                return
            }else{

                const name = program.page.split("/")[1]
                const namespace = program.page.split("/")[0].replace(/-/g,"") + (name.charAt(0).toUpperCase()+name.slice(1)).replace(/-/g,"");
                mkdirp(pagePath+"/locales",(error)=>{
                    fs.readFile("scripts/stencil/pages/temp/locales/zh-CN.jstemp", function (err, data) {
                       fs.writeFile(pagePath+"/locales/zh-CN.js",data,"utf-8",()=>{})
                    })
                    fs.readFile("scripts/stencil/pages/temp/_mock.jstemp", function (err, data) {
                        fs.writeFile(pagePath+"/_mock.js",data,"utf-8",()=>{})
                    });
                    fs.readFile("scripts/stencil/pages/temp/index.jstemp", function (err, data) {
                        fs.writeFile(pagePath+"/index.js",data.toString().replace(/\$\{ComponentName\}/g,name).replace(/\$\{namespace\}/g,namespace),"utf-8",()=>{})
                    });
                    fs.readFile("scripts/stencil/pages/temp/model.jstemp", function (err, data) {
                        fs.writeFile(pagePath+"/model.js",data.toString().replace(/\$\{namespace\}/g,namespace),"utf-8",()=>{})
                    });
                    fs.readFile("scripts/stencil/pages/temp/service.jstemp", function (err, data) {
                        fs.writeFile(pagePath+"/service.js",data,"utf-8",()=>{})
                    });
                    fs.readFile("scripts/stencil/pages/temp/style.lesstemp", function (err, data) {
                        fs.writeFile(pagePath+"/style.less",data,"utf-8",()=>{})
                    });
                })
            }
        })
    }else{
        console.error("\033[41;30m ERROR: \033[0m \033[40;4m Character name is illegal. '^[A-Za-z0-9_-]+/[A-Za-z0-9_]+$' - "+program.page+" \033[0m")
        return 
    }
}else{
    console.error("\033[41;30m ERROR:\033[0m \033[40;4m No valid parameters \033[0m ")
}
