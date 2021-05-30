/**
 * After importing the VPC & EFS (in that order) via AWS Cloudformation Console,
 * Copy & Paste the contents of this file into a new Lambda via the AWS Lambda 
 * console to test the EFS & VPC.
 */

'use strict';

const exec = require('child_process').exec;
const fs = require('fs');

const ping = function (url) {
    return new Promise((resolve, reject) => {
        const lib = url.startsWith('https') ? require('https') : require('http');
        const request = lib.get(url, (response) => {
            resolve(response.statusCode);
        });
        request.on('error', (err) => reject(err))
    })
};

exports.handler = async (event, context) => {
    console.log('@ EVENT @', event);
    console.log('@ CONTEXT @', context);

    const kMNT_PATH = event.mountPath;

    try {
        const content = await ping( 'https://www.google.com' );
        console.log(
            content === 200 
            ? 'SUCCESS! You have access to the internet' 
            : 'DOH! You do not have internet access', 
            `HTTP Reponse code ${content}`
        );
        return {
            statusCode: 200,
            body: JSON.stringify((() => {
                try {
                    fs.writeFileSync(`${kMNT_PATH}/test.txt`, 'Testing 1,2,3', 'utf-8');
                    return {
                        exists  : fs.existsSync(kMNT_PATH),
                        isdir   : fs.lstatSync(kMNT_PATH).isDirectory(),
                        readdir : fs.readdirSync(kMNT_PATH)
                    };
                } 
                catch (e) {
                    return {
                        error: e.toString()
                    }
                }
            })()),
        };
    } 
    catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: e.toString(),
            }),
        };
    }
}