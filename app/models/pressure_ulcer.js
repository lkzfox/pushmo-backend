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
                pressure_ulcer_location_id: Joi.number().integer().allow(null),
                pressure_ulcer_location_desc: Joi.string().max(255).allow(null),
                pressure_ulcer_stage_id: Joi.number().integer().allow(null),
                pressure_ulcer_stage_desc: Joi.string().max(255).allow(null),
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
            allowNull: true
        },
        pressure_ulcer_location_desc: {
            type: Types.STRING
        },
        pressure_ulcer_stage_id: {
            type: Types.INTEGER,
            allowNull: true
        },
        pressure_ulcer_stage_desc: {
            type: Types.STRING
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