import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
export declare class RolesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateRoleDto): import(".prisma/client").Prisma.Prisma__RoleDefinitionClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        homePath: string;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        homePath: string;
        description: string | null;
    }[]>;
    update(id: string, dto: UpdateRoleDto): import(".prisma/client").Prisma.Prisma__RoleDefinitionClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        homePath: string;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__RoleDefinitionClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
