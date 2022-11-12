require('colors')

module.exports = {
    main() { return "<Module(Logger)> was been loaded"},
    getLogger(name) {
        return {
            log(content) {
                console.log(this.getDate().magenta + " [INFO]".blue + ` ${`[${name}]`.cyan} ` + content.reset );
            },
            error(content) {
                console.log(this.getDate().magenta + " [ERROR]".red + ` ${`[${name}]`.cyan} ` + content.reset );
            },
            warn(content) {
                console.log(this.getDate().magenta + " [WARN]".yellow ` ${`[${name}]`.cyan} ` + content.reset );
            },
            debug(content) {
                console.log(this.getDate().magenta + " [DEBUG]".green ` ${`[${name}]`.cyan} ` + content.reset );
            },
            getDate () {
                let date_ob = new Date()
                let date = ("0" + date_ob.getDate()).slice(-2)
                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
                let year = date_ob.getFullYear()
                let hours = ("0" + (date_ob.getHours())).slice(-2)
                let minutes = ("0" + (date_ob.getMinutes())).slice(-2)
                let seconds = ("0" + (date_ob.getSeconds())).slice(-2)
                return "[" + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + "]"
            }
        }
    }
}