### 数据结构

#### 节点

```ts
interface Node{
  id: number;
  type: string;
  name: string;
  icon: number;
  attr?: any;
  position?: {
    x: number;
    y: number;
  };
  
}
```



#### 边连接情况


| to \ from | 上（0） | 右（1） | 下（2） | 左（3） |
| :-------: | :-----: | :-----: | :-----: | :-----: |
|  上（0）  |    /    |         |  easy   |         |
|  右（1）  |         |    /    |         |  easy   |
|  下（2）  |  easy   |         |    /    |         |
|  左（3）  |         |  easy   |         |    /    |

from: （100，100）

to：（200，200）

以左上图元连接右下图元为例，from-1 ~ to-0， 控制点1由to控制，控制点2由from控制

1. 常规情况：
   - 控制点1：（150，100）
   - 控制点2：（200，150）
2. 

