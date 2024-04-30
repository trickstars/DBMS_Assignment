const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serviceSchema = new Schema({
    category: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
        unique: true
    },
    suit_for_desc: String,
    advantage_desc: String,
    daily_price: {
        type: Number,
        required: true,
    },
    weekly_price: {
        type: Number,
        required: true,
    },
    monthly_price: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Service', serviceSchema)

// allowedFields = ['type', 'suit_for_desc', 'advantage_desc', 'daily_price', 'weekly_price', 'monthly_price'];

// const services = [
//     {
//         type: 1,
//         suit_for_desc: '',
//         advantage_desc: '',
//         daily_price: 2000,
//         weekly_price: 14000,
//         monthly_price: 45000
//     },
//     {
//         type: 2,
//         suit_for_desc: '',
//         advantage_desc: '',
//         daily_price: 10000,
//         weekly_price: 70000,
//         monthly_price: 225000
//     },
//     {
//         type: 3,
//         suit_for_desc: '',
//         advantage_desc: '',
//         daily_price: 20000,
//         weekly_price: 140000,
//         monthly_price: 450000
//     },
//     {
//         type: 4,
//         suit_for_desc: '',
//         advantage_desc: '',
//         daily_price: 40000,
//         weekly_price: 280000,
//         monthly_price: 900000
//     },
//     {
//         type: 5,
//         suit_for_desc: '',
//         advantage_desc: '',
//         daily_price: 80000,
//         weekly_price: 560000,
//         monthly_price: 1800000
//     },
// ];

// class Service {
//     static instance = undefined;

//     constructor() {
//         if (Service.instance) return Service.instance;
//         else {
//             Service.instance = new Service();
//             return this;
//         }
//     }

//     async create(newService) {
//         const {type, daily_price, weekly_price, monthly_price} = newService;
//         if (type === undefined)
//             throw new Error("Field 'type' is required");
//         if (daily_price === undefined)
//             throw new Error("Field 'daily_price' is required");
//         if (weekly_price === undefined)
//             throw new Error("Field 'weekly_price' is required");
//         if (monthly_price === undefined)
//             throw new Error("Field 'monthly_price' is required");

//         (validate_service(newService));

//         services.push(newService);
//         return newService;
//     }

//     getAll() {
//         return Promise.resolve(services);
//     }

//     getByType(type) {
//         for (const service of services) {
//             if (service.type === type)  return Promise.resolve(service);
//         }
//         return Promise.reject(new Error("Cannot find service with type '" + type + "'"));
//     }

//     async update(type, updateInfo) {
//         validate(updateInfo)

//         services.forEach(service => {
//             if (service.type === type) {
//                 service = {...service, ...updateInfo};
//                 return service;
//             }
//         });

//         throw new Error("Cannot find service with type '" + type + "'");
//     }

//     delete(type) {
//         const indexToRemove = services.findIndex(service => service.type === type);
//         if(indexToRemove !== -1) {
//             const removedService = Promise.resolve(services[indexToRemove]);
//             services.splice(indexToRemove, 1);
//             return removedService;
//         }
//         else return Promise.reject(new Error("Cannot find service with type '" + type + "'"));
//     }
// }

// validate_service = async (service) => {
//     const allFields = Object.keys(service);
//     if(!allFields.every(field => allowedFields.includes(field))) {
//         throw new Error("Field '" + field + "' is not allowed");
//     }

//     service.type = Number((type));
//     service.suit_for_desc = suit_for_desc.toString();
//     service.advantage_desc = advantage_desc.toString();
//     service.daily_price = Number(daily_price);
//     service.weekly_price = Number(weekly_price);
//     service.monthly_price = Number(monthly_price);

//     const {type, suit_for_desc, advantage_desc, daily_price, weekly_price, monthly_price} = service;

//     if (type !== undefined && typeof type !== 'number')
//         return Promise.reject(new Error("Cannot cast 'type' to number"));
//     if (suit_for_desc !== undefined && typeof suit_for_desc !== 'string')
//         return Promise.reject(new Error("Cannot cast 'sui_for_desc' to string"));
//     if (advantage_desc !== undefined && typeof advantage_desc !== 'string')
//         return Promise.reject(new Error("Cannot cast 'advantage_desc' to string"));
//     if (daily_price !== undefined && typeof daily_price !== 'number')
//         return Promise.reject(new Error("Cannot cast 'daily_price' to number"));
//     if (weekly_price !== undefined && typeof weekly_price !== 'number')
//         return Promise.reject(new Error("Cannot cast 'weekly_price' to number"));
//     if (monthly_price !== undefined && typeof monthly_price !== 'number')
//         return Promise.reject(new Error("Cannot cast 'monthly_price' to number"));

//     return Promise.resolve('Success validation');
// }

// module.exports = Service;