
const Joi = require('@hapi/joi');
module.exports = (sequelize, Types) => {

    class OptionPush extends Types.Model {
        constructor(...params) {
            super(...params);
            this.schema = Joi.object().options({ abortEarly: false }).keys({
                id: Joi.any().allow(Number, null),
                push_entry_id: Joi.any().allow(Number, null),
                option_id: Joi.any().allow(Number, null),
                value: Joi.boolean()
            }) 
        }
        validate() {
            const result = Joi.validate(this.dataValues, this.schema);
            return {
                success:  result.error === null,
                result
            } 
        }
        static associate({ OptionPush, Option, PushEntry }) {
            OptionPush.belongsTo(Option);
            OptionPush.belongsTo(PushEntry)
        }
    }
    OptionPush.init({
        push_entry_id: {
            type: Types.INTEGER,
            allowNull: false
        },
        option_id: {
            type: Types.INTEGER,
            allowNull: false
        },
        value: {
            type: Types.BOOLEAN,
            allowNull: false
        }
    }, {
        timestamps: false,
        schema: 'pushmo',
        tableName: 'option_push',
        underscored: true,
        sequelize
    });

    return OptionPush;
}