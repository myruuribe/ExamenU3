const mongoose = require('mongoose');
const un = require('underscore');
const config= require('../_config');

module.exports = (wagner) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://localhost:27017/${config.DB}`, {useMongoClient: true});

    wagner.factory('db',()=>mongoose);
    const Fanpage = require('./fanpage.model');

    const models = {
        Fanpage
    }

    un.each(models,(v,k)=>{
        wagner.factory(k, ()=>v); 
    })

}