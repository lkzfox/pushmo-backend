module.exports = (sequelize, Types) => {

    class Area extends Types.Model {}
    Area.init({
        min: Types.DECIMAL,
        max: Types.DECIMAL,
        value: Types.INTEGER
    }, {
        timestamps: false,
        schema: 'pushmo',
        tableName: 'area',
        underscored: true,
        sequelize
    });

    return Area;
}