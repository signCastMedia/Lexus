// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";

// ** Axios Imports
import axios from "axios";

/*=============================================
=                INITIAL STATES              =
=============================================*/
const selectedPro = JSON.parse(localStorage.getItem("selectedPro"));
const chosenLocal = JSON.parse(localStorage.getItem("chosenProject"));
// const carouselLocal = JSON.parse(localStorage.getItem("carousel"));

const initialState = {
  project: "",
  loading: "",
  success: "",
  error: "",
  projects: [],
  userProjects: selectedPro ? [...selectedPro] : [],
  userProjectId: "",
  chosenProject: chosenLocal ? chosenLocal : [],
  // carousel: carouselLocal ? [carouselLocal] : [],
};

/*=============================================
=            ASYNC THUNK FUNCTIONS            =
=============================================*/

// ** CREATE PROJECT
export const createCarousel = createAsyncThunk(
  "create-Carousel",
  async ({ projectId, fileType, name, duration, fileName }) => {
    const res = await axios.post("/api/projects/addcarousel", {
      projectId,
      fileType,
      name,
      duration,
      fileName,
    });

    return res.data;
  }
);

// ** DELETE CAROUSEL
export const deleteCarousels = createAsyncThunk(
  "deleteCara",
  async ({ caraId, projectId }) => {
    let res = await axios.delete(`/api/projects/deletecarousel`, {
      data: { projectId, caraId },
    });

    return res.data;
  }
);

// ** DELETE SINGLE CARAOUSEL
export const deleteSingleCarousel = createAsyncThunk(
  "delete-single-Cara",
  async ({ caraId, projectId }) => {
    let res = await axios.delete(`/api/projects/deletesinglecara`, {
      data: { projectId, caraId },
    });

    return res.data;
  }
);

// ** GET ALL CAROUSEL
// export const getCarouselByProjectId = createAsyncThunk(
//   "getallcara",
//   async ({ projectId }) => {
//     let res = await axios.get(`/api/projects/allCara/${projectId}`);

//     return res.data;
//   }
// );

// ** DELETE CONTENT
export const deleteContent = createAsyncThunk(
  "delete-Content",
  async ({ caraId, projectId }) => {
    let res = await axios.put(`/api/projects//contentdelete`, {
      projectId,
      caraId,
    });

    return res.data;
  }
);

// ** UPDATE CAROUSELS
export const updateCarousels = createAsyncThunk(
  "updateCara",
  async ({ caraId, projectId, fileName }) => {
    let res = await axios.put(`/api/projects/update/carasol`, {
      projectId,
      caraId,
      fileName,
    });
    return res.data;
  }
);

// ** CRREATE PROJECT
export const createProject = createAsyncThunk(
  "create-project",
  async ({ projectName, accountId }) => {
    const res = await axios.post("/api/projects/create", {
      projectName,
      accountId,
    });

    return res.data;
  }
);

// ** FETCH DEAL MEMO LIST
export const fetchAllProjects = createAsyncThunk(
  "allProjects",
  async ({ accountId }) => {
    const res = await axios.get(`/api/projects/fetch/${accountId}`);
    return res.data;
  }
);

// ** DELETE ALL PROJECTS
export const deleteProjects = createAsyncThunk(
  "deleteProjects",
  async ({ projectId }) => {
    const newId = projectId;
    await axios.delete(`/api/projects/delete/${projectId}`);
    return newId;
  }
);



// ** RE ORDER CARA
export const reOrderCara = createAsyncThunk(
  "reOrderCara",
  async ({caraData,projectId }) => {
   let res =  await axios.put(`/api/projects/carareorder`,
    {caraData,projectId});
    return res.data;
  }
);


// ** UPDATE PROEJECT SCREEN
export const updateProjectScreens = createAsyncThunk(
  "updatetheprojects",
  async ( projectId ) => {
    const res = await axios.put(`/api/projects/update/project`, {
      projectId
    });
    return res.data

  }
);
/*=====  End of ASYNC THINK FUNCTIONS  ======*/

/*============================================
=             REGISTER EXTRA REDUCERS              =
=============================================*/
function extraReducers(builder) {

  //CREATE PROJECTS
  builder.addCase(createProject.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(createProject.fulfilled, (state, action) => {
    toast.success("You have successfully created a Project!");

    return {
      ...state,
      projects: [...state.projects, action.payload],
    };
  });
  builder.addCase(createProject.rejected, (state, action) => {
    toast.error("Invalid Project Entry (make sure your ids are unique)");
    return {
      ...state,
      loading: false,
    };
  });

  // //CREATE Carasol
  // builder.addCase(getCarouselByProjectId.pending, (state, action) => {
  //   return {
  //     ...state,
  //     loading: true,
  //     isInitialized: true,
  //   };
  // });
  // builder.addCase(getCarouselByProjectId.fulfilled, (state, action) => {
  //   localStorage.setItem("carousel", JSON.stringify(action.payload));
  //   return {
  //     ...state,
  //     carousel: [...action.payload],
  //   };
  // });
  // builder.addCase(getCarouselByProjectId.rejected, (state, action) => {
  //   toast.error("Cannot fetch carousel list at this time)");
  //   return {
  //     ...state,
  //     loading: false,
  //   };
  // });

  //CREATE Carasol
  builder.addCase(createCarousel.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(createCarousel.fulfilled, (state, action) => {
    toast.success("You have successfully created a carousel Item!");
    localStorage.setItem("carousel", JSON.stringify(action.payload));
    return {
      ...state,
      chosenProject: {...state.chosenProject,carousel:action.payload},
    };
  });
  builder.addCase(createCarousel.rejected, (state, action) => {
    toast.error("Cannot create carousel at this time)");
    return {
      ...state,
      loading: false,
    };
  });

  //Delete Carasol
  builder.addCase(deleteCarousels.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(deleteCarousels.fulfilled, (state, action) => {
    toast.success("You have successfully deleted a carousel Item!");
    localStorage.setItem("carousel", JSON.stringify(action.payload));

    return {
      ...state,
      chosenProject: action.payload
    };
  });
  builder.addCase(deleteCarousels.rejected, (state, action) => {
    toast.error("Cannot delete carousel at this time)");
    return {
      ...state,
      loading: false,
    };
  });

  //Update Carasol
  builder.addCase(updateCarousels.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(updateCarousels.fulfilled, (state, action) => {
    toast.success("You have successfully updated a carousel Item!");
    localStorage.setItem("carousel", JSON.stringify(action.payload));
    return {
      ...state,
      carousel: [...action.payload],
    };
  });
  builder.addCase(updateCarousels.rejected, (state, action) => {
    toast.error("Cannot update carousel at this time)");
    return {
      ...state,
      loading: false,
    };
  });

  //Update Carasol
  builder.addCase(deleteSingleCarousel.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(deleteSingleCarousel.fulfilled, (state, action) => {
    toast.success("You have successfully removed Carousel item");
    localStorage.setItem("carousel", JSON.stringify(action.payload));
    return {
      ...state,
      carousel: [...action.payload],
    };
  });
  builder.addCase(deleteSingleCarousel.rejected, (state, action) => {
    toast.error("Cannot remove Carousel item at this time)");
    return {
      ...state,
      loading: false,
    };
  });

  //Delete Carsol Pic
  builder.addCase(deleteContent.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(deleteContent.fulfilled, (state, action) => {
    toast.success("You have successfully removed content");
    localStorage.setItem("carousel", JSON.stringify(action.payload));
    return {
      ...state,
      carousel: [...action.payload],
    };
  });
  builder.addCase(deleteContent.rejected, (state, action) => {
    toast.error("Cannot remove content at this time)");
    return {
      ...state,
      loading: false,
    };
  });

  //FETCH ALL PROJECTS
  builder.addCase(fetchAllProjects.pending, (state, action) => {
    return {
      ...state,
      loadingProjects: true,
    };
  });
  builder.addCase(fetchAllProjects.fulfilled, (state, action) => {
    return {
      ...state,
      loadingProjects: false,
      projects: [...action.payload],
    };
  });
  builder.addCase(fetchAllProjects.rejected, (state, action) => {
    return {
      ...state,
      loading: false,
      projectsError: "Error fetching products",
    };
  });

  //DELETE PROJECT
  builder.addCase(deleteProjects.pending, (state, action) => {
    return {
      ...state,
      loadingProjects: true,
    };
  });
  builder.addCase(deleteProjects.fulfilled, (state, action) => {
    toast.success("Successfully deleted project");
    return {
      ...state,
      projects: [...state.projects.filter((p) => p._id !== action.payload)],
    };
  });
  builder.addCase(deleteProjects.rejected, (state, action) => {
    toast.error("Could not delete project at this time!");
    return {
      ...state,
      loading: false,
      projectsError: "Error fetching products",
    };
  });


    //UPDATE PROJECT SCREENS
    builder.addCase(updateProjectScreens.pending, (state, action) => {
      return {
        ...state,
        loadingProjects: true,
      };
    });
    builder.addCase(updateProjectScreens.fulfilled, (state, action) => {
      toast.success("Update Initiated");
      // return {
      //   ...state, projects: [...state.projects.filter((p) => p._id !== action.payload)],
      // };
    });
    builder.addCase(updateProjectScreens.rejected, (state, action) => {
      toast.error("Could not update screens at this time.");

    });


        //REORDER PROJECT SCREENS
        builder.addCase(reOrderCara.pending, (state, action) => {
          return {
            ...state,
            loadingProjects: true,
          };
        });
        builder.addCase(reOrderCara.fulfilled, (state, action) => {
          toast.success('Re-order Successfull')
          localStorage.setItem("chosenProject", JSON.stringify(action.payload));
          return {
            ...state,
            chosenProject: action.payload,
          };
        });
        builder.addCase(reOrderCara.rejected, (state, action) => {
          toast.error("Could not update screens at this time.");
    
        });
}

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    selectUsersId: (state, action) => {
      const newVal = [
        ...state.projects.filter(
          (p) => p.userId.toString() === action.payload.toString()
        ),
      ];
      localStorage.setItem("selectedPro", JSON.stringify(newVal));
      return {
        ...state,
        userProjectId: action.payload,
        userProjects: [
          ...state.projects.filter(
            (p) => p.userId.toString() === action.payload.toString()
          ),
        ],
      };
    },

    chooseProjectForExtra: (state, action) => {
      localStorage.setItem("chosenProject", JSON.stringify(action.payload));
      return {
        ...state,
        chosenProject: action.payload,
      };
    },
    removeProjectForExtra: (state, action) => {
      localStorage.removeItem("chosenProject");
      return {
        ...state,
        chosenProject: [],
      };
    },
  },
  extraReducers,
});

export const { selectUsersId, chooseProjectForExtra, removeProjectForExtra } =
  projectSlice.actions;
// Action creators are generated for each case reducer function
// export const { } = authSlice.actions;

export default projectSlice.reducer;
