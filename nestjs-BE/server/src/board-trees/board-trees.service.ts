import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardTree } from './schemas/board-tree.schema';
import { BoardOperation } from './schemas/board-operation.schema';
import { CrdtTree } from '../crdt/crdt-tree';
import { Operation } from '../crdt/operation';

@Injectable()
export class BoardTreesService {
  constructor(
    @InjectModel(BoardTree.name) private boardTreeModel: Model<BoardTree>,
    @InjectModel(BoardOperation.name)
    private boardOperationModel: Model<BoardOperation>,
  ) {}

  private boardTrees = new Map<string, CrdtTree>();

  async create(boardId: string, tree: string) {
    const createdTree = new this.boardTreeModel({
      boardId,
      tree,
    });
    return createdTree.save();
  }

  async findByBoardId(boardId: string) {
    return this.boardTreeModel.findOne({ boardId }).exec();
  }

  getTreeData(boardId: string) {
    const boardTree = this.boardTrees.get(boardId);
    return JSON.stringify(boardTree);
  }

  async initBoardTree(boardId: string, boardName: string) {
    const existingTree = await this.findByBoardId(boardId);
    if (existingTree) {
      this.boardTrees.set(boardId, CrdtTree.parse(existingTree.tree));
    } else {
      const newTree = new CrdtTree(boardId);
      newTree.tree.get('root').description = boardName;
      this.create(boardId, JSON.stringify(newTree));
      this.boardTrees.set(boardId, newTree);
    }
  }

  applyOperation(boardId: string, operation: Operation) {
    const boardTree = this.boardTrees.get(boardId);
    boardTree.applyOperation(operation);
  }

  hasTree(boardId: string) {
    return this.boardTrees.has(boardId);
  }

  updateTreeData(boardId: string) {
    const tree = this.boardTrees.get(boardId);
    this.boardTreeModel
      .updateOne({ boardId }, { tree: JSON.stringify(tree) })
      .exec();
  }

  async createOperationLog(operation: BoardOperation) {
    return this.boardOperationModel.create(operation);
  }

  async getOperationLogs(boardId: string) {
    return this.boardOperationModel.find({ boardId });
  }
}
