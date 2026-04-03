import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { CommunitiesController } from './presentation/controllers/communities.controller';
import { GetMyCommunitiesUseCase } from './application/use-cases/get-my-communities.use-case';
import { GetCommunityDetailUseCase } from './application/use-cases/get-community-detail.use-case';
import { GetPostsUseCase } from './application/use-cases/get-posts.use-case';
import { CreatePostUseCase } from './application/use-cases/create-post.use-case';
import { DeletePostUseCase } from './application/use-cases/delete-post.use-case';
import { GetCommentsUseCase } from './application/use-cases/get-comments.use-case';
import { CreateCommentUseCase } from './application/use-cases/create-comment.use-case';
import { DeleteCommentUseCase } from './application/use-cases/delete-comment.use-case';
import { ReactToPostUseCase } from './application/use-cases/react-to-post.use-case';
import { GetForumsUseCase } from './application/use-cases/get-forums.use-case';
import { GetForumDetailUseCase } from './application/use-cases/get-forum-detail.use-case';
import { ReplyForumUseCase } from './application/use-cases/reply-forum.use-case';
import { ModGetMembersUseCase } from './application/use-cases/moderator/get-members.use-case';
import { ModChangeAccessUseCase } from './application/use-cases/moderator/change-access.use-case';
import { ModSuspendMemberUseCase } from './application/use-cases/moderator/suspend-member.use-case';
import { ModRequestBanUseCase } from './application/use-cases/moderator/request-ban.use-case';
import { ModRemoveMemberUseCase } from './application/use-cases/moderator/remove-member.use-case';
import { ModAddMemberUseCase } from './application/use-cases/moderator/add-member.use-case';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [CommunitiesController],
  providers: [
    GetMyCommunitiesUseCase,
    GetCommunityDetailUseCase,
    GetPostsUseCase,
    CreatePostUseCase,
    DeletePostUseCase,
    GetCommentsUseCase,
    CreateCommentUseCase,
    DeleteCommentUseCase,
    ReactToPostUseCase,
    GetForumsUseCase,
    GetForumDetailUseCase,
    ReplyForumUseCase,
    ModGetMembersUseCase,
    ModChangeAccessUseCase,
    ModSuspendMemberUseCase,
    ModRequestBanUseCase,
    ModRemoveMemberUseCase,
    ModAddMemberUseCase,
  ],
})
export class CommunitiesModule {}