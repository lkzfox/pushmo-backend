const Joi = require('@hapi/joi');

module.exports = (sequelize, Types) => {

    class PushEntry extends Types.Model {
        constructor(...params) {
            super(...params);
            this.schema = Joi.object().options({ abortEarly: false }).keys({
                id: Joi.any().allow(Number, null),
                user_id: Joi.number().integer().required(),
                length: Joi.number().required(),
                width: Joi.number().required(),
                exudato_id: Joi.number().integer().required(),
                skin_id: Joi.number().integer().required(),
                area_id: Joi.number().integer().required(),
                pressure_ulcer_id: Joi.number().integer().required(),
                created_at: Joi.date().required(),
                image_path: Joi.string().max(255)
            }) 
        }
        validate() {
            const result = Joi.validate(this.dataValues, this.schema);
            return {
                success:  result.error === null,
                result
            } 
        }
        static associate({ PressureUlcer, PushEntry, Area, Exudato, Skin, User }) {
            PushEntry.belongsTo(User);
            PushEntry.belongsTo(PressureUlcer);
            PushEntry.belongsTo(Area);
            PushEntry.belongsTo(Skin);
            PushEntry.belongsTo(Exudato);
        }
    }
    PushEntry.init({
        user_id: {
            type: Types.INTEGER,
            allowNull: false
        },
        length: {
            type: Types.DECIMAL,
            allowNull: false
        },
        width: {
            type: Types.DECIMAL,
            allowNull: false
        },
        exudato_id: {
            type: Types.INTEGER,
            allowNull: false
        },
        skin_id: {
            type: Types.INTEGER,
            allowNull: false
        },
        area_id: {
            type: Types.INTEGER,
            allowNull: false
        },
        pressure_ulcer_id: {
            type: Types.INTEGER,
            allowNull: false
        },
        created_at: {
            type: Types.DATE,
            allowNull: false
        },
        image_path: Types.STRING
    }, {
        timestamps: false,
        schema: 'pushmo',
        tableName: 'push_entry',
        underscored: true,
        sequelize
    });

    return PushEntry;
}