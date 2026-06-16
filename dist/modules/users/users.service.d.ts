import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    private publicUser;
}
