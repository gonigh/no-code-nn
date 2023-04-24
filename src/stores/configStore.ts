import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', () => {
  return {
    loss: [],
    optimization: [],
    hyperParameters: {
      batchSize: 64
    }
  };
});
