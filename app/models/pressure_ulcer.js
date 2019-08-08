const Joi = require('@hapi/joi');

module.exports = (sequelize, Types) => {

    class PressureUlcer extends Types.Model {
        constructor(...params) {
            super(...params);
            this.schema = Joi.object().options({ abortEarly: false }).keys({
                id: Joi.any().allow(Number, null),
                user_id: Joi.number().integer().required(),
                pacient_id: Joi.number().integer().required(),
                image_path: Joi.string().max(255).allow(null),
                pressure_ulcer_location_id: Joi.number().integer().required(),
                pressure_ulcer_location_obs: Joi.string().max(255).allow(null),
                pressure_ulcer_stage_id: Joi.number().integer().required(),
                created_at: Joi.date().required()
            }) 
        }
        validate() {
            const result = Joi.validate(this.dataValues, this.schema);
            return {
                success:  result.error === null,
                result
            } 
        }
        static associate({ PressureUlcer, User, Pacient }) {
            PressureUlcer.belongsTo(User);
            PressureUlcer.belongsTo(Pacient);
        }
    }
    PressureUlcer.init({
        user_id: {
            type: Types.INTEGER,
            allowNull: false
        },
        pacient_id: {
            type: Types.INTEGER,
            allowNull: false
        },
        image_path: {
            type: Types.INTEGER
        },
        pressure_ulcer_location_id: {
            type: Types.INTEGER,
            allowNull: false
        },
        pressure_ulcer_location_obs: {
            type: Types.STRING
        },
        pressure_ulcer_stage_id: {
            type: Types.INTEGER,
            allowNull: false
        },
        created_at: {
            type: Types.DATE,
            allowNull: false
        }
    }, {
        timestamps: false,
        schema: 'pushmo',
        tableName: 'pressure_ulcer',
        underscored: true,
        sequelize
    });

    return PressureUlcer;
}