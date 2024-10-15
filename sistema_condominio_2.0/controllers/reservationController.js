import ReservationModel from '../models/Reservation.js';

//CRIA UMA RESERVA
export const createReservation = async(req, res) => {
    try {
        
        const { area, date, startTime, endTime, status } = req.body;

        const existReserve = await ReservationModel.findOne({ area, date });

        if(existReserve){
            return res.status(404).json({ errors: ['Já existe uma reserva para esta área e data'] })
        }

        const newReservation = new ReservationModel({
            area,
            date,
            startTime,
            endTime,
            status,
            reservedBy: req.user._id
        });

        await newReservation.save();
        return res.status(201).json(newReservation);

    } catch (error) {
        return res.status(404).json({  errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}

//RETORNA TODAS AS RESERVAS
export const getAllReservations = async(req, res) => {
    try {
        
        const reservation = await  ReservationModel.find().populate('reservedBy', 'name email apto');
        return res.status(200).json(reservation);

    } catch (error) {
        res.status(404).json({ errors: ['Não foi encontrado nenhuma reserva'] });
    }

}

//RETORNA RESERVAS DO MORADOR AUTENTICADO
export const getMyReservation = async(req, res) => {
    try {

        const reservation = await ReservationModel.find({ reservedBy: req.user._id})

        if(!reservation){
            return res.status(404).json({ errors: ['Você não tem reservas']})
        }

        return res.status(200).json(reservation);
        
    } catch (error) {
        return res.status(404).json({ errors: ['Não foi encontrado nenhuma reserva.'] });
    }
}

//ATUALIZA O STATUS DA RESERVA
export const updateReservation = async(req, res) => {
    try {

        const { status } = req.body;
        const reservation = await ReservationModel.findById(req.params.id);

        if(status){
            reservation.status = status;
        }

        await reservation.save();
        return res.status(200).json(reservation);

        
    } catch (error) {
        return res.status(404).json({ errors: ['Não foi encontrado nenhuma reserva'] })
    }

}

//DELETA A RESERVA
export const deleteReservation = async(req, res) => {
    try {
        const { id } = req.params
        const reservation = await ReservationModel.findById(id);

        if(!reservation){
            return res.status(404).json({ errors: ['Reserva não encontrada'] })
        }

        await ReservationModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Reserva deletada com sucesso' })
        
    } catch (error) {
        return res.status(404).json({ errors: ['Reserva não encontrada'] })
    }
}