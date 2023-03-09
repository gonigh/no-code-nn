import { defineStore } from 'pinia';
// import { NodeType, Node } from '@/types';
export const useInitStore = defineStore('init', {
  state: () => ({
    nodeInfo: [
      {
        type: 'Layer',
        nodeList: [
          {
            type: 'input',
            name: 'input',
            attrs: {},
            icon: 0
          },
          {
            type: 'output',
            name: 'output',
            attrs: {},
            icon: 1
          },
          {
            type: 'sequence',
            name: 'sequence',
            attrs: {},
            icon: 2
          },
          {
            type: 'conv2d',
            name: 'conv2d',
            attrs: {
              in_channels: 0,
              out_channels: 0,
              kernel_size: 0,
              stride: 0,
              padding: 0,
              bias: 'false'
            },
            icon: 3
          },
          {
            type: 'conv1d',
            name: 'conv1d',
            attrs: {
              in_channels: 0,
              out_channels: 0,
              kernel_size: 0,
              stride: 0,
              padding: 0,
              bias: 'false'
            },
            icon: 3
          },
          {
            type: 'bn2d',
            name: 'bn2d',
            attrs: {
              num_features: 0
            },
            icon: 4
          },
          {
            type: 'bn1d',
            name: 'bn1d',
            attrs: {
              num_features: 0
            },
            icon: 4
          },
          {
            type: 'relu',
            name: 'relu',
            attrs: {},
            icon: 5
          },
          {
            type: 'sigmoid',
            name: 'sigmoid',
            attrs: {},
            icon: 5
          },
          {
            type: 'tanh',
            name: 'tanh',
            attrs: {},
            icon: 5
          },
          {
            type: 'maxpool2d',
            name: 'maxpool2d',
            attrs: {
              kernel_size: 0,
              stride: 0,
              padding: 0,
              return_indices: 'false',
              ceil_mode: 'false'
            },
            icon: 6
          },
          {
            type: 'maxpool1d',
            name: 'maxpool1d',
            attrs: {
              kernel_size: 0,
              stride: 0,
              padding: 0,
              return_indices: 'false',
              ceil_mode: 'false'
            },
            icon: 6
          },
          {
            type: 'avgpool2d',
            name: 'avgpool2d',
            attrs: {
              kernel_size: 0,
              stride: 0,
              padding: 0,
              ceil_mode: 'false'
            },
            icon: 6
          },
          {
            type: 'adaptiveavgpool2d',
            name: 'adaptiveavgpool2d',
            attrs: {},
            icon: 6
          },
          {
            type: 'dropout',
            name: 'dropout',
            attrs: {
              p: 0
            },
            icon: 7
          },
          {
            type: 'linear',
            name: 'linear',
            attrs: {
              in_features: 0,
              out_features: 0,
              bias: 'false'
            },
            icon: 8
          }
        ]
      },
      {
        type: 'Option',
        nodeList: [
          {
            type: 'Option',
            name: 'add',
            icon: 9
          },
          {
            type: 'Option',
            name: 'mul',
            icon: 9
          },
          {
            type: 'Option',
            name: 'diff',
            icon: 9
          }
        ]
      }
    ]
  })
});
