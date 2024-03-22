const { spawn } = require('child_process');

// Run the Python script
const pythonProcess = spawn('python', ['python.py']);

// Listen for data from Python script
pythonProcess.stdout.on('data', (data) => {
  const result = JSON.parse(data.toString());
  console.log(result);
});

// Handle errors
pythonProcess.stderr.on('data', (data) => {
  console.error(`Error: ${data}`);
});

// const spawner = require('child_process').spawn;

// const data_to_pass_in = {
//     data_sent: 'Send this to python script.',
//     data_returned: undefined
// };

// console.log('Data sent to python script:', data_to_pass_in);

// const python_process = spawner('C:\\Python312\\python.exe', ['./python.py', JSON.stringify(data_to_pass_in)]);

// python_process.stdout.on('data', (data) => {
//     console.log('Data received from python script:', JSON.parse(data.toString()));
// });
