module.exports = (sequelize, Types) => {

    class Feature extends Types.Model {
        static associate({ Option, Feature }) {
            Feature.hasMany(Option);
        }}
    Feature.init({
        description: Types.STRING
    }, {
        timestamps: false,
        schema: 'pushmo',
        tableName: 'feature',
        underscored: true,
        sequelize
    });

    return Feature;
}