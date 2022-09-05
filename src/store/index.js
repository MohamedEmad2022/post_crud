import {configureStore} from "@reduxjs/toolkit"
import post from "./postSlice"
export default configureStore({
    reducer:{
        post
    }
})