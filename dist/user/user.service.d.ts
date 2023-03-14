import { User } from '../common/entities/user.entity';
import { UserRepository } from '../common/repositories/user.repository';
import { UserRelation } from '../common/entities/user-relation.entity';
import { RelationRepository } from '../common/repositories/relation.repository';
import { BlogRepository } from '../common/repositories/blog.repository';
export declare class UserService {
    private userRepository;
    private blogRepository;
    private relationRepository;
    constructor(userRepository: UserRepository, blogRepository: BlogRepository, relationRepository: RelationRepository);
    getUser(id: any): Promise<User>;
    follow(user: User, id: number): Promise<void>;
    unFollow(user: User, id: number): Promise<void>;
    getFollows(user: User): Promise<UserRelation[]>;
    getSuggest(): Promise<User[]>;
    shuffle(array: User[]): User[];
    getUserFollower(id: number): Promise<number>;
    fetchUserBySearchText(text: string): Promise<User[]>;
}
