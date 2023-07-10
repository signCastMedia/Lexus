// ** Redux Imports
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


/*=============================================
=                INITIAL STATES              =
=============================================*/
const themeDataJson = JSON.parse(localStorage.getItem('themeData'))


const initialState = {
  palette: {
    primary: {
      light: "#5454e1",
      main: "#1e5e9d",
      dark: "#093561",
    },
    secondary: {
      light: "#d4939e",
      main: "#093561",
      dark: "#040202",
    },
    mode: "light",
  },
  themeData:themeDataJson ? themeDataJson :[]
};

/*=============================================
=            ASYNC THUNK FUNCTIONS            =
=============================================*/
// ** CREATE PROJECT
export const getTheme = createAsyncThunk(
  "get-theme",
  async (projectId) => {
    const res = await axios.get(`/api/themes/get/${projectId}`);
    return res.data;
  }
);


// ** CREATE PROJECT
export const updateTheme = createAsyncThunk(
  "update-theme",
  async (themeData) => {

    const res = await axios.post("/api/themes/update", {
      themeData,
    });

    return res.data;
  }
);

function extraReducers(builder) {
  //CREATE PROJECTS
  builder.addCase(updateTheme.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(updateTheme.fulfilled, (state, action) => {
    toast.success("You have saved your theme!");
    localStorage.setItem('themeData',JSON.stringify(action.payload))

    return{
      ...state,
      themeData:action.payload
    }
 
  });
  builder.addCase(updateTheme.rejected, (state, action) => {
    toast.error("An error has occured trying to save the theme");
  });


   //CREATE PROJECTS
   builder.addCase(getTheme.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(getTheme.fulfilled, (state, action) => {
   
    localStorage.setItem('themeData',JSON.stringify(action.payload))

    return{
      ...state,
      themeData:action.payload
    }

  });
  builder.addCase(getTheme.rejected, (state, action) => {
    toast.error("An error has occured trying to save the theme");

  });

}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      return {
        ...state,
        palette: [...action.payload],
      };
    },
  },
  extraReducers,
});

export const { selectUsersId } = themeSlice.actions;
// Action creators are generated for each case reducer function
// export const { } = authSlice.actions;

export default themeSlice.reducer;
