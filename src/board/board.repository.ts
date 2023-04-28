import { Repository, EntityRepository } from "typeorm";
import { Board } from './board.entity'
import { BoardStatus } from "./board_status.enum";
import { CreateBoardDto } from "./dto/create_board.dto";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

	async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
		const {title, description} = createBoardDto;

		const board = this.create({
			title,
			description,
			status: BoardStatus.PUBLIC
		})

		await this.save(board);
		return board;
	}
}