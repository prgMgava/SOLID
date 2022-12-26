import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { MailTrapMailProvider } from "./../../providers/implementations/MailTrapMailProvider";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailTrapProvider = new MailTrapMailProvider();
const postgresUsersRepository = new PostgresUsersRepository();

const createUserUseCase = new CreateUserUseCase(postgresUsersRepository, mailTrapProvider);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
