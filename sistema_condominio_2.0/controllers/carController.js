import CarModel from '../models/Car.js'

//ADICIONA CARRO 
export const createCar = async(req, res) => {
    try {

        const { placa, modelo, cor, vagaEstacionamento } = req.body;
        const validaPlaca = await CarModel.findOne({ 
            $or: [
                { placa: placa }, 
                { vagaEstacionamento: vagaEstacionamento } 
            ]
         });

        if(validaPlaca){
            return res.status(404).json({ errors: ['A placa ou a vaga já está sendo usada'] })
        }

        const newCar = new CarModel({
            placa,
            modelo,
            cor,
            vagaEstacionamento,
            moradorID: req.user._id
        })

        await newCar.save();
        return res.status(201).json(newCar);
        
    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }

}

//RETORNA OS CARROS CADASTRADOS DO USUÁRIO
export const getMyCars = async(req, res) => {
    try {

        const cars = await CarModel.find({ moradorID: req.user._id})

        if(!cars){
            return res.status(404).json({ errors: ['Você não tem carros cadastrados']})
        }

        return res.status(200).json(cars);
        
    } catch (error) {
        return res.status(404).json({ errors: ['Não foi encontrado nenhuma reserva.'] });
    }
}

//RETORNA TODOS OS CARROS CADASTRADOS
export const getAllCars = async(req, res) => {
    try {
        
        const car = await CarModel.find().populate('moradorID', 'name phone apto');
        return res.status(200).json(car);

    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}

//ATUALIZA CARROS
export const updateCar = async(req, res) => {
    try {
        
        const { placa, modelo, cor, vagaEstacionamento } = req.body;

        const carUpdate = await CarModel.findByIdAndUpdate(req.params.id, {
            placa, modelo, cor, vagaEstacionamento
        },{ new: true })

        if(!carUpdate){
            return res.status(404).json({ errors: ['Carro não encontrado'] })
        }

        return res.status(200).json(carUpdate);

    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}

//DELETE CARRO
export const deleteCar = async(req, res) => {
    try {
        
        const { id } = req.params;
        const car = await CarModel.findById(id);

        if(!car){
            return res.status(404).json({ errors: ['Carro não encontrado'] })
        }

        await CarModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Carro deletado com sucesso' })

    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}
