import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly roles;
    constructor(roles: RolesService);
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
