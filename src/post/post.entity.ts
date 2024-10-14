import { MetaOption } from 'src/metaoption/metaoption.entity';
import { Tag } from 'src/tags/tags.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostStatus } from './enums/poststatus.enum';
import { PostType } from './enums/posttype.enum';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: PostType,
    nullable: false,
    default: PostType.POST,
  })
  type: PostType;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    nullable: false,
    default: PostStatus.DRAFT,
  })
  status: PostStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 1024,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishOn?: Date;

  @ManyToMany(() => Tag, (tag) => tag.posts, {
    eager: true,
  })
  @JoinTable()
  tags?: Tag[];

  @OneToOne(() => MetaOption, (metaoption) => metaoption.post, {
    cascade: true,
    eager: true,
  })
  metaOptions?: MetaOption;

  @ManyToOne(() => User, (user) => user.posts, {
    eager: true,
  })
  author: User;
}
