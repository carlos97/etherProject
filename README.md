
# App para control del estado en un proceso de distribución mediante un contrato inteligente en ethereum 



## Ganache

Instalar ganache https://trufflesuite.com/ganache/

## Instalación del proyecto

Instalación de dependencias

```bash
    npm install -g @truffle/contract
    npm install 
```

Configurar truffle.config.js con la dirección RCP de Ganache

![App Screenshot](https://raw.githubusercontent.com/carlos97/etherProject/main/img1.png)


```bash
    networks: {
    development: {
     host: "192.168.1.100",   
     port: 7545,            
     network_id: "*",       
    },
  }
```

Desplegar contratos
```bash
    truffle deploy
```

## Ejecución del cliente


```bash
    npm run dev
```
