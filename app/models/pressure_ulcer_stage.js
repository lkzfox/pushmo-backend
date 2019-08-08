module.exports = (sequelize, Types) => {

    class PressureUlcerStage extends Types.Model {
        static associate({ PressureUlcer, PressureUlcerStage }) {
            PressureUlcer.belongsTo(PressureUlcerStage);
        }
    }
    PressureUlcerStage.init({
        initials: Types.STRING,
        description: Types.STRING
    }, {
        timestamps: false,
        schema: 'pushmo',
        tableName: 'pressure_ulcer_stage',
        underscored: true,
        sequelize
    });

    return PressureUlcerStage;
}