import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { BoardStatus } from './board_status.enum';
import { CreateBoardDto } from './dto/create_board.dto';
import { BoardStatusValidationPipe } from './pipes/board_status_validation.pipe'

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

//   @Get('/')
//   getAllBoard(): Board[] {
//     return this.boardService.getAllBoards();
//   }

	@Get()
	getAllBoards(): Promise<Board[]> {
		return this.boardService.getAllBoards();
	}

//   @Post()
//   @UsePipes(ValidationPipe)
//   createBoard(
//     @Body() createBoardDto: CreateBoardDto
//   ): Board {
// 	return this.boardService.createBoard(createBoardDto);
//   }

	@Post()
	@UsePipes(ValidationPipe)
	createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
		return this.boardService.createBoard(createBoardDto);
	}

	@Get('/:id')
	getBoardById(@Param('id') id: number) : Promise<Board> {
		return this.boardService.getBoardById(id);
	}

//   @Get('/:id')
//   getBoardById(@Param('id') id: string): Board {
// 	return this.boardService.getBoardById(id);
//   }
  
	@Delete('/:id')
	deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.boardService.deleteBoard(id);
	}

//   @Delete('/:id')
//   deleteBoard(@Param('id') id: string): void {
// 	this.boardService.deleteBoard(id);
//   }

  @Patch('/:id/status')
  updateBoardStatus(
	@Param('id', ParseIntPipe) id: number,
	@Body('status', BoardStatusValidationPipe) status: BoardStatus
  ) {
	return this.boardService.updateBoardStatus(id, status);
  }

//   @Patch('/:id/status')
//   updateBoardStatus(
// 	@Param('id') id: string,
// 	@Body('status', BoardStatusValidationPipe) status: BoardStatus
//   ) {
// 	return this.boardService.updateBoardStatus(id, status);
//   }
}
