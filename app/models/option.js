module.exports = (sequelize, Types) => {

    class Option extends Types.Model {
        static associate({ Option, Feature }) {
            Option.belongsTo(Feature);
        }
    }
    Option.init({
        description: Types.STRING,
        feature_id: Types.INTEGER
    }, {
        timestamps: false,
        schema: 'pushmo',
        tableName: 'option',
        underscored: true,
        sequelize
    });

    return Option;
}