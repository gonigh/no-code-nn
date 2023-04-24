import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', () => {
  return {
    lossList: [
      "L1Loss",
      "CrossEntropyLoss",
      "SmoothL1Loss",
      "MSELoss",
      "BCELoss",
      "BCEWithLogitsLoss",
      "NLLLoss",
      "NLLLoss2d",
      "KLDivLoss",
      "MarginRankingLoss",
      "MultiMarginLoss",
      "MultiLabelMarginLoss",
      "SoftMarginLoss",
      "MultiLabelSoftMarginLoss",
      "CosineEmbeddingLoss"
    ],
    optimizerList: ["Adam", "SGD", "Rprop", "Adamax", "Adagrad", "Adadelta"],
    loss: 'NLLLoss',
    optimizer: 'Adam',
    hyperParameters: {
      batchSize: 64,
      epochs: 14,
      lr: 1,
      gamma: 0.7,
      seed: 1,
      NoCUDA: false
    }
  };
});
