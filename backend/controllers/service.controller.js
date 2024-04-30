"use strict";
const Service = require("../models/service.model")

const addNewService = async (req, res) => {
    const newService = new Service(req.body);

    newService.save()
    .then((service) => res.json(service))
    .catch(err => {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    })
};

const getAllServices = async (req, res) => {
    Service.find({})
    .then(services => {
        if(services.length == 0) res.status(404).json({message: "No services found"});
        res.json(services); // potential crash app
    })
    .catch(err => {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    })
};

const getServiceById = async (req, res) => {
    Service.findById(req.params.id)
    .then(service => {
        if(!service) res.status(404).json({message: "Cannot find service"});
        else res.json(service);
    })
    .catch(err => {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    })
}

// const getServiceByCategory = async (req, res) => {
//     Service.findOne({category: req.params.category})
//     .then(service => {
//         res.json(service);
//     })
//     .catch(err => {
//         res.status(500).json({
//             message: "Internal Server Error",
//             error: err.message
//         })
//     })
// }

const updateService = async (req, res) => {
    Service.findByIdAndUpdate(req.params.id, req.body)
    .then(service => {
        if(!service) res.status(404).json({message: "Cannot find service"});
        else res.json(service);
    })
    .catch(err => {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    })
}

const removeService = async (req, res) => {
    Service.findByIdAndDelete(req.params.id)
    .then(service => {
        if(!service) res.status(404).json({message: "Cannot find service"});
        else res.json(service);
    })
    .catch(err => {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    })
}

module.exports = {
  addNewService,
  getAllServices,
  getServiceById,
  updateService,
  removeService
};
