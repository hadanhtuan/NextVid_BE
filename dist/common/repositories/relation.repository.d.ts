import { DataSource, Repository } from 'typeorm';
import { UserRelation } from '../entities/user-relation.entity';
export declare class RelationRepository extends Repository<UserRelation> {
    private dataSource;
    constructor(dataSource: DataSource);
}
