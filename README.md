# coloredlogs

colored logs with ids

## Install

```bash
npm i coloredlogs
```

## Usage

```typescript
import { Logger } from 'coloredlogs'

const log = new Logger('myLogger-1')

log.fail('something went wrong')
log.success('all good')
log.info('info')
```
