import PollModel from "../models/Poll.js";


// CRIA UMA ENQUETE
export const createPoll = async(req, res) => {
    //return res.send('Enquete');

    try {

        const { title, options, expiresAt } = req.body;

        const newPoll = new PollModel({
            title,
            options: options.map(optionText => ({
                optionText
            })),
            createdBy: req.user._id,
            expiresAt
        });

        await newPoll.save();
        return res.status(201).json(newPoll);
        
    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde.'] })
    }
}


// VOTE EM UMA ENQUETE
export const votePoll = async(req, res) => {
    //return res.send('Votar na enquete');
    try {

        const { id } = req.params;
        const { optionID } = req.body;

        const poll = await PollModel.findById(id);
        if(!poll){
            return res.status(404).json({ errors: ['Enquente não encontrada'] })
        }

        const option = poll.options.id(optionID);
        if(!option){
            return res.status(404).json({ errors: ['Opção não encontrada'] })
        }

        option.votes += 1;
        await poll.save();

        return res.status(200).json(poll);
        
    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}

// EXIBE A VOTAÇÃO DA ENQUETE
export const getResultsPoll = async(req, res) => {
    //return res.send('Resultado da enquente')

    try {

        const { id } = req.params;
        const poll = await PollModel.findById(id);
        if(!poll){
            return res.status(404).json({errors: ['Enquente não encontrada'] })
        }

        return res.status(200).json(poll);
        
    } catch (error) {
        return res.status(404).json({errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}