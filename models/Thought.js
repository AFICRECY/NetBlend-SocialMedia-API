const { Schema, Types } = require('mongoose');
const moment = require('moment');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1,
          },
          createdAt: {
            type: Date,
            default: Date.now,
            get:(date) => moment(date).format("MM/DD/YYYY"),
          },
          username: {
            type: String,
            required: true,
          },
          reactions: [reactionSchema],
        },
        {
            toJSON: {
              getters: true,
            },
            id: false,
          }
)
thoughtSchema.virtual("reactionCount").get(function (){
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
