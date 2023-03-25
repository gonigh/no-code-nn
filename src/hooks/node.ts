import type { BatchNorm1d, BatchNorm2d, Conv1d, Conv2d, Linear, NodeInterface, Relu, Sigmoid, Tanh, MaxPool2d, MaxPool1d, AvgPool2d, AdaptiveAvgPool2d, Dropout } from "@/types";

export const createNode = function (id: number, x: number, y: number, type: string) {
    switch (type) {
        case 'input': {
            return {
                id, x, y, type
            } as NodeInterface;
        }
        case 'output': {
            return {
                id, x, y, type
            } as NodeInterface;
        }
        case 'linear': {
            return {
                id, x, y, type, attr: {
                    input_size: null, output_size: null, bias: true
                }
            } as Linear;
        }
        case 'conv2d': {
            return {
                id, x, y, type, attr: {
                    in_channels: null, out_channels: null, kernel_size: null, stride: 1, padding: 0, dilation: 1, groups: 1, bias: true,
                }
            } as Conv2d;
        }
        case 'conv1d': {
            return {
                id, x, y, type, attr: {
                    in_channels: null, out_channels: null, kernel_size: null, stride: 1, padding: 0, dilation: 1, groups: 1, bias: true,
                }
            } as Conv1d;
        }
        case 'bn2d': {
            return {
                id, x, y, type, attr: {
                    num_features: null, eps: 1e-05, momentum: 0.1, affine: true
                }
            } as BatchNorm2d;
        }
        case 'bn1d': {
            return {
                id, x, y, type, attr: {
                    num_features: null, eps: 1e-05, momentum: 0.1, affine: true
                }
            } as BatchNorm1d;
        }
        case 'relu': {
            return {
                id, x, y, type, attr: {
                    inplace: false
                }
            } as Relu;
        }
        case 'sigmoid': {
            return {
                id, x, y, type, attr: {}
            } as Sigmoid;
        }
        case 'tanh': {
            return {
                id, x, y, type, attr: {}
            } as Tanh;
        }
        case 'maxpool2d': {
            return {
                id, x, y, type, attr: {
                    kernel_size: null, stride: null, padding: 0, dilation: 1, return_indices: false, ceil_mode: false
                }
            } as MaxPool2d;
        }
        case 'maxpool1d': {
            return {
                id, x, y, type, attr: {
                    kernel_size: null, stride: null, padding: 0, dilation: 1, return_indices: false, ceil_mode: false
                }
            } as MaxPool1d;
        }
        case 'avgpool2d': {
            return {
                id, x, y, type, attr: {
                    kernel_size: null, stride: null, padding: 0, ceil_mode: false, count_include_pad: true
                }
            } as AvgPool2d;
        }
        case 'adaptiveavgpool2d': {
            return {
                id, x, y, type, attr: {
                    outsize: null
                }
            } as AdaptiveAvgPool2d;
        }
        case 'dropout': {
            return {
                id, x, y, type, attr: {
                    p: 0.5, inplace: false
                }
            } as Dropout;
        }

    }
}