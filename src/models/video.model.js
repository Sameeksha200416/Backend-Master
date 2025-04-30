import mongoose, {Schema} from "mongoose";
"import mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type:String, //clouinary url
            required: true
        },
        title: {
            type:String,   //clouinary url
            required: true
        },
        description: {
            type:String ,//clouinary url
            required: true
        },
        duration: {
            type:Number ,//clouinary url
            required: true
        },
        views: {
            type:Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema)