const chalk = require('chalk');
const util = require('util');

const typeInfo: number = 0
const typeSuccess: number = 1
const typeFail: number = 2
const typeError: number = 3
const typeWarning: number = 4

export class Logger {
    name: string
    active: boolean
    static active: boolean = true

    constructor(name: string, maxNameLen: number = 8, active: boolean = true) {
        this.name = name.length > maxNameLen ? name.slice(0, maxNameLen-1) + '.' : name + ' '.repeat(maxNameLen-name.length)
        this.active = active
    }

    // Dynamic

    log(message?: any, ...optionalParams: any[]) {
        this.info(message, ...optionalParams)
    }

    info(message?: any, ...optionalParams: any[]) {
        this._log(typeInfo, message, ...optionalParams)
    }

    success(message?: any, ...optionalParams: any[]) {
        this._log(typeSuccess, message, ...optionalParams)
    }

    fail(message?: any, ...optionalParams: any[]) {
        this._log(typeFail, message, ...optionalParams)
    }

    error(message?: any, ...optionalParams: any[]) {
        this._log(typeError, message, ...optionalParams)
    }

    warn(message?: any, ...optionalParams: any[]) {
        this._log(typeWarning, message, ...optionalParams)
    }

    private _log(type: number, message?: any, ...optionalParams: any[]) {
        return Logger._log(type, this.name, this.active, message, ...optionalParams)
    }

    // Static

    static log(message?: any, name?: string, ...optionalParams: any[]) {
        this.info(message, name, ...optionalParams)
    }

    static info(message?: any, name?: string, ...optionalParams: any[]) {
        this._log(typeInfo, name, this.active, message, ...optionalParams)
    }

    static success(message?: any, name?: string, ...optionalParams: any[]) {
        this._log(typeSuccess, name, this.active, message, ...optionalParams)
    }

    static fail(message?: any, name?: string, ...optionalParams: any[]) {
        this._log(typeFail, name, this.active, message, ...optionalParams)
    }

    static error(message?: any, name?: string, ...optionalParams: any[]) {
        this._log(typeError, name, this.active, message, ...optionalParams)
    }

    static warn(message?: any, name?: string, ...optionalParams: any[]) {
        this._log(typeWarning, name, this.active, message, ...optionalParams)
    }

    private static _log(type: number, name?: string, active: boolean = true, message?: any, ...optionalParams: any[]) {
        if (!active) { return }

        const signature = this.logSignature(type, name)
        var logParams = [signature.original]

        if (message) {
            logParams.push(this.strVal(message))
        }

        for (let optionalParam of optionalParams) {
            logParams.push(this.strVal(optionalParam))
        }

        const timeStr = this.timeStr
        const log = logParams.join(' ')

        if (log.includes('\n') || log.length + timeStr.original.length + 2 > this.consoleLineLen) {
            console.log(...logParams)

            return
        }

        let remainingLen = this.consoleLineLen - log.length - timeStr.original.length - 2

        logParams.push(' '.repeat(remainingLen))
        logParams.push(timeStr.colored)
        logParams[0] = signature.colored

        console.log(...logParams)
    }

    private static strVal(val: any): string {
        return util.inspect(val, {showHidden: false, depth: null})
    }

    private static logSignature(type: number, name?: string): {
        colored: string,
        original: string
    }{
        if (type == typeInfo) {
            const s = 'ℹ [INFO]    -' + (name ? ' ' + name + ' -' : '')
            return { colored: chalk.white.bold(s), original: s }
        } else if (type == typeSuccess) {
            const s = '✔ [SUCCESS] -' + (name ? ' ' + name + ' -' : '')
            return { colored: chalk.green.bold(s), original: s }
        } else if (type == typeFail) {
            const s = '✘ [FAIL]    -' + (name ? ' ' + name + ' -' : '')
            return { colored: chalk.yellow.bold(s), original: s }
        } else if (type == typeWarning) {
            const s = '! [WARNING] -' + (name ? ' ' + name + ' -' : '')
            return { colored: chalk.keyword('orange').bold(s), original: s }
        } else {
            const pre = '☠ [ERROR]'
            const post = '   -' + (name ? ' ' + name + ' -' : '')
            return { colored: chalk.bgKeyword('red').white.bold(pre) + chalk.red.bold(post), original: pre+post }
        }
    }

    private static get consoleLineLen(): number {
        return process.stdout.columns
    }

    private static get timeStr(): {
        colored: string,
        original: string
    } {
        const date = new Date()
        const org = `◴ ${this.toFilledStr(date.getUTCMonth())}-${this.toFilledStr(date.getUTCDay())}-${this.toFilledStr(date.getUTCHours())}:${this.toFilledStr(date.getUTCMinutes())}:${this.toFilledStr(date.getUTCSeconds())}.${this.msStr(date.getUTCMilliseconds())}`

        return { colored: chalk.blackBright.bold(org), original: org }
    }

    private static toFilledStr(num: number) {
        return `${num < 10 ? '0': ''}${num}`
    }

    private static msStr(ms: number) {
        return `${ms < 10 ? '00': ms < 100 ? '0': ''}${ms}`
    }
}