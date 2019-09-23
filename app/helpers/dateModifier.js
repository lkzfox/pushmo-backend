module.exports = {
    utcDate: (date) => {
        let nDate = new Date(date);
        nDate.getTimezoneOffset();
        nDate.setTime(nDate.getTime());
        return nDate;
    }
}