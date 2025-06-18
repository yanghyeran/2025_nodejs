const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "app.log",
    }),
  ],
});

console.log("==로그 레벨===");
console.log("로그 레벨: error > warn >info > debug > verbose");

logger.info("정보- 일반적인 정보메세지");
logger.error("에러가 발생했을때만");
logger.warn("경고 주의가 필요했을때만");
logger.debug("디버그 개발중에만");

const simpleLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] : ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});
simpleLogger.info("타임스태프가 포함된 로그");
