/**
 * 引入图片函数
 */
export const getImageUrl = (name: string) => {
    return new URL(name, import.meta.url).href;
};