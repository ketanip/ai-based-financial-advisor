const humanizeNumber = (num: number) => {
    // Convert the number to a string
    const numStr = num.toFixed(2);

    // Use a regular expression to add commas as thousand separators
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export {
    humanizeNumber,
};