module.exports = (sequelize, Types) => {

    class PressureUlcerLocation extends Types.Model {
        static associate({ PressureUlcer, PressureUlcerLocation }) {
            PressureUlcer.belongsTo(PressureUlcerLocation);
        }
    }
    PressureUlcerLocation.init({
        initials: Types.STRING,
        description: Types.STRING
    }, {
        timestamps: false,
        schema: 'pushmo',
        tableName: 'pressure_ulcer_location',
        underscored: true,
        sequelize
    });

    return PressureUlcerLocation;
}