import { Injectable } from '@nestjs/common'

import { Hit } from './hit.entity'

@Injectable()
export class HitService {
  private hits: Hit[] = []
  record(ip: string, timestamp: number) {
    const index = this.hits.findIndex(access => access.ip === ip)
    if (index !== -1) this.hits[index].timestamp = timestamp
    else this.hits.push({ ip, timestamp })
  }

  last(ip: string): number {
    const index = this.hits.findIndex(access => access.ip === ip)
    return index !== -1 ? this.hits[index].timestamp : NaN
  }
}
