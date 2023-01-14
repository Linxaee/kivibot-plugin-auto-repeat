/**
 * @description 比较两个数组内容是否完全相同
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 是否完全相同
 */
export const compareArrays = (arr1: any[], arr2: any[]) => {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].type === "image") {
            return arr1[i].file === arr2[i].file ? true : false;
        }
        if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
            return false;
        }
    }
    return true;
};

/**
 * @description 验证传入的num是否是纯数字
 * @param num 待验证数字
 */
export const validateNumber = (num: number | string) => {
    if (num === 0) return true;
    if (!num) return false;
    return !isNaN(Number(num));
};
