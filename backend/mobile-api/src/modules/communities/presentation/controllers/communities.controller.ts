import {
  Controller, Get, Post, Delete, Patch,
  Param, Body, Request, UseGuards,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { GetMyCommunitiesUseCase } from '../../application/use-cases/get-my-communities.use-case';
import { GetCommunityDetailUseCase } from '../../application/use-cases/get-community-detail.use-case';
import { GetPostsUseCase } from '../../application/use-cases/get-posts.use-case';
import { CreatePostUseCase } from '../../application/use-cases/create-post.use-case';
import { DeletePostUseCase } from '../../application/use-cases/delete-post.use-case';
import { GetCommentsUseCase } from '../../application/use-cases/get-comments.use-case';
import { CreateCommentUseCase } from '../../application/use-cases/create-comment.use-case';
import { DeleteCommentUseCase } from '../../application/use-cases/delete-comment.use-case';
import { ReactToPostUseCase } from '../../application/use-cases/react-to-post.use-case';
import { GetForumsUseCase } from '../../application/use-cases/get-forums.use-case';
import { GetForumDetailUseCase } from '../../application/use-cases/get-forum-detail.use-case';
import { ReplyForumUseCase } from '../../application/use-cases/reply-forum.use-case';
import { ModGetMembersUseCase } from '../../application/use-cases/moderator/get-members.use-case';
import { ModChangeAccessUseCase } from '../../application/use-cases/moderator/change-access.use-case';
import { ModSuspendMemberUseCase } from '../../application/use-cases/moderator/suspend-member.use-case';
import { ModRequestBanUseCase } from '../../application/use-cases/moderator/request-ban.use-case';
import { ModRemoveMemberUseCase } from '../../application/use-cases/moderator/remove-member.use-case';
import { ModAddMemberUseCase } from '../../application/use-cases/moderator/add-member.use-case';
import { CreatePostDto } from '../dtos/post.dto';
import { CreateCommentDto } from '../dtos/comment.dto';
import { ReactDto } from '../dtos/reaction.dto';
import { ReplyForumDto, ChangeAccessDto, SuspendMemberDto, RequestBanDto, AddMemberDto } from '../dtos/moderator.dto';

@ApiTags('Comunidades')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('communities')
export class CommunitiesController {
  constructor(
    private readonly getMyCommunitiesUseCase: GetMyCommunitiesUseCase,
    private readonly getCommunityDetailUseCase: GetCommunityDetailUseCase,
    private readonly getPostsUseCase: GetPostsUseCase,
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly getCommentsUseCase: GetCommentsUseCase,
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly deleteCommentUseCase: DeleteCommentUseCase,
    private readonly reactToPostUseCase: ReactToPostUseCase,
    private readonly getForumsUseCase: GetForumsUseCase,
    private readonly getForumDetailUseCase: GetForumDetailUseCase,
    private readonly replyForumUseCase: ReplyForumUseCase,
    private readonly modGetMembersUseCase: ModGetMembersUseCase,
    private readonly modChangeAccessUseCase: ModChangeAccessUseCase,
    private readonly modSuspendMemberUseCase: ModSuspendMemberUseCase,
    private readonly modRequestBanUseCase: ModRequestBanUseCase,
    private readonly modRemoveMemberUseCase: ModRemoveMemberUseCase,
    private readonly modAddMemberUseCase: ModAddMemberUseCase,
  ) {}

  // ── Comunidades ────────────────────────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'Listar mis comunidades' })
  async getMyCommunities(@Request() req: any) {
    return this.getMyCommunitiesUseCase.execute(req.user.uid);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de una comunidad' })
  async getCommunityDetail(@Param('id') id: string, @Request() req: any) {
    return this.getCommunityDetailUseCase.execute(id, req.user.uid);
  }

  // ── Posts ──────────────────────────────────────────────────────────────────

  @Get(':id/posts')
  @ApiOperation({ summary: 'Ver feed de posts' })
  async getPosts(@Param('id') id: string, @Request() req: any) {
    return this.getPostsUseCase.execute(id, req.user.uid);
  }

  @Post(':id/posts')
  @ApiOperation({ summary: 'Crear post' })
  async createPost(@Param('id') id: string, @Body() dto: CreatePostDto, @Request() req: any) {
    return this.createPostUseCase.execute(id, req.user.uid, dto.contenido);
  }

  @Delete(':id/posts/:postId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar post (propio o moderador)' })
  async deletePost(@Param('id') id: string, @Param('postId') postId: string, @Request() req: any) {
    return this.deletePostUseCase.execute(id, postId, req.user.uid);
  }

  // ── Comentarios ────────────────────────────────────────────────────────────

  @Get(':id/posts/:postId/comments')
  @ApiOperation({ summary: 'Ver comentarios de un post' })
  async getComments(@Param('id') id: string, @Param('postId') postId: string, @Request() req: any) {
    return this.getCommentsUseCase.execute(id, postId, req.user.uid);
  }

  @Post(':id/posts/:postId/comments')
  @ApiOperation({ summary: 'Comentar en un post' })
  async createComment(
    @Param('id') id: string,
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @Request() req: any,
  ) {
    return this.createCommentUseCase.execute(id, postId, req.user.uid, dto.contenido);
  }

  @Delete(':id/posts/:postId/comments/:commentId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar comentario (propio o moderador)' })
  async deleteComment(
    @Param('id') id: string,
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Request() req: any,
  ) {
    return this.deleteCommentUseCase.execute(id, postId, commentId, req.user.uid);
  }

  // ── Reacciones ─────────────────────────────────────────────────────────────

  @Post(':id/posts/:postId/reactions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reaccionar a un post (toggle)' })
  async reactToPost(
    @Param('id') id: string,
    @Param('postId') postId: string,
    @Body() dto: ReactDto,
    @Request() req: any,
  ) {
    return this.reactToPostUseCase.execute(id, postId, req.user.uid, dto.tipo);
  }

  // ── Foros ──────────────────────────────────────────────────────────────────

  @Get(':id/forums')
  @ApiOperation({ summary: 'Ver foros de la comunidad' })
  async getForums(@Param('id') id: string, @Request() req: any) {
    return this.getForumsUseCase.execute(id, req.user.uid);
  }

  @Get(':id/forums/:forumId')
  @ApiOperation({ summary: 'Ver detalle de un foro con respuestas' })
  async getForumDetail(
    @Param('id') id: string,
    @Param('forumId') forumId: string,
    @Request() req: any,
  ) {
    return this.getForumDetailUseCase.execute(id, forumId, req.user.uid);
  }

  @Post(':id/forums/:forumId/replies')
  @ApiOperation({ summary: 'Responder a un foro' })
  async replyForum(
    @Param('id') id: string,
    @Param('forumId') forumId: string,
    @Body() dto: ReplyForumDto,
    @Request() req: any,
  ) {
    return this.replyForumUseCase.execute(id, forumId, req.user.uid, dto.contenido);
  }

  // ── Moderador ──────────────────────────────────────────────────────────────

  @Get(':id/members')
  @ApiOperation({ summary: '[MOD] Ver miembros de la comunidad' })
  async getMembers(@Param('id') id: string, @Request() req: any) {
    return this.modGetMembersUseCase.execute(id, req.user.uid);
  }

  @Patch(':id/members/:uid/access')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[MOD] Cambiar tipo de acceso de un miembro' })
  async changeAccess(
    @Param('id') id: string,
    @Param('uid') uid: string,
    @Body() dto: ChangeAccessDto,
    @Request() req: any,
  ) {
    return this.modChangeAccessUseCase.execute(id, uid, req.user.uid, dto.tipoAcceso);
  }

  @Post(':id/members/:uid/suspend')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[MOD] Suspender a un miembro N días' })
  async suspendMember(
    @Param('id') id: string,
    @Param('uid') uid: string,
    @Body() dto: SuspendMemberDto,
    @Request() req: any,
  ) {
    return this.modSuspendMemberUseCase.execute(id, uid, req.user.uid, dto.dias);
  }

  @Post(':id/ban-requests')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[MOD] Solicitar baneo permanente al admin' })
  async requestBan(
    @Param('id') id: string,
    @Body() dto: RequestBanDto,
    @Request() req: any,
  ) {
    // El body debe incluir el usuario_id del reportado
    return this.modRequestBanUseCase.execute(id, (dto as any).usuario_id, req.user.uid, dto.motivo);
  }

  @Post(':id/members')
  @ApiOperation({ summary: '[MOD] Agregar miembro por correo' })
  async addMember(
    @Param('id') id: string,
    @Body() dto: AddMemberDto,
    @Request() req: any,
  ) {
    return this.modAddMemberUseCase.execute(id, req.user.uid, dto.email, dto.tipoAcceso);
  }

  @Delete(':id/members/:uid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[MOD] Expulsar miembro de la comunidad' })
  async removeMember(
    @Param('id') id: string,
    @Param('uid') uid: string,
    @Request() req: any,
  ) {
    return this.modRemoveMemberUseCase.execute(id, uid, req.user.uid);
  }
}