import { UserRole } from '../consts/userConsts';
import { FeatureFlags } from '@/shared/types/featureFlags';

export type Users = Array<{
    id: string;
    username: string;
    avatar?: string;
    roles: UserRole[];
    features?: FeatureFlags;
}>

export type UsersSchema = {
    users: Users;
    isLoading: boolean;
    error: string;
}