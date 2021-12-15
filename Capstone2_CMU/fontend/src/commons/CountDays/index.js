
//  tham số chuyền vào "21/2/2021"
const convertDate = value => value.trim().split('/').reverse().join('-');

export const countDate = (endDate) => {
    const start = new Date();
    const end = new Date(convertDate(endDate));
    let dayCount = 0;
    while (end > start) {
        dayCount++;
        start.setDate(start.getDate() + 1);
    }
    return dayCount;
}
