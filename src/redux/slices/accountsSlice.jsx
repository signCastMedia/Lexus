// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// ** Axios Imports
import axios from "axios";

const initialState = {
  accounts: [],
  userModalInfo: [],
};

// ** FETCH All ACCOUNTS
export const fetchAllAccounts = createAsyncThunk("allAccounts", async ({userInfo}) => {
  if(userInfo && userInfo.isSignCast){
    const res = await axios.get("/api/accounts/");
    return res.data
  }else{
    const res = await axios.get(`/api/accounts/accountbyid/${userInfo && userInfo._id}`);
    return res.data
  }
  
  
});

// ** CREATE NEW ACCOUNT
export const createNewAccount = createAsyncThunk(
  "create-account",
  async ({ name }) => {
    const res = await axios.post("/api/accounts/create", { name });
    return res.data;
  }
);

// ** ADD USER TO ACCOUNT
export const addUserToAccount = createAsyncThunk(
  "addUserToAccount",
  async ({ accountId, userId }) => {
    const res = await axios.put("/api/accounts/adduser", { accountId, userId });
    return res.data;
  }
);

// ** DELETE ACCOUNT 
export const deleteAccount = createAsyncThunk("delete-Account", async (accountId) => {

    await axios.delete(`/api/accounts/delete/${accountId}`);
    return accountId
});




// ** CREATE NEW ACCOUNT
export const deleteUserFromAccount = createAsyncThunk(
  "deleteUserFromAccount",
  async ({ accountId, userId }) => {
    let res = await axios.delete("/api/accounts/deleteuser", {
      data: { accountId, userId },
    });
    return { data: res.data, userId, accountId };
  }
);

function extraReducers(builder) {
  //FETCH ALL ACCOUNTS
  builder.addCase(fetchAllAccounts.pending, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  });
  builder.addCase(fetchAllAccounts.fulfilled, (state, action) => {

    return {
      ...state,
      accounts: [...action.payload],
    };
  });
  builder.addCase(fetchAllAccounts.rejected, (state, action) => {

    return {
      ...state,
      loading: false,
    };
  });

  //CREATE ACCOUNT
  builder.addCase(createNewAccount.pending, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  });
  builder.addCase(createNewAccount.fulfilled, (state, action) => {
    toast.success("Successfully created new Account");
    return {
      ...state,
      accounts: [...state.accounts, action.payload],
    };
  });
  builder.addCase(createNewAccount.rejected, (state, action) => {
    toast.error("Error creating account at this time.");
    return {
      ...state,
      loading: false,
    };
  });

  //CREATE ACCOUNT
  builder.addCase(deleteAccount.pending, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  });
  builder.addCase(deleteAccount.fulfilled, (state, action) => {
    toast.success("Successfully deleted Account");
    return {
      ...state,
      accounts: [...state.accounts.filter((a)=>a._id.toString() !== action.payload.toString())],
    };
  });
  builder.addCase(deleteAccount.rejected, (state, action) => {
    toast.error("Error deleting account at this time.");
    return {
      ...state,
      loading: false,
    };
  });




  //ADD USER TO ACCOUNT
  builder.addCase(addUserToAccount.pending, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  });
  builder.addCase(addUserToAccount.fulfilled, (state, action) => {
    toast.success("Successfully added user to account");
    let newUserModalInfo = action.payload.filter((f)=>f._id === state.userModalInfo._id)


    return {
      ...state,
      accounts: [...action.payload],
      userModalInfo: newUserModalInfo[0],
    };
  });
  builder.addCase(addUserToAccount.rejected, (state, action) => {
    toast.error("Error creating account at this time.");
    return {
      ...state,
      loading: false,
    };
  });

  //DELETE USER FROM ACCOUNT
  builder.addCase(deleteUserFromAccount.pending, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  });
  builder.addCase(deleteUserFromAccount.fulfilled, (state, action) => {
    toast.success("Successfully deleted user from account");

    let newUserModalInfo = action.payload.data.filter((f)=>f._id === state.userModalInfo._id)

    return {
      ...state,
      accounts: [...action.payload.data],
      userModalInfo: newUserModalInfo[0],
    };
  });
  builder.addCase(deleteUserFromAccount.rejected, (state, action) => {
    toast.error("Error deleting user at this time.");
    return {
      ...state,
      loading: false,
    };
  });
}

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUserModalInfo: (state, action) => ({
      ...state,
      userModalInfo: action.payload,
    }),
    logoutAccount: (state, action) => ({
      accounts: [],
      userModalInfo: [],
    }),
  },
  extraReducers,
});

export const { setUserModalInfo ,logoutAccount} = accountSlice.actions;

export default accountSlice.reducer;
