module.exports = (sequelize, DataTypes) => {
    const Write = sequelize.define('Write', {
        title: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.STRING,
        content: DataTypes.TEXT,
       
        category: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Write
}