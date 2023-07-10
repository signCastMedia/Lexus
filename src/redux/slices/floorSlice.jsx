// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// ** Axios Imports
import axios from "axios";

/*=============================================
=            ASYNC THUNK FUNCTIONS            =
=============================================*/

// ** GET ALL FLOORPLANS 
export const getAllFloor = createAsyncThunk(
  "getall-floorplans",
  async ( projectId ) => {
    const res = await axios.get(`/api/floorplan/getall`, {
      projectId,
    });
    
    return res.data.sort((a, b) => parseInt(a.productName.replace(/,/g,'') - parseInt(b.productName.replace(/,/g,''))))
  }
);
/////////////////////////////////////////////////

// ** CREATE ALL FLOORPLANS
export const createFloor = createAsyncThunk(
  "create-floorplans",
  async ({
    projectId,
    productName,
    subtitle,
    exterior,
    thumbnail,
    thumbnailSmall,
    gallery,
    numOfBed,
    sqFt,
    sqFtOut,
    sqFtTotal,
    price,
    type,
    building,
    bath,
    exposure,
    bf,
    hide
  },{dispatch}) => {
    const res = await axios.post("/api/floorplan/create", {
      projectId,
      productName,
      subtitle,
      exterior,
      thumbnail,
      thumbnailSmall,
      gallery,
      numOfBed,
      sqFt,
      sqFtOut,
      sqFtTotal,
      price,
      type,
      building,
      bath,
      exposure,
      bf,
      hide
    });

      dispatch(getAllFloor(projectId))
    return res.data;
  }
);
//////////////////////////////////////////////////

// ** DELETE FLOORPLAN
export const deleteFloor = createAsyncThunk(
  "delete-floorplan",
  async ({ floorIds, projectId }, { dispatch }) => {
    const res = await axios.delete(`/api/floorplan/delete`, { data: floorIds });

    dispatch(getAllFloor(projectId));
    return res.data;
  }
);
//////////////////////////////////////////////////

// ** UPDATE FLOORPLAN
export const updateFloor = createAsyncThunk(
  "update-floorplan",
  async ({
    floorId,
    projectId,
    productName,
    subtitle,
    exterior,
    thumbnail,
    thumbnailSmall,
    gallery,
    numOfBed,
    sqFt,
    sqFtOut,
    sqFtTotal,
    price,
    type,
    building,
    bath,
    exposure,
    bf,
    hide

  },{dispatch}) => {
    const res = await axios.put("/api/floorplan/update", {
      floorId,
      projectId,
      productName,
      subtitle,
      exterior,
      thumbnail,
      thumbnailSmall,
      gallery,
      numOfBed,
      sqFt,
      sqFtOut,
      sqFtTotal,
      price,
      type,
      building,
      bath,
      exposure,
      bf,
      hide
    });
    dispatch(getAllFloor(projectId))
    return res.data;
  }
);
//////////////////////////////////////////////////

/*=============================================
  =                INITIAL STATES              =
  =============================================*/

const initialState = {
  Data: [],
  filteredData:[],
  filteredValues:{},
  filterOn:false
};

// *=====  End of ASYNC THINK FUNCTIONS  ======*/

/*============================================
=             REGISTER EXTRA REDUCERS              =
=============================================*/
function extraReducers(builder) {
  builder.addCase(getAllFloor.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(getAllFloor.fulfilled, (state, action) => {
    return {
      ...state,
      loading: false,
      Data: action.payload,
      filteredData:action.payload
    };
  });
  builder.addCase(getAllFloor.rejected, (state, action) => {
    return {
      ...state,
      loading: false,
      isInitialized: false,
    };
  });

  /////////////////////////CREATE///////////////////////////////
  builder.addCase(createFloor.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(createFloor.fulfilled, (state, action) => {
    return {
      ...state,
      loading: false,
      success: action.payload,
    };
  });
  builder.addCase(createFloor.rejected, (state, action) => {
    return {
      ...state,
      loading: false,
      isInitialized: false,
    };
  });

  /////////////////////////DELETE///////////////////////////////
  builder.addCase(deleteFloor.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(deleteFloor.fulfilled, (state, action) => {
    return {
      ...state,
      loading: false,
      deleteSuccess:'successfully deleted'
    };
  });
  builder.addCase(deleteFloor.rejected, (state, action) => {
    return {
      ...state,
      loading: false,
      isInitialized: false,
    };
  });

  /////////////////////////UPDATE///////////////////////////////
  builder.addCase(updateFloor.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(updateFloor.fulfilled, (state, action) => {
    return {
      ...state,
      loading: false,
     updateSuccess: action.payload,
    };
  });
  builder.addCase(updateFloor.rejected, (state, action) => {
    return {
      ...state,
      loading: false,
      isInitialized: false,
    };
  });
}

export const floorplanSlice = createSlice({
  name: "floorData",
  initialState,
  reducers: {
    filterValues: (state, action) => {
      const keys = action.payload
     if(keys.length < 1){
      state.filterOn = false
     }else{
      state.filterOn = true
     }
      
    },

    filterChoice: (state, action) => {
     
      const val = action.payload
      if(state.filterOn === false){
        state.filteredData = state.Data
      }else{
        state.filteredData = [...val]
      }
      



    },
  },
  extraReducers,
});

// Action creators are generated for each case reducer function
export const {filterValues,filterChoice } = floorplanSlice.actions;

export default floorplanSlice.reducer;
