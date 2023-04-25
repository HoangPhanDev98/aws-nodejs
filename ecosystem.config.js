module.exports = {
  apps: [{
    name: 'test-pm2',
    append_env_to_name: true,
    script: 'dist/server.js',
    cwd: __dirname,
    instances: 4,
    autorestart: true,
    exec_mode: 'cluster',
    max_memory_restart: '1G',
    env: { // common env variable
      NODE_ENV: 'development'
    },
    env_development: { // khi deploy với option --env development
      NODE_ENV: "development",
      PORT: 3000
    },
  }],

  deploy: {
    development: {
      user: 'ec2-user',
      host: '18.183.53.170',
      ssh_options: [
        'ForwardAgent=yes',
      ],
      ref: 'origin/main',
      repo: 'git@github.com:HoangPhanDev98/aws-nodejs.git',
      path: '/var/www/html/nodejs-aws',
      'post-deploy': 'yarn install && pm2 startOrRestart ecosystem.config.js --env development',
      env: {
        NODE_ENV: 'development',
      },
    }
  }
};