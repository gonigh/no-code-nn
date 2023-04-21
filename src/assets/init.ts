export default {
    nodeInfo: [
        {
            type: 'Layer',
            nodeList: [
                {
                    type: 'layer',
                    name: 'input',
                    attrs: {},
                    icon: 0
                },
                {
                    type: 'layer',
                    name: 'output',
                    attrs: {},
                    icon: 1
                },
                {
                    type: 'layer',
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
                    type: 'layer',
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
                    type: 'layer',
                    name: 'bn2d',
                    attrs: {
                        num_features: 0
                    },
                    icon: 4
                },
                {
                    type: 'layer',
                    name: 'bn1d',
                    attrs: {
                        num_features: 0
                    },
                    icon: 4
                },
                {
                    type: 'activation',
                    name: 'relu',
                    attrs: {},
                    icon: 5
                },
                {
                    type: 'activation',
                    name: 'sigmoid',
                    attrs: {},
                    icon: 5
                },
                {
                    type: 'activation',
                    name: 'tanh',
                    attrs: {},
                    icon: 5
                },
                {
                    type: 'layer',
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
                    type: 'layer',
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
                    type: 'layer',
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
                    type: 'layer',
                    name: 'adaptiveavgpool2d',
                    attrs: {},
                    icon: 6
                },
                {
                    type: 'layer',
                    name: 'dropout',
                    attrs: {
                        p: 0
                    },
                    icon: 7
                },
                {
                    type: 'layer',
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
                    type: 'option',
                    name: 'op_add',
                    icon: 9
                },
                {
                    type: 'option',
                    name: 'op_mul',
                    icon: 9
                },
                {
                    type: 'option',
                    name: 'op_diff',
                    icon: 9
                },{
                    type: 'option',
                    name: 'op_view',
                    icon: 9
                }
            ]
        }, {
            type: 'Model',
            nodeList: [
                {
                    type: 'model',
                    name: 'CNN',
                    icon: 2
                },
                {
                    type: 'model',
                    name: 'Linear',
                    icon: 2
                }
            ]
        }
    ],
    modelInfo: [{
        id: 1,
        name: 'CNN',
        nodeList: [
            {
                "id": 1,
                "type": "layer",
                "name": "conv2d",
                "attr": {
                    "in_channels": 1,
                    "out_channels": 32,
                    "kernel_size": 3
                }
            }, {
                "id": 2,
                "type": "activation",
                "name": "relu"
            }, {
                "id": 3,
                "type": "layer",
                "name": "conv2d",
                "attr": {
                    "in_channels": 32,
                    "out_channels": 64,
                    "kernel_size": 3
                }
            }, {
                "id": 4,
                "type": "activation",
                "name": "relu"
            }, {
                "id": 5,
                "type": "layer",
                "name": "conv2d",
                "attr": {
                    "in_channels": 64,
                    "out_channels": 64,
                    "kernel_size": 3
                }
            }, {
                "id": 6,
                "type": "activation",
                "name": "relu"
            }, {
                "id": 7,
                "type": "layer",
                "name": "maxpool2d",
                "attr": {
                    "kernel_size": 2,
                    "stride": 2
                }
            }, {
                "id": 8,
                "type": "layer",
                "name": "dropout",
                "attr": {
                    "p": 0.25
                }
            }, {
                "id": 9,
                "type": "option",
                "name": "op_view",
                "attr": {
                    "h": 64,
                    "w": -1
                }
            }, {
                "id": 10,
                "type": "layer",
                "name": "linear",
                "attr": {
                    "in_features": 7744,
                    "out_features": 128
                }
            }, {
                "id": 11,
                "type": "activation",
                "name": "relu"
            }, {
                "id": 12,
                "type": "layer",
                "name": "dropout",
                "attr": {
                    "p": 0.5
                }
            }, {
                "id": 13,
                "type": "layer",
                "name": "linear",
                "attr": {
                    "in_features": 128,
                    "out_features": 10
                }
            }
        ],
        edgeList: [{
            "from": 1,
            "to": 2
        }, {
            "from": 2,
            "to": 3
        }, {
            "from": 3,
            "to": 4
        }, {
            "from": 4,
            "to": 5
        }, {
            "from": 5,
            "to": 6
        }, {
            "from": 6,
            "to": 7
        }, {
            "from": 7,
            "to": 8
        }, {
            "from": 8,
            "to": 9
        }, {
            "from": 9,
            "to": 10
        }, {
            "from": 10,
            "to": 11
        }, {
            "from": 11,
            "to": 12
        }, {
            "from": 12,
            "to": 13
        }]
    }],
    iconList: [
        'input-data',
        'output-data',
        'sequence',
        'neural-network',
        'normal',
        'activate',
        'samples',
        'random',
        'linear',
        'tool'
    ]
}