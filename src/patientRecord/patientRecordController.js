export const computeAge = (yearOfBirth) => {
    const dt = new Date();
    const curr_dt = dt.getFullYear();
    dt.setFullYear(yearOfBirth);
    const dob = dt.getFullYear();
    return curr_dt - dob;
}