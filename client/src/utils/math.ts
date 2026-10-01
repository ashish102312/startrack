export const calculateAverage = (numbers: number[]): number => {
    if (!numbers || numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b, 0);
    return Number((sum / numbers.length).toFixed(1));
};
