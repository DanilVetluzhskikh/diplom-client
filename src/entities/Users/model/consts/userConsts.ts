export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
}

export const Roles = [{
    value: UserRole.ADMIN,
    content: UserRole.ADMIN,
}, {
    value: UserRole.USER,
    content: UserRole.USER,
}, {
    value: UserRole.MANAGER,
    content: UserRole.MANAGER,
}]