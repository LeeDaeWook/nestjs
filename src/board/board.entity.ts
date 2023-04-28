import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board_status.enum";

@Entity()
export class Board extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	status: BoardStatus;
}