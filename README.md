# coloredlogger

colored logger with ids

## Install

```bash
npm i coloredlogger
```

## Usage

```typescript
import { Logger } from 'coloredlogger'

const log = new Logger('myLogger-1')

log.fail('something went wrong')
log.success('all good')
log.info('info')
```
