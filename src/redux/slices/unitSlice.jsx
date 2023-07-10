// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// ** Axios Imports
import axios from "axios";

/*=============================================
=                INITIAL STATES              =
=============================================*/

const initialState = {
  units: [],
  currentSuite: [],
  screens: [],
};

/*=============================================
=            ASYNC THUNK FUNCTIONS            =
=============================================*/

//SCREENS
// ** CREATE NEW SCREEN
export const createScreen = createAsyncThunk(
  "create-screen",
  async ({ project }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/screens/create", {
        projectId: project,
        coords: { coordY: "10", coordX: "200" },
      });

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({ data: err.response.data.ERROR });
      }
    }
  }
);

// ** CREATE NEW SCREEN
export const fetchScreensByProjectId = createAsyncThunk(
  "fetch-allScreens",
  async ({ project }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/screens/getscreenlist/${project}`);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({ data: err.response.data.ERROR });
      }
    }
  }
);

//** SET SCREEN */
export const setScreen = createAsyncThunk(
  "setScreen",
  async ({ screenId,kioskId,name }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/screens/setscreen`,{
        screenId,
        kioskId,
        name
      });

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({ data: err.response.data.ERROR });
      }
    }
  }
);

//SCREENS
// ** DELETE SCREEN
export const deleteScreen = createAsyncThunk(
  "delete-screen",
  async ({ screenId }, { rejectWithValue }) => {
    try {
      await axios.delete("/api/screens/delete", { data: { screenId } });

      return screenId;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({ data: err.response.data.ERROR });
      }
    }
  }
);

// ** DELETE LOGO 
export const deleteLogo = createAsyncThunk(
  "delete-logo",
  async ({ unitId }, { rejectWithValue }) => {
    try {
      let res = await axios.delete("/api/units/pic/delete", {
        data: { unitId },
      });
     
      return res.data;
    
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({ data: err.response.data.ERROR });
      }
    }
  }
);

//////////////////////////////////////////////////////////////////////////////
// UNITS
// ** FETCH DEAL MEMO LIST
export const createUnit = createAsyncThunk(
  "create-unit",
  async ({ projectId, floor, suite, companyName }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/units/create", {
        projectId,
        floor,
        suite,
        companyName,
      });

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({ data: err.response.data.ERROR });
      }
    }
  }
);

// ** FETCH DEAL MEMO LIST
export const fetchUnitsByProjectId = createAsyncThunk(
  "units",
  async (projectId) => {
    const res = await axios.get(`/api/units/${projectId}`);
    return res.data.sort((a, b) =>
      a.suite > b.suite ? 1 : b.suite > a.suite ? -1 : 0
    );
  }
);

// ** DELETE UNIT
export const deleteUnits = createAsyncThunk(
  "deleteUnit",
  async ({ unitIds, projectId }, { dispatch }) => {
    const newIds = unitIds;
    await axios.delete(`/api/units/delete`, { data: unitIds });
    dispatch(fetchUnitsByProjectId(projectId));
    return newIds;
  }
);

// ** UPDATE UNIT
export const updateUnits = createAsyncThunk(
  "updateUnit",
  async ({ unitId, companyName, logo }) => {

    const res = await axios.put(`/api/units/update`, {
      unitId,
      companyName,
      logo
    });
    return res.data;

    
  }
);

/*=====  End of ASYNC THINK FUNCTIONS  ======*/

/*============================================
=             REGISTER EXTRA REDUCERS              =
=============================================*/
function extraReducers(builder) {
  //CREATE SCREEN
  builder.addCase(createScreen.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(createScreen.fulfilled, (state, action) => {
    toast.success("You have successfully created a Screen!");

    return {
      ...state,
      screens: [...state.screens, action.payload],
    };
  });
  builder.addCase(createScreen.rejected, (state, action) => {
    toast.error("Cannot create a screen at this time !");

    return {
      ...state,
      loading: false,
    };
  });

  //FETCH SCREENS BY PROJECT ID
  builder.addCase(fetchScreensByProjectId.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(fetchScreensByProjectId.fulfilled, (state, action) => {
    return {
      ...state,
      screens: [...action.payload],
    };
  });
  builder.addCase(fetchScreensByProjectId.rejected, (state, action) => {
    toast.error("Cannot create a screen at this time !");

    return {
      ...state,
      loading: false,
    };
  });

    //FETCH SCREENS BY PROJECT ID
  builder.addCase(setScreen.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(setScreen.fulfilled, (state, action) => {
    return {
      ...state,
      screens: [...action.payload],
    };
  });
  builder.addCase(setScreen.rejected, (state, action) => {
    toast.error("Cannot set screen at this time");

    return {
      ...state,
      loading: false,
    };
  });

  //CREATE SCREEN
  builder.addCase(deleteScreen.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(deleteScreen.fulfilled, (state, action) => {
    toast.success("You have successfully deleted the Screen!");

    return {
      ...state,
      screens: [...state.screens.filter((s) => s._id !== action.payload)],
    };
  });
  builder.addCase(deleteScreen.rejected, (state, action) => {
    toast.error("Cannot delete screen at this time!");

    return {
      ...state,
      loading: false,
    };
  });

  //CREATE UNIT
  builder.addCase(createUnit.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(createUnit.fulfilled, (state, action) => {
    toast.success("You have successfully created a Unit!");
    let newUnits = [...state.units, action.payload];

    return {
      ...state,
      units: [...newUnits],
      currentSuite: [...state.currentSuite, action.payload],
    };
  });
  builder.addCase(createUnit.rejected, (state, action) => {
    if (action.payload.data && action.payload.data.keyPattern.suite) {
      toast.error("Only One company per Unit at this time.");
    } else {
      toast.error("Cannot create unit at this time !");
    }

    return {
      ...state,
      loading: false,
    };
  });

  //FETCH ALL UNITS
  builder.addCase(fetchUnitsByProjectId.pending, (state, action) => {
    return {
      ...state,
      loadingUnits: true,
    };
  });
  builder.addCase(fetchUnitsByProjectId.fulfilled, (state, action) => {
    return {
      ...state,
      loadingUnits: false,
      units: [...action.payload],
    };
  });
  builder.addCase(fetchUnitsByProjectId.rejected, (state, action) => {
    toast.error("Error fetching products");
    return {
      ...state,
      loading: false,
      unitsError: "Error fetching products",
    };
  });

  //   //DELETE PROJECT
  builder.addCase(deleteUnits.pending, (state, action) => {
    return {
      ...state,
      loadingDelete: true,
    };
  });
  builder.addCase(deleteUnits.fulfilled, (state, action) => {
    toast.success("Successfully deleted unit");
    return {
      ...state,
      loadingDelete: false,
      units: [...state.units.filter((p) => p._id !== action.payload)],
      currentSuite: [
        ...state.currentSuite.filter((p) => p._id !== action.payload),
      ],
    };
  });
  builder.addCase(deleteUnits.rejected, (state, action) => {
    toast.error("Could not delete project at this time!");
    return {
      ...state,
      loadingDelete: false,
    };
  });

  //   //DELETE PROJECT
  builder.addCase(deleteLogo.pending, (state, action) => {
    return {
      ...state,
    };
  });
  builder.addCase(deleteLogo.fulfilled, (state, action) => {
    toast.success("Successfully removed Logo");
    return {
      ...state,
      // loadingUnits: false,
      units: [...action.payload],
    };
  });
  builder.addCase(deleteLogo.rejected, (state, action) => {
    toast.error("Could not remove Logo at this time!");
    return {
      ...state,
    };
  });

  //   //UPDATE PROJECT
  builder.addCase(updateUnits.pending, (state, action) => {
    return {
      ...state,
      loadingUnits: true,
    };
  });
  builder.addCase(updateUnits.fulfilled, (state, action) => {
    toast.success("Successfully updated unit");

    return {
      ...state,
      units: [...action.payload],
      // currentSuite:[ ...state.currentSuite.map(s => (s._id.toString() === action.payload._id.toString()) ? action.payload : s),action.payload]
    };
  });
  builder.addCase(updateUnits.rejected, (state, action) => {
    toast.error("Could not update unit at this time!");
    return {
      ...state,
    };
  });
}

export const unitSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    currentSuiteChange: (state, action) => {
      return {
        ...state,
        currentSuite: [...action.payload],
      };
    },
  },
  extraReducers,
});

export const { currentSuiteChange } = unitSlice.actions;
// Action creators are generated for each case reducer function
// export const { } = authSlice.actions;

export default unitSlice.reducer;
