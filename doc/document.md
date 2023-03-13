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

