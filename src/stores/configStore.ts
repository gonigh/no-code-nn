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
    optimizer: 'Adadelta',
    hyperParameters: {
      batchSize: 64 as number,
      epochs: 14 as number,
      lr: 1.0 as number,
      gamma: 0.7 as number,
      seed: 1.0 as number,
      NoCUDA: false as boolean
    }
  };
});
