export const gogoTool={
    diffDays:function (startDate, endDate) {
        const day1 = moment(endDate).diff(startDate, 'days');
        return day1;
    }
};