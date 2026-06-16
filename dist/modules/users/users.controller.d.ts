import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    create(dto: CreateUserDto): Promise<{
        [key: string]: unknown;
    }>;
    findAll(query: PaginationDto): Promise<{
        data: {
            [key: string]: unknown;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        [key: string]: unknown;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        [key: string]: unknown;
    }>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
