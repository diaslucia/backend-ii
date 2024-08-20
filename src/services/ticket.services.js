import ticketRepository from "../managers/ticket.repository.js";

const createTicket = async (userEmail, totalCart) => {
  const newTicket = {
    amount: totalCart,
    purcharser: userEmail,
    code: Math.random().toString(36).substr(2, 9),
  };

  return await ticketRepository.create(newTicket);
};

export default { createTicket };
