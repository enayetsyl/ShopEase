import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
}

interface ChatState {
  conversations: ChatMessage[];
}

const initialState: ChatState = {
  conversations: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<ChatMessage>) {
      // Add a new message to the conversation array
      state.conversations.push(action.payload);
    },
    clearConversations(state) {
      // Clear all chat conversations
      state.conversations = [];
    },
  },
});

export const { addMessage, clearConversations } = chatSlice.actions;
export default chatSlice.reducer;
