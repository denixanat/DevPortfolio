import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {
  transform(value: any[], chunkSize: number): any[][] {
    if (!Array.isArray(value)) {
      return value;
    }

    return Array.from({ length: Math.ceil(value.length / chunkSize) }, (v, index) =>
      value.slice(index * chunkSize, index * chunkSize + chunkSize)
    );
  }
}
