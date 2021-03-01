import { Injectable, Logger } from '@nestjs/common';
import Axios from 'axios';

@Injectable()
export class V1Service {
  private logger: Logger = new Logger('V1Service');

  async getBaconWords(): Promise<string[]> {
    const url: string = 'https://baconipsum.com/api/?type=all-meat&sentences=5&start-with-lorem=1'
    let words: string[] = [];
    try {
      const response = await Axios.get(url);
      if (response.status === 200) {
        words = response.data;
      }
    } catch (error) {
      this.logger.error(error);
    }

    return words;
  }
}
