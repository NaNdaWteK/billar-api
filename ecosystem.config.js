module.exports = {
  apps: [
    {
      name: 'api-instance-1',
      script: 'serve.cjs',
      args: '--port 8000',
      env: {
        RESTAPI_PORT: 8000,
      },
      exec_mode: 'cluster',
      // instances: 2,
    },
    {
      name: 'api-instance-2',
      script: 'serve.cjs',
      args: '--port 8001',
      env: {
        RESTAPI_PORT: 8001,
      },
      exec_mode: 'cluster',
      // instances: 2,
    },
  ],
};
