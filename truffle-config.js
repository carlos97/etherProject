module.exports = {

  networks: {
    development: {
     host: "192.168.1.100",   
     port: 7545,            
     network_id: "*",       
    },
  },

  mocha: {
  },
  compilers: {
    solc: {
      version: "0.8.6",   
    }
  },
  db: {
    enabled: false
  }
};
