const findFastestRun = (course, drivers) => (
  Math.min(...drivers.map(driver => (
    driver.times[course] ? Object.values(driver.times[course]).filter(e => e !== null) : []
    )).reduce((a, b) => a.concat(b), []))
);
  
const calculateMaximumTime = (course, drivers, penalty = 20) => findFastestRun(course, drivers) + penalty;

const calculateRunTotal = (course, drivers, toCount, results, penalty) => {
  if (Object.keys(results).length >= toCount) {
    let runResults = Object.values(results)
                       .map(time => time !== null ? time : calculateMaximumTime(course, drivers, penalty));
    return Object.values(runResults)
      .sort((a, b) => a - b)
      .slice(0, toCount)
      .reduce((a, b) => (a * 100 + b * 100) / 100);
  }
  return undefined;
};
  
const calculateTotal = (noOfCourses, drivers, config, results, penalty) => {
  const totals = Object.values(results)
    .filter((course, index) => course && Object.values(course).length > config[index + 1].toCount);

  if (totals.length >= noOfCourses) {
    return totals.map((course, index) => index < noOfCourses ? calculateRunTotal(index, drivers, config[index + 1].toCount, course, penalty) : 0)
      .reduce((a, b) => (a * 100 + b * 100) / 100);
  }
  return undefined;
};

export default {
  findFastestRun,
  calculateMaximumTime,
  calculateRunTotal,
  calculateTotal
}