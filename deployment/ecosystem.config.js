module.exports = {
  apps: [{
    name: 'idopress-dev',
    script: 'npm',
    args: 'run dev',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    log_file: './logs/idopress.log',
    error_file: './logs/idopress-error.log',
    out_file: './logs/idopress-out.log',
    max_restarts: 3,
    restart_delay: 4000,
    instances: 1,
    autorestart: true,
    watch: false
  }]
};
