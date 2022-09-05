import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


//get all data
export const postsData = createAsyncThunk("post/postsData", async (_, thunkAPI)=>{
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts/');
        const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.error)
            }else{
                return fulfillWithValue(data)
            }
    }

    catch (error) {
            return rejectWithValue(error.message)
        }
});
//get post data
export const getPost = createAsyncThunk("post/getPost", async (id, thunkAPI)=>{
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.error)
            }else{
                return fulfillWithValue(data)
            }
    }

    catch (error) {
            return rejectWithValue(error.message)
        }
});

//delete data
export const deletePost = createAsyncThunk("post/deletePost", async (id, thunkAPI)=>{
    try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
            method: "DELETE",

        })
        
        return id;
    } catch (error) {
        console.log(error)
    }
});


// update data

export const updatePost = createAsyncThunk("post/updatePost", async (update, thunkAPI)=>{
    const { rejectWithValue, fulfillWithValue } = thunkAPI
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${update.id}`,{
            method: 'PUT',
            body: JSON.stringify(update),
 
            headers: {
               'Content-type': 'application/json; charset=UTF-8',
             },

        });
        const data = await res.json();
        if (!res.ok) {
            return rejectWithValue(data.error)
        }else{
            return fulfillWithValue(data)
        }
}

catch (error) {
        return rejectWithValue(error.message)
    }
});

 const postSlice = createSlice({
    name: "post",
    initialState: {posts: [], isLoading : false, post: null, error: null},
    extraReducers: {
        [postsData.pending]: (state, action)=>{
            state.isLoading = true;
        },
        [postsData.fulfilled]: (state, action)=>{
            state.posts = action.payload;
            state.isLoading = false;
            
        },
        [postsData.rejected]: (state, action)=>{
            state.isLoading = false;
            state.error = action.payload
            
        },   
        // get post
        [getPost.pending]: (state, action)=>{
            state.isLoading = true;
        },
        [getPost.fulfilled]: (state, action)=>{
            state.post = action.payload;
            state.isLoading = false;
           
        },
        [getPost.rejected]: (state, action)=>{
            state.isLoading = false;
            state.error = action.payload
            
        },   
        //Delete Data
        [deletePost.pending]: (state, action)=>{
            state.isLoading = true;
        },
        [deletePost.fulfilled]: (state, action)=>{
            state.posts = state.posts.filter((el)=>{
                return el.id !== action.payload;

            });
            state.isLoading = false;
            
        },
        [deletePost.rejected]: (state, action)=>{
            state.isLoading = false;
            state.error = action.payload
        },

        

        //update data
        [updatePost.pending]: (state, action)=>{
            state.isLoading = true;
        },
        [updatePost.fulfilled]: (state, action)=>{
            
            state.isLoading = false;
            state.posts[action.payload.id - 1] = action.payload;

        },
        [updatePost.rejected]: (state, action)=>{
            state.isLoading = false;
            state.error = action.payload
           
        },   
    
    }
})



export default postSlice.reducer;