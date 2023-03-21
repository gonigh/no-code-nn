import type { Rect } from "@/utils/drawRect";

export interface NodeInterface {
  id: number;
  type: string;
  rect?: Rect;
  x: number;
  y: number;
}

export interface EdgeInterface {
  id: number;
  from: number;
  fromType: number;
  to: number;
  toType: number;
}

export interface Linear extends NodeInerface {
  attr: {
    input_size: number | null;
    output_size: number | null;
    bias?: boolean;
  }
}

export interface Conv2d extends NodeInterface {
  attr: {
    in_channels: number | null;
    out_channels: number | null;
    kernel_size: number | null;
    stride?: number;
    padding?: number;
    dilation?: number;
    groups?: number;
    bias?: boolean;
  }
}

export interface Conv1d extends NodeInterface {
  attr: {
    in_channels: number | null;
    out_channels: number | null;
    kernel_size: number | null;
    stride?: number;
    padding?: number;
    dilation?: number;
    groups?: number;
    bias?: boolean;
  }
}

export interface BatchNorm2d extends NodeInterface {
  attr: {
    num_features: number | null;
    eps?: number;
    momentum?: number;
    affine?: boolean;
  }
}

export interface BatchNorm1d extends NodeInterface {
  attr: {
    num_features: number | null;
    eps?: number;
    momentum?: number;
    affine?: boolean;
  }
}

export interface Relu extends NodeInterface {
  attr: {
    inplace?: boolean;
  }
}

export interface Sigmoid extends NodeInterface {
  attr: {}
}

export interface Tanh extends NodeInterface {
  attr: {}
}

export interface MaxPool2d extends NodeInterface {
  attr: {
    kernel_size: number | null;
    stride: number | null;
    padding?: number;
    dilation?: number;
    return_indices?: boolean;
    ceil_mode?: boolean;
  }
}

export interface MaxPool1d extends NodeInterface {
  attr: {
    kernel_size: number | null;
    stride: number | null;
    padding?: number;
    dilation?: number;
    return_indices?: boolean;
    ceil_mode?: boolean;
  }
}

export interface AvgPool2d extends NodeInterface {
  attr: {
    kernel_size: number | null;
    stride?: number | null;
    padding?: number;
    ceil_mode?: boolean;
    count_include_pad?: boolean;
    divisor_override?: number;
  }
}

export interface AdaptiveAvgPool2d extends NodeInterface {
  attr: {
    outsize: number | number[] | null
  }
}

export interface Dropout extends NodeInterface {
  attr: {
    p?: number;
    inplace?: boolean;
  }
}
