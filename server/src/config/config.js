module.exports = {
    port: 8081,
<<<<<<< HEAD

    // SQLite
=======
>>>>>>> 62830604ec533e9db82bba0ac5458858ce1f4164
    db: {
        database: process.env.DB_NAME || 'nvWebblogDb',
        user: process.env.DB_User || 'root',
        password: process.env.DB_PASS || '',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            storage: './nvwebblog-db.sqlite'
        },
    },
<<<<<<< HEAD
    //MySQL
    // db:{
    //     database: process.env.DB_NAME || 'nvwebblog',
    //     user: process.env.DB_User || 'root',
    //     password: process.env.DB_PASS || '',
=======
    // db: {
    //     database: process.env.DB_NAME || 'nvwebblog',
    //     user: process.env.DB_User || 'root',
    //     password: process.env.DB_PASS || '1234',
>>>>>>> 62830604ec533e9db82bba0ac5458858ce1f4164
    //     options: {
    //         dialect: process.env.DIALECT || 'mysql',
    //         // storage: './nvwebblog-db.sqlite'
    //         host: process.env.HOST || 'localhost',
    //     },
    // },
    authentication: {
        jwtSecret: "test"
    }
}