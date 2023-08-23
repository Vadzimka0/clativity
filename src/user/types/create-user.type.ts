import { RegistrationDto } from 'src/auth/dto/registration.dto';

export type CreateUserType = Omit<RegistrationDto, 'password_confirm'>;
