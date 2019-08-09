module.exports = (sequelize, Types) => {

    class Exudato extends Types.Model {}
    Exudato.init({
        value: Types.INTEGER,
        description: Types.STRING
    }, {
        timestamps: false,
        schema: 'pushmo',
        tableName: 'exudato',
        underscored: true,
        sequelize
    });

    return Exudato;
}