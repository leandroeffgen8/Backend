import AssemblyModel from '../models/Assembly.js';


//CRIA UMA DATA PARA A ASSEMBLEIA
export const createAssembly = async(req, res) => {
    //return res.send('Cria uma data de assembleia')

    try {

        const { local, dayOf, startTime, subject } = req.body;

        const assembly = await AssemblyModel({
            local,
            dayOf, 
            startTime,
            subject
        })

        await assembly.save()
        return res.status(201).json(assembly);
        
    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}

//RETORNA TODAS AS DATAS DA ASSEMBLEIAS
export const getAllAssembly = async(req, res) => {
    //return res.send('Todas as assembleias')

    try {

        const assembly = await AssemblyModel.find();
        return res.status(200).json(assembly);
        
    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}

