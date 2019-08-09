module.exports = (sequelize, Types) => {

    class Skin extends Types.Model {}
    Skin.init({
        value: Types.INTEGER,
        description: Types.STRING
    }, {
        timestamps: false,
        schema: 'pushmo',
        tableName: 'skin',
        underscored: true,
        sequelize
    });

    return Skin;
}