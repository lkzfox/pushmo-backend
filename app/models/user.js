const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Joi = require('@hapi/joi');
const config = require('config');

module.exports = (sequelize, Types) => {

    class User extends Types.Model {
        constructor(...params) {
            super(...params);
            this.schema = Joi.object().options({ abortEarly: false }).keys({
                id: Joi.any().allow(Number, null),
                name: Joi.string().min(3).max(50).required(),
                email: Joi.string().email().max(50).required(),
                password: Joi.string().min(6).required()
            }) 
        }
        generateToken() {
            return jwt.sign(_.pick(this, ['id', 'name', 'email']), config.get('jwtKey'))
        }
        validate() {
            const result = Joi.validate(this.dataValues, this.schema);            
            return {
                success:  result.error === null,
                result
            } 
        }
        static associate({ User, Pacient, Background }) {
            User.hasMany(Pacient);
            User.hasMany(Background);
        }
    }
    User.init({
        name: {
            type: Types.STRING,
            allowNull: false
        },
        email: {
            type: Types.STRING,
            allowNull: false
        },
        password: {
            type: Types.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        schema: 'pushmo',
        tableName: 'users',
        underscored: true,
        sequelize
    });

    return User;
}