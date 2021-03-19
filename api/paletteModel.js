var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paletteSchema = new Schema({
    name: String,
    creator: String,
    count: Number,
    color1: String,
    color2: String,
    color3: String,
    color4: String,
    color5: String
});
module.exports = mongoose.model('palette', paletteSchema);