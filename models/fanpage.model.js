const mongoose=require('mongoose');

let fanpageschema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keywords: [String],
    coments: [String],
    calif: [Number]
});

const fanpageModel = mongoose.model('fanpage', fanpageschema, 'FanPages');

module.exports = fanpageModel;