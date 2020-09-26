# colored-id-logger

colored logger with ids

## Install

```bash
npm i colored-id-logger
```

## Usage

```typescript
import { Logger } from 'colored-id-logger'

const log = new Logger('myLogger-1')

log.fail('something went wrong')
log.success('all good')
log.info('info')
```
