import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const messages = JSON.parse(await readFile('messages.json', 'utf-8'));

    return messages[id];
  }

  async findAll() {
    return JSON.parse(await readFile('messages.json', 'utf-8'));
  }

  async create(content: string) {
    const contents = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(contents);
    const id = Math.floor(Math.random() * 100);
    messages[id] = {
      content,
      id: id,
    };

    await writeFile('messages.json', JSON.stringify(messages));

    return {
      content,
      id: id,
    };
  }
}
