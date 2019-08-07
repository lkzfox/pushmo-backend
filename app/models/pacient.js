const _ = require('lodash');
const Joi = require('@hapi/joi');

module.exports = (sequelize, Types) => {

    class Pacient extends Types.Model {
        constructor(...params) {
            super(...params);
            this.schema = Joi.object().keys({
                id: Joi.any().allow(Number, null),
                user_id: Joi.any().allow(Number, null),
                name: Joi.string().min(3).max(50).required(),
                born_at: Joi.date().min('01-01-1920').required(),
                cpf: Joi.string().min(11).max(11).required(),
                address: Joi.string().min(6)
            }) 
        }
        validate() {
            const result = Joi.validate(this.dataValues, this.schema);
            return {
                sucess:  result.error === null,
                result
            } 
        }
        static associate({ Pacient, User }) {
            Pacient.belongsTo(User);
        }
    }
    Pacient.init({
        name: {
            type: Types.STRING,
            allowNull: false
        },
        born_at: {
            type: Types.STRING,
            allowNull: false
        },
        cpf: {
            type: Types.STRING,
            allowNull: false
        },
        address: {
            type: Types.STRING
        },
        user_id: {
            type: Types.INTEGER
        }
    }, {
        timestamps: false,
        schema: 'pushmo',
        tableName: 'pacient',
        underscored: true,
        sequelize
    });

    return Pacient;
}