const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Joi = require('@hapi/joi');
const config = require('config');

module.exports = (sequelize, Types) => {

    class User extends Types.Model {
        constructor(params) {
            super(params);
            this.schema = Joi.object().keys({
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
            console.log(this.dataValues);
            
            return {
                sucess:  result.error === null,
                result
            } 
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
        sequelize
    });

    return User;
}