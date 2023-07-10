// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// ** Axios Imports
import axios from "axios";

/*=============================================
=            ASYNC THUNK FUNCTIONS            =
=============================================*/

/*=============================================
=                INITIAL STATES              =
=============================================*/

// ** Fetch Authentication
let token = localStorage.getItem("token");
let userData = null;
if (token) {
  const payload = JSON.parse(window.atob(token.split(".")[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    token = null;
  } else {
    userData = payload.user;
  }
}

const initialState = {
  loading: false,
  userInfo: userData, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false,
  editAdmin: false, // for monitoring the registration process.
};

const options = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

// ** FETCH ALL USER LIST
export const fetchAllUsers = createAsyncThunk("all-users", async () => {
  const res = await axios.get("/api/users/");
  return res.data;
});

// ** CREATE NEW USER
export const createUser = createAsyncThunk(
  "create-users",
  async ({ name, email, password }) => {
    const res = await axios.post("/api/users/signup", {
      name,
      email,
      password,
    });
    return res.data;
  }
);

// ** CREATE NEW USER
export const createAdminUser = createAsyncThunk(
  "create-admin-user",
  async ({ name, email, password }) => {
    const res = await axios.post("/api/users/admin", {
      name,
      email,
      password,
    });
    return res.data;
  }
);


// ** DELETE USER
export const deleteUser = createAsyncThunk("delete-user", async (userId) => {
  let newId = userId;
  await axios.delete(`/api/users/delete/${userId}`);
  return newId;
});

// ** LOGIN
export const handleLogin = createAsyncThunk(
  "login-user",
  async ({ email, password }) => {
    const res = await axios.post("/api/users/login/", {
      email,
      password,
    });
    localStorage.removeItem('token')
    localStorage.setItem("token", res.data);
    return res.data;
  }
);

// ** REGISTER
export const handleRegister = createAsyncThunk(
  "register-user",
  async ({ name, email, password }) => {
    const res = await axios.post("/api/users/signup/", {
      name,
      email,
      password,
    });
    localStorage.setItem("token", res.data);
    return res.data;
  }
);

// ** UPDATE  PERMISSION

export const updatePermission = createAsyncThunk(
  "update-permission",
  async ({ userId, createUnit, updateUnit, deleteUnit, updateTheme }) => {
    const res = await axios.put("/api/users/update", {
      userId,
      createUnit,
      deleteUnit,
      updateTheme,
      updateUnit,
    });
    return res.data;
  }
);

/*=====  End of ASYNC THINK FUNCTIONS  ======*/

/*============================================
=             REGISTER EXTRA REDUCERS              =
=============================================*/
function extraReducers(builder) {
  builder.addCase(handleRegister.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(handleRegister.fulfilled, (state, action) => {
    toast.success("Successfully Registered User");
    let token = action.payload;
    let userData = null;
    if (token) {
      const payload = JSON.parse(window.atob(token.split(".")[1]));
      userData = payload.user;
    }
    return {
      ...state,
      loading: false,
      userToken: action.payload,
      userInfo: userData,
    };
  });
  builder.addCase(handleRegister.rejected, (state, action) => {
    toast.error("Could not register new user at this time");
    return {
      ...state,
      loading: false,
      isInitialized: false,
    };
  });
  builder.addCase(handleLogin.pending, (state, action) => {
    return {
      ...state,
      loading: true,
      isInitialized: true,
    };
  });
  builder.addCase(handleLogin.fulfilled, (state, action) => {
    let token = action.payload;
    toast.success("Successfully Logged In");
    let userData = null;
    if (token) {
      const payload = JSON.parse(window.atob(token.split(".")[1]));

      userData = payload.user;
    }
    return {
      ...state,
      loading: false,
      userToken: action.payload,
      userInfo: userData,
    };
  });
  builder.addCase(handleLogin.rejected, (state, action) => {
    toast.error("Invalid Credentials");
    return {
      ...state,
      loading: false,
      isInitialized: false,
      error: "Invalid Credentials",
    };
  });
  builder.addCase(fetchAllUsers.pending, (state, action) => {
    return {
      ...state,
      usersLoading: true,
      isInitialized: true,
    };
  });
  builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
    return {
      ...state,
      userLoading: false,
      users: action.payload,
    };
  });
  builder.addCase(fetchAllUsers.rejected, (state, action) => {
    return {
      ...state,
      usersLoading: false,
      error: "Failed to fetch userList",
    };
  });
  builder.addCase(createUser.pending, (state, action) => {
    return {
      ...state,
      usersLoading: true,
      isInitialized: false,
    };
  });
  builder.addCase(createUser.fulfilled, (state, action) => {
    toast.success("Successfully created new user!");
    return {
      ...state,
      userLoading: false,
      users: [...state.users, action.payload],
    };
  });
  builder.addCase(createUser.rejected, (state, action) => {
    toast.error("Failed to create new user at this time!");
    return {
      ...state,
      usersLoading: false,
      error: "Failed create user",
    };
  });

  builder.addCase(createAdminUser.pending, (state, action) => {
    return {
      ...state,
      usersLoading: true,
      isInitialized: false,
    };
  });
  builder.addCase(createAdminUser.fulfilled, (state, action) => {
    toast.success("Successfully created new admin user!");
    return {
      ...state,
      userLoading: false,
      users: [...state.users, action.payload],
    };
  });
  builder.addCase(createAdminUser.rejected, (state, action) => {
    toast.error("Failed to create new admin user at this time!");
    return {
      ...state,
      usersLoading: false,
      error: "Failed create user",
    };
  });


  builder.addCase(deleteUser.pending, (state, action) => {
    return {
      ...state,
      usersLoading: true,
      isInitialized: false,
    };
  });
  builder.addCase(deleteUser.fulfilled, (state, action) => {
    toast.success("Successfully deleted user!");
    return {
      ...state,
      userLoading: false,
      users: [...state.users.filter((u) => u._id !== action.payload)],
    };
  });
  builder.addCase(deleteUser.rejected, (state, action) => {
    toast.error("Failed to delete user at this time!");
    return {
      ...state,
      usersLoading: false,
      error: "Failed to delete user",
    };
  });

  builder.addCase(updatePermission.pending, (state, action) => {
    return {
      ...state,
      usersLoading: true,
      isInitialized: false,
    };
  });
  builder.addCase(updatePermission.fulfilled, (state, action) => {
    toast.success("Successfully updated user permissions!");

    const newUserList = [
      ...state.users.filter((f) => f._id !== action.payload._id),
    ];

    if (action.payload._id === state.userInfo._id) {
      return {
        ...state,
        users: [action.payload, ...newUserList],
        userInfo:action.payload
      };
    } else {
      return {
        ...state,
        users: [action.payload, ...newUserList],
      };
    }
  });
  builder.addCase(updatePermission.rejected, (state, action) => {
    toast.error("Failed to delete user at this time!");
    return {
      ...state,
      usersLoading: false,
      error: "Failed to delete user",
    };
  });
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => ({
      loading:false,
      userInfo:null,
      userToken:null,
      error:null,
      success:false,
      editAdmin:false,
    }),
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    editAdminSlice: (state, action) => ({
      ...state,
      editAdmin: !state.editAdmin,
    }),
  },
  extraReducers,
});

// Action creators are generated for each case reducer function
export const { logout, setUser, editAdminSlice } = authSlice.actions;

export default authSlice.reducer;
