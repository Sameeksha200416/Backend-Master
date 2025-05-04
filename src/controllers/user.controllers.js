import {asyncHandler} from  "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req,res) => {
    //get user details from frontend
    //validation - nott empty
    //check id user already exists:username,email
    //check for images , check for avtart
    //upload them to cloudinary,avtar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation 
    //return response to frontend
    const {fullName, email, username, password} = req.body
    console.log("email:", email);

    if(
        [fullName, email, username, password].some((field) =>
            field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = User.findOne({
        $or: [{email},{username}]
    })
    if(existedUser){
        throw new ApiError(409, "User already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    // console.log("avatarLocalPath:", avatarLocalPath);
    // console.log("coverImageLocalPath:", coverImageLocalPath);
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar upload failed")
    }
    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase() 
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refeshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while register the user")

    }
    return res.status(201).json(
        new ApiResponse(200, createdUser,"User created successfully")
    )
})

export {registerUser}