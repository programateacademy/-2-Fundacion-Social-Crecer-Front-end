const { connect } = require("mongoose")


const conn = () => {
   connect(process.env.URL_DB)
   .then(_ => {console.log("connect")} )
   .catch(err =>{console.log("error:" + err)} )
}

module.exports = conn