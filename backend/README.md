## How to run
- Go to backend folder
- Run redis configured on docker (if you don't have an instance running)
- Install development dependencies (yarn install -D or npm install -D)
- run yarn dev:server or npm run dev:server to start the API
- run yarn dev:worker or npm run dev:worker to start the worker

## Ideal workflow
- Upload data to REST API
- Save locally to server and add to job
- On the job, copy from temporary file location to unity project
- If unity is not already open, start new instance
- (For now) unity will pull jobs and send a request after finish it
- After finishing the job, unity will send it back to server
- The server finishes the job