const Joi = require('@hapi/joi');

module.exports = (sequelize, Types) => {

    class Background extends Types.Model {
        constructor(...params) {
            super(...params);
            this.schema = Joi.object().options({ abortEarly: false }).keys({
                id: Joi.any().allow(Number, null),
                user_id: Joi.number().integer().required(),
                pacient_id: Joi.number().integer().required(),
                current_medical_care: Joi.boolean().required(),
                current_medical_care_obs: Joi.string().max(255).allow(null),
                allergic: Joi.boolean().required(),
                allergic_obs: Joi.string().max(255).allow(null),
                pacemaker: Joi.boolean().required(),
                cardiac_change: Joi.boolean().required(),
                cardiac_change_obs: Joi.string().max(255).allow(null),
                arterial_change: Joi.boolean().required(),
                arterial_change_obs: Joi.string().max(255).allow(null),
                circulatory_disturbance: Joi.boolean().required(),
                circulatory_disturbance_obs: Joi.string().max(255).allow(null),
                kidney_distrubance: Joi.boolean().required(),
                kidney_distrubance_obs: Joi.string().max(255).allow(null),
                hormony_disturbance: Joi.boolean().required(),
                hormony_disturbance_obs: Joi.string().max(255).allow(null),
                gastrointestinal_disturbance: Joi.boolean().required(),
                gastrointestinal_disturbance_obs: Joi.string().max(255).allow(null),
                convulsion: Joi.boolean().required(),
                convulsion_obs: Joi.string().max(255).allow(null),
                psychological_changes: Joi.boolean().required(),
                psychological_changes_obs: Joi.string().max(255).allow(null),
                stress: Joi.boolean().required(),
                stress_obs: Joi.string().max(255).allow(null),
                oncological_background: Joi.boolean().required(),
                oncological_background_obs: Joi.string().max(255).allow(null),
                diabetes: Joi.boolean().required(),
                diabetes_obs: Joi.string().max(255).allow(null),
                disease: Joi.boolean().required(),
                disease_obs: Joi.string().max(255).allow(null)
            }) 
        }
        validate() {
            const result = Joi.validate(this.dataValues, this.schema);
            return {
                success:  result.error === null,
                result
            } 
        }
        static associate({ Background, User, Pacient }) {
            Background.belongsTo(User);
            Background.belongsTo(Pacient);
        }
    }
    Background.init({
        user_id: {
            type: Types.INTEGER,
            allowNull: false
        },
        pacient_id: {
            type: Types.INTEGER,
            allowNull: false
        },
        current_medical_care: {
            type: Types.BOOLEAN,
            allowNull: false
        },
        current_medical_care_obs: {
            type: Types.STRING
        },
        allergic: {
            type: Types.BOOLEAN,
            allowNull: false
        },
        allergic_obs: {
            type: Types.STRING
        },
        pacemaker: {
            type: Types.BOOLEAN,
            allowNull: false
        },
        cardiac_change: {
            type: Types.BOOLEAN,
            allowNull: false
        },
        cardiac_change_obs: {
            type: Types.STRING
        },
        arterial_change: {
            type: Types.BOOLEAN,
            allowNull: false
        },
        arterial_change_obs: {
            type: Types.STRING
        },
        circulatory_disturbance: {
            type: Types.BOOLEAN,
            allowNull: false
        },
        circulatory_disturbance_obs: {
            type: Types.STRING
        },
        kidney_distrubance: {
            type: Types.BOOLEAN,
            allowNull: false
        },
        kidney_distrubance_obs: {
            type: Types.STRING
        },
        hormony_disturbance: {
            type: Types.BOOLEAN,
            allowNull: false
        },
        hormony_disturbance_obs: {
            type: Types.STRING
        },
        gastrointestinal_disturbance: {
            type: Types.BOOLEAN,
            allowNull: false
        },
        gastrointestinal_disturbance_obs: {
            type: Types.STRING
        },
        convulsion: {
            type: Types.BOOLEAN,
            allowNull: false
        },
        convulsion_obs: {
            type: Types.STRING
        },
        psychological_changes: {
            type: Types.BOOLEAN,
            allowNull: false
        },
        psychological_changes_obs: {
            type: Types.STRING
        },
        stress: {
            type: Types.BOOLEAN,
            allowNull: false
        },
        stress_obs: {
            type: Types.STRING
        },
        oncological_background: {
            type: Types.BOOLEAN,
            allowNull: false
        },
        oncological_background_obs: {
            type: Types.STRING
        },
        diabetes: {
            type: Types.BOOLEAN,
            allowNull: false
        },
        diabetes_obs: {
            type: Types.STRING
        },
        disease: {
            type: Types.BOOLEAN,
            allowNull: false
        },
        disease_obs: {
            type: Types.STRING
        }
    }, {
        timestamps: false,
        schema: 'pushmo',
        tableName: 'background',
        underscored: true,
        sequelize
    });

    return Background;
}