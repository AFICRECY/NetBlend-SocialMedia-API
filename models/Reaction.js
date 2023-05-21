const { ObjectId } = require('bson');
const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
      reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
      },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1,
        },
        username: {
            type: String,
            required: true,
        }, 
        createdAt: {
            type: Date,
            default: Date.now,
            get:(date) => moment(date).format("MM/DD/YYYY"),
          },

      },
      {
        toJSON: {
          getters: true,
        },
      }
)
    
module.exports = reactionSchema;