import type {
  BatchNorm1d,
  BatchNorm2d,
  Conv1d,
  Conv2d,
  Linear,
  NodeInterface,
  Relu,
  Sigmoid,
  Tanh,
  MaxPool2d,
  MaxPool1d,
  AvgPool2d,
  AdaptiveAvgPool2d,
  Dropout
} from '@/types';

export const createNode = function (
  id: number,
  x: number,
  y: number,
  name: string,
  state: number
) {
  switch (name) {
    case 'input': {
      return {
        id,
        x,
        y,
        type: 'layer',
        name,
        state
      } as NodeInterface;
    }
    case 'output': {
      return {
        id,
        x,
        y,
        type: 'layer',
        name: name,
        state
      } as NodeInterface;
    }
    case 'linear': {
      return {
        id,
        x,
        y,
        type: 'layer',
        name: name,
        state,
        attr: {
          input_size: null,
          output_size: null,
          bias: true
        }
      } as Linear;
    }
    case 'conv2d': {
      return {
        id,
        x,
        y,
        type: 'layer',
        name: name,
        state,
        attr: {
          in_channels: null,
          out_channels: null,
          kernel_size: null,
          stride: 1,
          padding: 0,
          dilation: 1,
          groups: 1,
          bias: true
        }
      } as Conv2d;
    }
    case 'conv1d': {
      return {
        id,
        x,
        y,
        type: 'layer',
        name: name,
        state,
        attr: {
          in_channels: null,
          out_channels: null,
          kernel_size: null,
          stride: 1,
          padding: 0,
          dilation: 1,
          groups: 1,
          bias: true
        }
      } as Conv1d;
    }
    case 'bn2d': {
      return {
        id,
        x,
        y,
        type: 'layer',
        name: name,
        state,
        attr: {
          num_features: null,
          eps: 1e-5,
          momentum: 0.1,
          affine: true
        }
      } as BatchNorm2d;
    }
    case 'bn1d': {
      return {
        id,
        x,
        y,
        type: 'layer',
        name: name,
        state,
        attr: {
          num_features: null,
          eps: 1e-5,
          momentum: 0.1,
          affine: true
        }
      } as BatchNorm1d;
    }
    case 'relu': {
      return {
        id,
        x,
        y,
        type: 'layer',
        name: name,
        state,
        attr: {
          inplace: false
        }
      } as Relu;
    }
    case 'sigmoid': {
      return {
        id,
        x,
        y,
        type: 'layer',
        name: name,
        state,
        attr: {}
      } as Sigmoid;
    }
    case 'tanh': {
      return {
        id,
        x,
        y,
        type: 'layer',
        name: name,
        state,
        attr: {}
      } as Tanh;
    }
    case 'maxpool2d': {
      return {
        id,
        x,
        y,
        type: 'layer',
        name: name,
        state,
        attr: {
          kernel_size: null,
          stride: null,
          padding: 0,
          dilation: 1,
          return_indices: false,
          ceil_mode: false
        }
      } as MaxPool2d;
    }
    case 'maxpool1d': {
      return {
        id,
        x,
        y,
        type: 'layer',
        name: name,
        state,
        attr: {
          kernel_size: null,
          stride: null,
          padding: 0,
          dilation: 1,
          return_indices: false,
          ceil_mode: false
        }
      } as MaxPool1d;
    }
    case 'avgpool2d': {
      return {
        id,
        x,
        y,
        type: 'layer',
        name: name,
        state,
        attr: {
          kernel_size: null,
          stride: null,
          padding: 0,
          ceil_mode: false,
          count_include_pad: true
        }
      } as AvgPool2d;
    }
    case 'adaptiveavgpool2d': {
      return {
        id,
        x,
        y,
        type: 'layer',
        name: name,
        state,
        attr: {
          outsize: null
        }
      } as AdaptiveAvgPool2d;
    }
    case 'dropout': {
      return {
        id,
        x,
        y,
        type: 'layer',
        name: name,
        state,
        attr: {
          p: 0.5,
          inplace: false
        }
      } as Dropout;
    }
    case 'op_view': {
      return {
        id,
        x,
        y,
        type: 'option',
        name,
        state,
        attr: {
          h: null,
          w: null
        }
      }
    }
    case 'op_add': {
      return {
        id,
        x,
        y,
        type: 'option',
        name,
        state
      }
    }
    case 'op_diff': {
      return {
        id,
        x,
        y,
        type: 'option',
        name,
        state
      }
    }case 'op_mul': {
      return {
        id,
        x,
        y,
        type: 'option',
        name,
        state
      }
    }
  }
};
