import PollModel from "../models/Poll.js";

// CRIA UMA ENQUETE
export const createPoll = async(req, res) => {
    try {

        const { principal, title, description, options, expiresAt } = req.body;

        const newPoll = new PollModel({
            principal,
            title,
            description,
            options: options.map(optionText => ({
                optionText,
                votes: 0 
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

// EXIBE TODAS AS ENQUETES
export const getPolls = async (req, res) => {
    try {
        const polls = await PollModel.find().sort({ createdAt: -1 }); // Ordena por criação
        return res.status(200).json(polls);
    } catch (error) {
        return res.status(500).json({ errors: ['Houve um erro, por favor tente mais tarde.'] });
    }
};

// VOTE EM UMA ENQUETE
export const votePoll = async(req, res) => {
    try {

        const { id } = req.params;
        const { optionID } = req.body;
        const userID = req.user._id; 

        const poll = await PollModel.findById(id);
        if(!poll){
            return res.status(404).json({ errors: ['Enquente não encontrada'] })
        }

        if (poll.votedUsers.includes(userID)) {
            return res.status(400).json({ errors: ['Você já votou nesta enquete.'] });
        }

        const option = poll.options.id(optionID);
        if(!option){
            return res.status(404).json({ errors: ['Opção não encontrada'] })
        }

        option.votes += 1;
        poll.votedUsers.push(userID); 
        
        await poll.save();

        return res.status(200).json(poll);
        
    } catch (error) {
        return res.status(404).json({ errors: ['Houve um erro, por favor tente mais tarde'] })
    }
}

// EXIBE A VOTAÇÃO DA ENQUETE
export const getResultsPoll = async(req, res) => {
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