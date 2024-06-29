/* eslint-disable no-console */
function jestSlowTestReporter(globalConfig, options) {
  const handleSlowTestTime = (slowestTests) => {
    let slowTestTime = 0;
    for (let i = 0; i < slowestTests.length; i++) {
      slowTestTime += slowestTests[i].duration;
    }
    return slowTestTime;
  };

  const handleAllTestTime = () => {
    let allTestTime = 0;
    for (let i = 0; i < jestSlow.slowTests.length; i++) {
      allTestTime += jestSlow.slowTests[i].duration;
    }
    return allTestTime;
  };

  const jestSlow = {
    _globalConfig: globalConfig,
    slowTests: [],
    options,
    onRunComplete: () => {
      jestSlow.slowTests.sort((a, b) => b.duration - a.duration);
      const rootPathRegex = new RegExp(`^${process.cwd()}`);

      const slowestTests = jestSlow.slowTests.slice(0, options.numTests || 10);
      const slowTestTime = handleSlowTestTime(slowestTests);
      const allTestTime = handleAllTestTime();
      const percentTime = (slowTestTime / allTestTime) * 100;

      console.log(
        `\n \x1b[35m ===> LIST OF TOP ${slowestTests.length} TEST CASES SLOWEST <=== \x1b[0m`,
      );
      console.log(`\n Test Cases || Duration || Path \n \n`);

      for (let i = 0; i < slowestTests.length; i++) {
        console.log(`****** \n`);
        const { duration } = slowestTests[i];
        const { fullName } = slowestTests[i];
        const filePath = slowestTests[i].filePath.replace(rootPathRegex, '.');
        console.log(
          `${fullName} || ${duration / 1000} seconds || ${filePath} \n`,
        );
      }

      console.log(
        `\n===> THE SLOWEST TEST CASE HAS SPENT ${
          slowTestTime / 1000
        } SECONDS, ${percentTime.toFixed(1)}% OF TOTAL TIME <===`,
      );
      console.log();
    },
    onTestResult: (test, testResult) => {
      for (let i = 0; i < testResult.testResults.length; i++) {
        jestSlow.slowTests.push({
          // ...testResult.testResults[i],
          duration: testResult.testResults[i].duration,
          fullName: testResult.testResults[i].fullName,
          filePath: testResult.testFilePath,
        });
      }
    },
  };

  return jestSlow;
}

module.exports = jestSlowTestReporter;
