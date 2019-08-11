const Joi = require('@hapi/joi');
module.exports = (sequelize, Types) => {

    class AdditionalInfo extends Types.Model {
        constructor(...params) {
            super(...params);
            this.schema = Joi.object().options({ abortEarly: false }).keys({
                id: Joi.any().allow(Number, null),
                push_entry_id: Joi.number().integer().required(),
                used_bandage: Joi.string().max(255).empty(''),
                change_ratio: Joi.string().max(255).empty(''),
                others: Joi.string().max(255).empty('')
            }) 
        }
        validate() {
            const result = Joi.validate(this.dataValues, this.schema);
            return {
                success:  result.error === null,
                result
            } 
        }
        static associate({ AdditionalInfo, PushEntry }) {
            AdditionalInfo.belongsTo(PushEntry)
        }
    }
    AdditionalInfo.init({
        push_entry_id: {
            type: Types.INTEGER,
            allowNull: false
        },
        used_bandage: Types.STRING,
        change_ratio: Types.STRING,
        others: Types.STRING,
    }, {
        timestamps: false,
        schema: 'pushmo',
        tableName: 'additional_info',
        underscored: true,
        sequelize
    });

    return AdditionalInfo;
}