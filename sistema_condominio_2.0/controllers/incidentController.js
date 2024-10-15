import IncidentModel from '../models/Incident.js';

//CRIANDO UM INCIDENTE
export const createIncident = async(req, res) => {
    try {

        const { title, description } = req.body;
        const incident = await IncidentModel({
            title,
            description,
            reportedBy: req.user._id
        })
        
        await incident.save();
        return res.status(201).json(incident);
        
    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}

//RETORNA TODOS OS INCIDENTES
export const getAllIncidents = async(req, res) => {
    try {

        const incident = await IncidentModel.find().populate('reportedBy', 'name email apto');
        return res.status(200).json(incident);
        
    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde.'] })
    }
}

//RETORNA INCIDENTE POR MORADOR
export const getMyIncident = async(req, res) => {
    try {
        
        const incidents = await IncidentModel.find({ reportedBy: req.user._id });
        return res.status(200).json(incidents);

    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}

//ATUALIZA O STATUS DO INCIDENTE
export const updateIncident = async(req, res) => {
    try {

        const { status } = req.body;
        const { id } = req.params;

        const incident = await IncidentModel.findById(id);

        if(!incident){
            return res.status(404).json({ errros: ['Incidente não encontrado'] })
        }

        if(status){
            incident.status = status;
        }

        await incident.save();
        res.status(200).json(incident)

        
    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarder'] })
    }
}

//DELETA INCIDENTE
export const deleteIncident = async(req, res) => {
    try {

        const { id } = req.params;
        const incident = await IncidentModel.findById(id);

        if(!incident){
            return res.status(404).json({ errors: ['Incidente não encontrado'] })
        }

        if(incident.status === 'aberto' || incident.status === 'em processo'){
            return res.status(404).json({ errors: ['Não é possível deletar o incidente antes de resolve-lo'] })
        }

        await IncidentModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Incidente deletado com sucesso' })
        
    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }

}