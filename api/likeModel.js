var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var likeSchema = new Schema({
   user_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'user'
   },
   palette_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'palette'
   }
});
module.exports = mongoose.model('like', likeSchema);