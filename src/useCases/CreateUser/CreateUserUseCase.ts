import { IMailProvider } from "./../../providers/IMailProvider";
import { CreateUserRequestDTO } from "./CreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from "../../entities/User";

export class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository, private mailProvider: IMailProvider) {}

  async execute(data: CreateUserRequestDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User(data);

    await this.userRepository.save(user);

    this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Equipe do meu app",
        email: "me@equipe.com.br",
      },
      subject: "Cadastro do meu app",
      body: `O meu app foi enviado para ${data.name}`,
    });
  }
}
