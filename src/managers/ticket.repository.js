import { ticketModel } from "../models/ticket.model.js";

const getById = async (tId) => {
  const ticket = await ticketModel.findById(tId);
  return ticket;
};

const create = async (data) => {
  const ticket = await ticketModel.create(data);
  return ticket;
};

export default {
  getById,
  create,
};
