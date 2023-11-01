const { executeAutomationAtRandomIntervals } = require("./src/server");

return executeAutomationAtRandomIntervals()
.then(result=>{
    console.log('OK......')
})
.catch(err=>{
    console.log(err);
    console.log('FIXING.....')
})