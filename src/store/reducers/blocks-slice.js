import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receiptBlocks: [],
  selectedGroupIds: {},
  selectedIngredientIds: [],
};

export const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock(state, action) {
      state.receiptBlocks.push({
        name: action.payload,
        id: Date.now(),
        groups: [],
      });
    },
    removeBlock(state, action) {
      const index = state.receiptBlocks.findIndex(
        ({ id }) => id === action.payload
      );
      if (index > -1) {
        state.receiptBlocks.splice(index, 1);
      }
    },
    addGroup(state, action) {
      const { blockId, groupName } = action.payload;
      const block = state.receiptBlocks.find(
        (receipt) => receipt.id === blockId
      );

      if (block) {
        block.groups.push({
          id: Date.now(),
          name: groupName,
        });
      }
    },
    updateGroupName(state, action) {
      const { blockId, groupId, groupName } = action.payload;
      const block = state.receiptBlocks.find(
        (receipt) => receipt.id === blockId
      );
      const blockIndex = state.receiptBlocks.indexOf(block);

      if (blockIndex === -1) return;

      const group = state.receiptBlocks[blockIndex].groups.find(
        (group) => group.id === groupId
      );
      group.name = groupName;
    },

    selectGroup(state, action) {
      const { blockId, groupId } = action.payload;
      // console.log({'state.selectedGroupIds': state.selectedGroupIds, state: JSON.stringify(state)})
      if (state.selectedGroupIds[blockId]) {
        state.selectedGroupIds[blockId].push(groupId);
      } else {
        console.log({
          "firstSelection || state.selectedGroupIds": JSON.stringify(
            state.selectedGroupIds
          ),
        });
        state.selectedGroupIds[blockId] = [groupId];
      }
      console.log({
        "state.selectedGroupIds": JSON.stringify(state.selectedGroupIds),
      });
    },

    unSelectGroup(state, action) {
      const { blockId, groupId } = action.payload;
      const index = state.selectedGroupIds[blockId]?.indexOf(groupId);
      if (index > -1) {
        state.selectedGroupIds[blockId].splice(index, 1);
      }
    },

    selectAllGroups(state, action) {
      const { blockId } = action.payload;
      const block = state.receiptBlocks.find(
        (receipt) => receipt.id === blockId
      );
      state.selectedGroupIds[blockId] = [];
      block.groups.forEach(({ id }) =>
        state.selectedGroupIds[blockId].push(id)
      );
    },

    resetGroupSelection(state, action) {
      const { blockId } = action.payload;
      delete state.selectedGroupIds[blockId];
    },

    setWholeState(state, action) {
      Object.keys(state).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { reducer } = blocksSlice;
