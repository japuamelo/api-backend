const Patient = require('../models/patient')
const { cpfIsValid } = require('../utils/common')

module.exports = {
    async create(req, res) {
        try {
            const body = req.body
            let patientCpf = body.physic_national
            
            if (patientCpf) {
                if (!cpfIsValid(patientCpf)) {
                  let response = { message: "Número de CPF inválido." }
                  return res.status(400).send(response)
                }
            }
            
            const patient = await Patient.create(body)
            return res.status(201).json(patient)

        } catch (error) {
            return res.status(500).json({
                error: {
                    message: 'Erro ao criar usuário.',
                    error: error.message,
                },
            })
        }
    },
    async update(req, res) {
        try {
            const {id} = req.params
            const body = req.body
            const patient = await Patient.findByIdAndUpdate(id, body, {new: true})
            if (patient) {
                return res.status(200).json(patient)
            } else {
                return res.status(404).json({
                    error: {
                        message: 'Usuário não encontrado.',
                        error: `Não foi possivel encontrar o usuário com o id ${id}.`,
                    },
                })
            }
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: 'Erro ao atualizar usuário.',
                    error: error.message,
                },
            })
        }
    },
    async delete(req, res) {
        try {
            const {id} = req.params
            const patient = await Patient.findByIdAndDelete(id)
            if (patient) {
                return res.status(204).json({})
            } else {
                return res.status(404).json({
                    error: {
                        message: 'Usuário não encontrado.',
                        error: `Não foi possivel encontrar o usuário com o id ${id}.`,
                    },
                })
            }
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: 'Erro ao deletar o usuário.',
                    error: error.message,
                },
            })
        }
    },
    async getById(req, res) {
        try {
            const {id} = req.params
            const patient = await Patient.findById(id)
            if (patient) {
                return res.status(200).json(patient)
            } else {
                return res.status(404).json({
                    error: {
                        messege: 'Usuário não existe',
                        error: `Não foi possivel encontrar o usuário com o id ${id}`,
                    },
                })
            }
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: 'Erro ao deletar o usuário.',
                    error: error.message,
                },
            })
        }
    },
}